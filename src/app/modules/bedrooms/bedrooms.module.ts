import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BedroomsRoutingModule } from './bedrooms-routing.module';
import { BedroomsComponent } from './bedrooms.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    BedroomsComponent
  ],
  imports: [
    CommonModule,
    BedroomsRoutingModule,
    FormsModule
  ]
})
export class BedroomsModule { }
