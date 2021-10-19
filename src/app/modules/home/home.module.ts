import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SliderComponent } from "../../components/slider/slider.component";
import { BookingFormComponent } from '../../components/booking-form/booking-form.component';
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HomeComponent,
    SliderComponent,
    BookingFormComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbCarouselModule,
    FormsModule
  ],
  exports: [
    SliderComponent
  ],
})
export class HomeModule { }
