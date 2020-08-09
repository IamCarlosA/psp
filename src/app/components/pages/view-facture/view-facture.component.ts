import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../../../services/data.service';
@Component({
  selector: 'app-view-facture',
  templateUrl: './view-facture.component.html',
  styleUrls: ['./view-facture.component.css']
})
export class ViewFactureComponent implements OnInit {
  facture: any = {};
  products: any = [];
  constructor(private router: ActivatedRoute, private data: DataService, private _router: Router) { }

  ngOnInit(): void {
    this.data.getFactureById(this.router.snapshot.paramMap.get('id')).subscribe((resp: any) => {
      this.facture = resp.facture;
      this.products = this.facture.products;
    }, (err) => {
      console.log(err)
    })


  }
  delete() {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.data.deleteFacture(this.router.snapshot.paramMap.get('id')).subscribe((resp: any) => {
          this._router.navigate(['list-bills'])
        }, (err) => {
          Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: 'Error',
            text: `${err}`
          }).then((result) => {
            if (result.value) {
              this._router.navigate(['list-bills'])
            }
          });
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ).then((r) => {
          if (r.value) {
            this._router.navigate(['list-bills'])
          }
        });
      }
    })


  }
}
