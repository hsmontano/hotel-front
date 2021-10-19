import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BedroomsComponent } from './bedrooms.component';

const routes: Routes = [
  { path: '', component: BedroomsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BedroomsRoutingModule { }
