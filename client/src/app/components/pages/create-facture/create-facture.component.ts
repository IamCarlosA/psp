import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2'
import {DataService} from '../../../services/data.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-create-facture',
  templateUrl: './create-facture.component.html',
  styleUrls: ['./create-facture.component.css']
})
export class CreateFactureComponent implements OnInit {
  facture: any = new Object();
  products: any = [];
  createBillForm: FormGroup;
  productsBillForm: FormGroup;
  subtotal:number=0;
  tax:number=0;
  discount:number=0;
  total:number=0;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.createBillForm = new FormGroup({
      'employee': new FormControl('', Validators.required),
      'customer': new FormControl('', Validators.required)
    });

    this.productsBillForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'quantify': new FormControl('', Validators.required),
      'price': new FormControl('', Validators.required)
    })
  }
  add() {
    this.products.push(this.productsBillForm.value)
    this.subtotal = this.subtotal + (this.productsBillForm.value.price * this.productsBillForm.value.quantify);

    this.tax=this.subtotal * 0.19;
    this.total = this.subtotal + this.tax

    if(this.subtotal > 250000){
      this.discount = this.total * 0.05;
      this.total= this.total - this.discount
    }

    this.productsBillForm.reset();
  }

  onSubmit() {
    this.facture.employee = this.createBillForm.value.employee;
    this.facture.customer = this.createBillForm.value.customer;
    this.facture.products = this.products;
    this.facture.subtotal = this.subtotal;
    this.facture.tax = this.tax;
    this.facture.discount = this.discount;
    this.facture.total = this.total;
    this.data.saveFacture(this.facture).subscribe((resp:any) =>{
      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        title: 'Success',
        text: `${resp.message}`
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['list-bills'])
        }
      });
    }, (e:any)=>{
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: 'Error',
        text: `${e}`
      }).then((result) => {
        if (result.value) {
          this.createBillForm.reset();
          this.productsBillForm.reset();
        }
      });
    })
  }
}
