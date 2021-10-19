import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Package} from "../../class/package";
import {PackageService} from "../../services/package.service";
import { ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  closeResult = '';

  public updateAt = new Date();

  public bedroomSubscription: Subscription = new Subscription();

  public package: Package = new Package();
  public packages: Package[] = [];

  constructor(private packageService: PackageService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPackages()
  }

  getPackages(): void {
    this.bedroomSubscription = this.packageService.getPackage$().subscribe( (items: Package[]) => {
      this.packages = items;
    })
    this.packageService.getPackages().subscribe();
  }

  getPackageById(id: string) {
    if (id) {
      this.packageService.getPackageById(id).subscribe( (response: any)=> {
        this.package = response.data;
      })
    }
  }

  private delete(id: string) {
    this.packageService.deletePackage(id).subscribe( (response: any) => {
      if (response.status === 'success') {
        this.getPackages();
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
          this.package.nombre = '';
          this.package.alimentacion = '';
          this.package.asistencia = '';
          this.package.actividad = '';
        } else {
          this.package.nombre = '';
          this.package.alimentacion = '';
          this.package.asistencia = '';
          this.package.actividad = '';
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
      this.getPackageById(id);
      this.modalService.open(content, { size: 'lg' , ariaLabelledBy: 'modal-basic-title', centered: true })
        .result.then((result) => {
        if(result==='update'){
          this.closeResult = `Closed with: ${result}`;
          this.update();
        } else {
          this.package.nombre = '';
          this.package.alimentacion = '';
          this.package.asistencia = '';
          this.package.actividad = '';
        }
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      })
    }
  }

  private create() {
    this.packageService.createPackage(this.package).subscribe( (response: any) => {
      if (response.status === 'success') {
        this.getPackages();
      }
    }, err => {
      console.error('Error code from the backend: ' + err.status);
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

  private update() {
    this.package.updatedAt = this.updateAt.toISOString();
    this.packageService.updatePackage(this.package).subscribe( (response: any) => {
      if (response.status === 'success') {
        this.getPackages();
      }
    }, (error) => {
      console.log(error.message)
    })
  }
}
