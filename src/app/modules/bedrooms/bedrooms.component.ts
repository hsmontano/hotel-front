import { Component, OnInit } from '@angular/core';
import {BedroomService} from "../../services/bedroom.service";
import {Subscription} from "rxjs";
import {Bedroom} from "../../class/bedroom";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-bedrooms',
  templateUrl: './bedrooms.component.html',
  styleUrls: ['./bedrooms.component.css']
})
export class BedroomsComponent implements OnInit {

  closeResult = '';

  public updateAt = new Date();

  public bedroomSubscription: Subscription = new Subscription();
  public bedroom: Bedroom = new Bedroom();
  public bedrooms: Bedroom[] = [];

  constructor(private bedroomService: BedroomService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getBedrooms();
  }

  getBedrooms(): void {
    this.bedroomSubscription = this.bedroomService.getBedroom$().subscribe( (items: Bedroom[]) => {
      this.bedrooms = items;
    })
    this.bedroomService.getBedrooms().subscribe();
  }

  getBedroomById(id: string) {
    if (id) {
      this.bedroomService.getBedroomById(id).subscribe( (response: any)=> {
        this.bedroom = response.data;
      })
    }
  }

  private delete(id: string) {
    this.bedroomService.deleteBedroom(id).subscribe( (response: any) => {
        if (response.status === 'success') {
          this.getBedrooms();
        }
    }, err => {
      console.log(err);
    })
  }

  public openModal(content: any, modalName: string, id?: any) {
    if (modalName === "create") {
      this.modalService.open(content, { size: 'lg' , ariaLabelledBy: 'modal-basic-title', centered: true})
        .result.then((result) => {
        if(result==='create'){
          this.closeResult = `Closed with: ${result}`;
          this.create();
          this.bedroom.nombre = '';
          this.bedroom.descripcion = '';
        } else {
          this.bedroom.nombre = '';
          this.bedroom.descripcion = '';
        }
      }, (reason) => {
        this.closeResult = `Dismissed ${BedroomsComponent.getDismissReason(reason)}`;
      })
    } else if (modalName === 'delete') {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true })
        .result.then( (result) => {
        if (result === 'yes') {
          this.delete( id );
        }
      }, (reason) => { });
    } else if(modalName === "update"){
      this.getBedroomById(id);
      this.modalService.open(content, { size: 'lg' , ariaLabelledBy: 'modal-basic-title', centered: true })
        .result.then((result) => {
        if(result==='update'){
          this.closeResult = `Closed with: ${result}`;
          this.update();
        } else {
          this.bedroom.nombre = '';
          this.bedroom.descripcion = '';
        }
      }, (reason) => {
        this.closeResult = `Dismissed ${BedroomsComponent.getDismissReason(reason)}`;
      })
    }
  }

  private create() {
    this.bedroomService.createBedroom(this.bedroom).subscribe( (response: any) => {
        if (response.status === 'success') {
          this.getBedrooms();
        }
    }, err => {
      console.error('Error code from the backend: ' + err.status);
    })
  }

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private update() {
    this.bedroom.updatedAt = this.updateAt.toISOString();
    this.bedroomService.updateBedroom(this.bedroom).subscribe( (response: any) => {
      if (response.status === 'success') {
        this.getBedrooms();
      }
    }, (error) => {
      console.log(error.message)
    })
  }
}
