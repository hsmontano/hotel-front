import { Injectable } from '@angular/core';
import { formatDate } from "@angular/common";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of, Subject, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {map, catchError} from "rxjs/operators";
import { Bedroom } from "../class/bedroom";

@Injectable({
  providedIn: 'root'
})
export class BedroomService{

  public bedroom$ = new Subject<Bedroom>();
  public bedrooms$ = new Subject<Bedroom[]>();

  public bedroom = new Bedroom();
  public bedrooms: Bedroom[] = [];

  httpOptions = {
    header: new HttpHeaders({'Content-Type': 'application/json'})
  }

  private urlEndPoint: string = environment.development;

  constructor( private http: HttpClient) { }

  getBedroom$(): Observable<Bedroom[]>{
    return this.bedrooms$.asObservable();
  }

  //Traemos todas las habitaciones registradas en el sistema...
  getBedrooms(): Observable<any> {
    this.bedrooms = []
    return this.http.get<Bedroom[]>(`${this.urlEndPoint}/habitaciones`).pipe(
      map((response: any) => {
        if (response.status === 'success') {
          response.data.forEach((item: any) => {
            this.bedroom = new Bedroom();
            this.bedroom.setValues(item);
            this.bedrooms.push(this.bedroom);
          });
        }
        this.bedrooms$.next(this.bedrooms);
      }),
      catchError((err) => of(err))
    )
  }

  getBedroomById(id: string): Observable<Bedroom> {
    return this.http.get<Bedroom>(`${this.urlEndPoint}/habitaciones/${id}`).pipe(
      catchError(e => {
        console.error(e.err.message);
        return throwError(e);
      })
    )
  }

  //Este metodo lo utilizamos para crear una habitación...
  createBedroom(bedroom: Bedroom): Observable<any> {
    return this.http.post(`${this.urlEndPoint}/habitaciones`, bedroom);
  }

  updateBedroom(bedroom: Bedroom): Observable<any> {
    return this.http.put(`${this.urlEndPoint}/habitaciones/${bedroom._id}`, bedroom);
  }

  deleteBedroom(id: string): Observable<any> {
    return this.http.delete(`${this.urlEndPoint}/habitaciones/${id}`);
  }
}
