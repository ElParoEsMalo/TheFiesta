import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs-page',
  templateUrl: './tabs-page.page.html',
  styleUrls: ['./tabs-page.page.scss'],
})
export class TabsPagePage implements OnInit {
  tabs:Array<any>;
  constructor() { }

  ngOnInit() {
    this.tabs=[{
      icon: 'person-circle',
      name: 'perfil',
      title: 'perfil'
    },
    {
      icon: 'search',
      name: 'buscador',
      title: 'buscar'
    },
    {
      icon: 'home',
      name: 'home',
      title: 'inicio'
    },
    {
      icon: 'chatbubbles',
      name: 'chat',
      title: 'chat'
    }]
  }

}
