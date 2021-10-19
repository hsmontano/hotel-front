import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of, Subject, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {map, catchError} from "rxjs/operators";
import {Package} from "../class/package";

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  public package$ = new Subject<Package>();
  public packages$ = new Subject<Package[]>();

  public package = new Package();
  public packages: Package[] = [];

  httpOptions = {
    header: new HttpHeaders({'Content-Type': 'application/json'})
  }

  private urlEndPoint: string = environment.development;

  constructor(private http: HttpClient) { }

  getPackage$(): Observable<Package[]>{
    return this.packages$.asObservable();
  }

  //Traemos todas las paquetes registrados en el sistema...
  getPackages(): Observable<any> {
    this.packages = []
    return this.http.get<Package[]>(`${this.urlEndPoint}/paquetes`).pipe(
      map((response: any) => {
        if (response.status === 'success') {
          response.data.forEach((item: any) => {
            this.package = new Package();
            this.package.setValues(item);
            this.packages.push(this.package);
          });
        }
        this.packages$.next(this.packages);
      }),
      catchError((err) => of(err))
    )
  }

  getPackageById(id: string): Observable<Package> {
    return this.http.get<Package>(`${this.urlEndPoint}/paquetes/${id}`).pipe(
      catchError(e => {
        console.error(e.err.message);
        return throwError(e);
      })
    )
  }

  //Este metodo lo utilizamos para crear un package...
  createPackage(packageModel: Package): Observable<any> {
    return this.http.post(`${this.urlEndPoint}/paquetes`, packageModel);
  }

  updatePackage(packageModel: Package): Observable<any> {
    return this.http.put(`${this.urlEndPoint}/paquetes/${packageModel._id}`, packageModel);
  }

  deletePackage(id: string): Observable<any> {
    return this.http.delete(`${this.urlEndPoint}/paquetes/${id}`);
  }
}
