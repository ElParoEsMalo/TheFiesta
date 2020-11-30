import { Event } from "src/app/core/models/evento";
import { Component, OnInit } from "@angular/core";
import { DataService } from "../../servicios/data/data.service";
import { ShowModalService } from "src/app/servicios/show-modal/show-modal.service";
import { EventServiceService } from "src/app/servicios/event/event-service.service";

@Component({
  selector: "app-find-event",
  templateUrl: "./find-event.page.html",
  styleUrls: ["./find-event.page.scss"]
})
export class FindEventPage implements OnInit {
  advanced: boolean = false;
  option: string;
  events: Event[];
  mostrar: boolean = true;
  searchValue: string;
  searchOptions: string = "owner";
  orderOptions:string="capacity";
  constructor(
    private eventServ: EventServiceService,
    private showModal: ShowModalService
  ) {
    this.events = eventServ.UserEvents;
  }
  changeOption() {
    if (this.option == "advanced") {
      this.advanced = true;
    } else {
      this.advanced = false;
    }
  }
  findEvent() {
    let value;
    let valueF;
    if(this.searchOptions=="name"|| this.searchOptions=="owner"){
      value=this.searchValue;
      valueF=value+"\uf8ff";
    }else{
      value=Number(this.searchValue);
      valueF=10000;
    }
        this.eventServ.searchEvent(value,valueF,this.searchOptions).valueChanges().subscribe(data=>{
          console.log(data)
          this.events=data;
        })
    
  }
  getAll() {
    if (!(this.searchValue == undefined || this.searchValue == "")) {
      this.events = this.events.filter(a => {
        return this.isEqualTo(a);
      });
    }
    return this.events.sort((a, b) => {
      const bandA = a[this.orderOptions];
      const bandB = b[this.orderOptions];
      console.log("La comparacion de "+this.orderOptions+": a:"+bandA+" ,b:"+bandB+" a < b es "+(bandA<bandB));
      let comparison = 0;
      if (bandA > bandB) {
        comparison = 1;
      } else if (bandA < bandB) {
        comparison = -1;
      }
      return comparison;
    });
  }
  showItem(event: Event) {
    this.showModal.showModal(event);
  }
  doInfinite(event: any) {
    setTimeout(() => {
      this.eventServ.increaseLimit(2);
      this.findEvent();
      event.target.complete();
      if (this.events.length%20!=0){
        event.target.disabled = true;
      }
  }, 500);
    console.log("fuera del settimeout no espero a nadie");
  
  }
  private isEqualTo(event: Event) {
    var search = this.searchValue;
    return event[this.searchOptions].toString().indexOf(search) >= 0;
  }

  ngOnInit() {}
}
