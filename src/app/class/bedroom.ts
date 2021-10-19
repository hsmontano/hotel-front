export class Bedroom {
  public _id?: string;
  public nombre?: string;
  public descripcion?: string;
  public createdAt?: string;
  public updatedAt?: string;

  constructor() {
  }

  setValues(item: any) {
    this._id = item._id;
    this.nombre = item.nombre;
    this.descripcion = item.descripcion;
    this.createdAt = item.createdAt;
    this.updatedAt = item.updatedAt;
  }
}
