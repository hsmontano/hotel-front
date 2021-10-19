import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Booking} from "../../class/booking";
import {BookingService} from "../../services/booking.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Bedroom} from "../../class/bedroom";
import {Package} from "../../class/package";
import {BedroomService} from "../../services/bedroom.service";
import {PackageService} from "../../services/package.service";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  closeResult = '';

  public updateAt = new Date();

  public bedroomSubscription: Subscription = new Subscription();
  public booking: Booking = new Booking();
  public bookings: Booking[] = [];

  public bedroom: Bedroom = new Bedroom();
  public bedrooms: Bedroom[] = [];

  public package: Package = new Package();
  public packages: Package[] = [];

  constructor( private bookingService: BookingService,
               private bedroomService: BedroomService,
               private packageService: PackageService,
               private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getBookings();
    this.getBedrooms();
    this.getPackages();
  }

  getBookings(): void {
    this.bedroomSubscription = this.bookingService.getBooking$().subscribe((items: Booking[]) => {
      this.bookings = items;
    });
    this.bookingService.getBookings().subscribe();
  }

  getBedrooms(): void {
    this.bedroomSubscription = this.bedroomService.getBedroom$().subscribe( (items: Bedroom[]) => {
      this.bedrooms = items;
    })
    this.bedroomService.getBedrooms().subscribe();
  }

  getPackages(): void {
    this.bedroomSubscription = this.packageService.getPackage$().subscribe( (items: Package[]) => {
      this.packages = items;
    })
    this.packageService.getPackages().subscribe();
  }

  getBookingById(id: string): void {
    this.bookingService.getBookingById(id).subscribe((response: any) => {
      this.booking = response.data;
    });
  }

  public openModal(content: any, modalName: string, id?: any) {
    if (modalName === "create") {
      this.modalService.open(content, { size: 'lg' , ariaLabelledBy: 'modal-basic-title', centered: true})
        .result.then((result) => {
        if(result==='create'){
          this.closeResult = `Closed with: ${result}`;
          this.create();
          this.booking.nombre = '';
          this.booking.identificacion = '';
          this.booking.ciudad = '';
          this.booking.fecha = '';
          this.booking.habitacion = undefined;
          this.booking.paquete = undefined;
        } else {
          this.booking.nombre = '';
          this.booking.identificacion = '';
          this.booking.ciudad = '';
          this.booking.fecha = '';
          this.booking.habitacion = undefined;
          this.booking.paquete = undefined;
        }
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      })
    } else if (modalName === 'delete') {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true })
        .result.then( (result) => {
        if (result === 'yes') {
          this.delete( id );
        }
      }, (reason) => { });
    } else if(modalName === "update"){
      this.getBookingById(id);
      this.modalService.open(content, { size: 'lg' , ariaLabelledBy: 'modal-basic-title', centered: true })
        .result.then((result) => {
        if(result==='update'){
          this.closeResult = `Closed with: ${result}`;
          this.update();
        } else {
          this.booking.nombre = '';
          this.booking.identificacion = '';
          this.booking.ciudad = '';
          this.booking.fecha = '';
          this.booking.habitacion = undefined;
          this.booking.paquete = undefined;
        }
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      })
    }
  }
  private create() {
    this.bookingService.createBooking(this.booking).subscribe( (response: any) => {
      if (response.status === 'success') {
        this.getBookings();
      }
    }, err => {
      console.error('Error code from the backend: ' + err.status);
    })
  }

  private update() {
    this.booking.updatedAt = this.updateAt.toISOString();
    this.bookingService.updateBooking(this.booking).subscribe( (response: any) => {
      if (response.status === 'success') {
        this.getBookings();
      }
    }, (error) => {
      console.log(error.message)
    })
  }

  private delete(id: string) {
    this.bookingService.deleteBooking(id).subscribe( (response: any) => {
      if (response.status === 'success') {
        this.getBookings();
      }
    }, err => {
      console.log(err);
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
}
