import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of, Subject, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {map, catchError} from "rxjs/operators";
import {Booking} from "../class/booking";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  public booking$ = new Subject<Booking>();
  public bookings$ = new Subject<Booking[]>();

  public booking = new Booking();
  public bookings: Booking[] = [];

  httpOptions = {
    header: new HttpHeaders({'Content-Type': 'application/json'})
  }

  private urlEndPoint: string = environment.development;

  constructor(private http: HttpClient) { }

  getBooking$(): Observable<Booking[]>{
    return this.bookings$.asObservable();
  }

  //Traemos todas las reservas registradas en el sistema...
  getBookings(): Observable<any> {
    this.bookings = []
    return this.http.get<Booking[]>(`${this.urlEndPoint}/reservas`).pipe(
      map((response: any) => {
        if (response.status === 'success') {
          response.data.forEach((item: any) => {
            this.booking = new Booking();
            this.booking.setValues(item);
            this.booking.fecha = formatDate(item.fecha, 'yyyy-MM-dd:hh:mm-ss', 'en-US');
            this.bookings.push(this.booking);
          });
        }
        this.bookings$.next(this.bookings);
      }),
      catchError((err) => of(err))
    )
  }

  getBookingById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.urlEndPoint}/reservas/${id}`).pipe(
      catchError(e => {
        console.error(e.err.message);
        return throwError(e);
      })
    )
  }

  //Este metodo lo utilizamos para crear una reserva...
  createBooking(booking: Booking): Observable<any> {
    return this.http.post(`${this.urlEndPoint}/reservas`, booking);
  }

  updateBooking(booking: Booking): Observable<any> {
    return this.http.put(`${this.urlEndPoint}/reservas/${booking._id}`, booking);
  }

  deleteBooking(id: string): Observable<any> {
    return this.http.delete(`${this.urlEndPoint}/reservas/${id}`);
  }
}
