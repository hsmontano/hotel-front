import { Component, OnInit } from '@angular/core';
import {Booking} from "../../class/booking";
import {Bedroom} from "../../class/bedroom";
import {Package} from "../../class/package";
import {BedroomService} from "../../services/bedroom.service";
import {PackageService} from "../../services/package.service";
import {Subscription} from "rxjs";
import {BookingService} from "../../services/booking.service";

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  public bookingSubscription: Subscription = new Subscription();
  public booking: Booking = new Booking();
  public bedrooms: Bedroom[] = [];
  public packages: Package[] = [];

  constructor( private bedroomService: BedroomService,
               private packageService: PackageService,
               private bookingService: BookingService) { }

  ngOnInit(): void {
    this.getBedrooms();
    this.getPackages();
  }

  getBedrooms(): void {
    this.bookingSubscription = this.bedroomService.getBedroom$().subscribe( (items: Bedroom[]) => {
      this.bedrooms = items;
    })
    this.bedroomService.getBedrooms().subscribe();
  }

  getPackages(): void {
    this.bookingSubscription = this.packageService.getPackage$().subscribe( (items: Package[]) => {
      this.packages = items;
    })
    this.packageService.getPackages().subscribe();
  }

  compareBedroom(o1: Bedroom, o2: Bedroom): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 && o2 ? o1._id === o2._id : o1 === o2;
  }

  comparePackage( o1: Package, o2: Package ): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 && o2 ? o1._id === o2._id : o1 === o2;
  }

  public create() {
    this.bookingService.createBooking(this.booking).subscribe( (response: any) => {
      if (response.status === 'success') {
        this.booking.nombre = '';
        this.booking.identificacion = '';
        this.booking.ciudad = '';
        this.booking.fecha = '';
        this.booking.habitacion = undefined;
        this.booking.paquete = undefined;
      }
    }, err => {
      console.error('Error code from the backend: ' + err.status);
    })
  }

}
