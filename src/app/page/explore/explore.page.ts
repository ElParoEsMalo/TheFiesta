import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/servicios/map/map.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  constructor(private mapServ:MapService) { }

  ngOnInit() {
  }
  openMap(){
    this.mapServ.openMap();
  }

}
