import {Bedroom} from "./bedroom";
import {Package} from "./package";

export class Booking {
  public _id?: string;
  public identificacion?: string;
  public nombre?: string;
  public ciudad?: string;
  public fecha: string = '';
  public habitacion?: Bedroom;
  public paquete?: Package;
  public createdAt?: string;
  public updatedAt?: string;

  constructor() {
  }

  setValues(item: any) {
    this._id = item._id;
    this.identificacion = item.identificacion;
    this.nombre = item.nombre;
    this.ciudad = item.ciudad;
    this.fecha = item.fecha;
    this.habitacion = item.habitacion;
    this.paquete = item.paquete;
    this.createdAt = item.createdAt;
    this.updatedAt = item.updatedAt;
  }
}
