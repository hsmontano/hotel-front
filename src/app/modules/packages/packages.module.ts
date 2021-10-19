import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesRoutingModule } from './packages-routing.module';
import { PackagesComponent } from './packages.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PackagesComponent
  ],
    imports: [
        CommonModule,
        PackagesRoutingModule,
        FormsModule
    ]
})
export class PackagesModule { }
