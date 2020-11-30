import { EventListComponent } from './../../page/newPages/event-list/event-list.component';
import { CreateElementComponent } from './../../page/newPages/create-element/create-element.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponentComponent } from 'src/app/page/newPages/landing-component/landing-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [CreateElementComponent, LandingComponentComponent, EventListComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
  ],
  exports: [CreateElementComponent, LandingComponentComponent,EventListComponent]
})
export class SharedComponentModule { }
