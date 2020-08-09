import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import Swal from 'sweetalert2'
import { Router} from '@angular/router';
@Component({
  selector: 'app-list-factures',
  templateUrl: './list-factures.component.html',
  styleUrls: ['./list-factures.component.css']
})
export class ListFacturesComponent implements OnInit {
  factures: any = [];
  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.data.getFactures().subscribe((resp:any) =>{
      this.factures = resp.factures;
    }, (e:any)=>{
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: 'Error',
        text: `${e}`
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['create-bills'])
        }
      });
    })
  }

}
