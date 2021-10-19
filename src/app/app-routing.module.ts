import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'packages', loadChildren: () => import('./modules/packages/packages.module').then(m => m.PackagesModule) },
  { path: 'bedrooms', loadChildren: () => import('./modules/bedrooms/bedrooms.module').then(m => m.BedroomsModule) },
  { path: 'bookings', loadChildren: () => import('./modules/bookings/bookings.module').then(m => m.BookingsModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
