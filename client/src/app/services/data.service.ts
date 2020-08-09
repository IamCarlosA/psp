import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http: HttpClient) {}


  saveFacture(facture){
    return this.http.post(
      "http://localhost:3000/api/factures",
      facture
    ).pipe(
      map(resp => {
        return resp;
      })
    )
  }

  getFactures(){
    return this.http.get(
      "http://localhost:3000/api/factures"
    ).pipe(
      map(resp => {
        return resp;
      })
    )
  }

  getFactureById(id){
    return this.http.get(
      `http://localhost:3000/api/factures/${id}`
    ).pipe(
      map(resp => {
        return resp;
      })
    )
  }
  deleteFacture(id){
    return this.http.delete(
      `http://localhost:3000/api/factures/${id}`
    ).pipe(
      map(resp => {
        return resp;
      })
    )
  }

}
