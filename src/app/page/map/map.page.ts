import { ShowModalService } from './../../servicios/show-modal/show-modal.service';
import { Event } from './../../core/models/evento';
import { MapService } from "src/app/servicios/map/map.service";
import { Component, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NavigationExtras, Router } from '@angular/router';
declare var google;

@Component({
  selector: "app-map",
  templateUrl: "./map.page.html",
  styleUrls: ["./map.page.scss"]
})
export class MapPage implements OnInit {
  constructor(private mapServ: MapService, private geolocation: Geolocation,private modalServ:ShowModalService) {}

  latitude = 38.680493;
  longitude = -6.433149;
  events: Event[] = [];
  selectedEvent:Event;
  isSelected:boolean=false;
  map: any;
  ngOnInit() {
    this.loadsMap();
  }
  setCoord(lat, lng) {
    this.latitude = lat;
    this.longitude = lng;
  }
  centerMap() {
    let lat = 0;
    let lng = 0;
    this.geolocation.getCurrentPosition().then(d => {
      lat = d.coords.latitude;
      lng = d.coords.longitude;
      this.map.setCenter({ lat: lat, lng: lng });
    });
  }
  generateInfo(event:Event){
    return `<div style="margin:0px; width:100%"><ion-item lines="none" color="warning" style="margin: 0px 0px;width: 100%;">
    <div style=" width:100%;padding: 10% 0px;height: 100%;">
      <ion-avatar style="margin: auto; width: 90px;height: 90px; border: 3px solid white;">
          <img src="../../../assets/galeria/portadaCollage.jpg">
        </ion-avatar>
      </div>
  </ion-item>
  <ion-item color="warning" lines="none">
      <ion-label style="text-align:center">
      `+event.name+`
      </ion-label>
      </ion-item>
  <ion-item color="warning" lines="none">
      <ion-label >
        Price: 
      </ion-label>
      <ion-label lines="none" style="text-align:center">
        `+event.price+`
      </ion-label>
  </ion-item>
  <ion-item color="warning">
      <ion-label>
          Stock: 
        </ion-label>
        <ion-label lines="none" style="text-align:center">
        `+(event.capacity-event.users.length)+`
        </ion-label>
    </ion-item> 
     </div>`;
  }
  loadsMap() {
    let that = this;
    let map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: this.latitude, lng: this.longitude },
      zoom: 15,
      mapTypeId: "roadmap",
      zoomControl: false
    });
    //var map=this.map;
    var input = document.getElementById("pac-input");
    var searchBox = new google.maps.places.SearchBox(input);

    map.addListener("bounds_changed", function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = null;
    console.log(this.mapServ.events);
    this.mapServ.events.forEach(element => {
      var infowindow = new google.maps.InfoWindow({
        content: this.generateInfo(element)
      });
      let marker=new google.maps.Marker({
        position: { lat: element.latitude || this.latitude, lng: element.longitude || this.longitude },
        title:element.name,
        map: map
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
        that.selectedEvent=element;
        that.isSelected=true;
      });
      console.log(element);
      map.setCenter({lat:element.latitude,lng:element.longitude});
      
    });

    google.maps.event.addListener(map, "click", function(event) {
      if (that.mapServ.canEdit) {
        if (markers != null) {
          markers.setMap(null);
        }
        that.latitude = event.latLng.lat();
        that.longitude = event.latLng.lng();

        var marker = new google.maps.Marker({
          position: event.latLng,
          map: map
        });
        markers = marker;
      }
    });
    searchBox.addListener("places_changed", function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };
        console.log("can edit: "+this.mapServ.canEdit);
        if (that.mapServ.canEdit) {
          console.log(place.geometry.location.lat(), place.geometry.location.lat());
          that.latitude = place.geometry.location.lat();
          that.longitude = place.geometry.location.lng();
          markers = new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          });
        }

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      
      map.fitBounds(bounds);
    });
    this.map = map;
  }
  editEvent(){
    this.mapServ.events[0].latitude=this.latitude;
    this.mapServ.events[0].longitude=this.longitude;
  }
  open(){
    this.modalServ.showModal(this.selectedEvent);
  }
}
