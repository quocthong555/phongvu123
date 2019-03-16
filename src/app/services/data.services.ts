import { Injectable } from '@angular/core';

import { environment } from "./../../environments/environment";

import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Product } from '../modules/product.class';
import { Observable } from 'rxjs';


const url = `${environment.apiPV}/api/v1/products/list`

const urls = `${environment.apiPV}/api/v1/products/create`

const urledit=`${environment.apiPV}/api/v1/products/update`

const urldetail=`${environment.apiPV}/api/v1/products/detail`

@Injectable({

  providedIn: 'root'

})

export class DataService {


  public headers: HttpHeaders;


  constructor(

    private http: HttpClient

  ) {

    this.headers = this.setHeaders();

  }


  setHeaders(): HttpHeaders {

    const header = new HttpHeaders();

    const token: string = localStorage.getItem('userToken');

    if (!token) {

      return header.set('Content-Type', 'application/json');

    }

    return header.set('Content-Type', 'application/json').set('Authorization', `Bearer ${token}`);

  }

// hien thi du lieu bang API
  getAllproduct(product: Product) {

      return this.http.get<Product>(url);
  
    }
  
// truyen du lieu theo id
  getProductDetail(id:string){
    return this.http.get<Product>(`${urldetail}/${(id)}`,{headers:this.headers})
  }

  //them du lieu 
  addAllproduct(product: Product) {

    return this.http.post<Product[]>(urls, product, { headers: this.headers });

  }
  //update du lieu 
  UpdateProductID(product:Product){
    return this.http.put<Product>(`${urledit}/${product['_id']}`,product,{headers:this.headers})
  }

}