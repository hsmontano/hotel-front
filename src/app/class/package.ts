export class Package {
  public _id?: string;
  public nombre?: string;
  public alimentacion?: string;
  public actividad?: string;
  public asistencia?: string;
  public createdAt?: string;
  public updatedAt?: string;

  constructor() {
  }

  setValues(item: any) {
    this._id = item._id;
    this.nombre = item.nombre;
    this.alimentacion = item.alimentacion;
    this.actividad = item.actividad;
    this.asistencia = item.asistencia;
    this.createdAt = item.createdAt;
    this.updatedAt = item.updatedAt;
  }
}
