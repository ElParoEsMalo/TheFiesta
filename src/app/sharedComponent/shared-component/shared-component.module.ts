import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateElementComponent } from './create-element/create-element.component';
import { EventListComponent } from './event-list/event-list.component';
import { LandingComponentComponent } from './landing-component/landing-component.component';



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
