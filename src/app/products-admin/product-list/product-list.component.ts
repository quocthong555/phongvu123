import { Component, OnInit } from '@angular/core';
import { Product } from '../../modules/product.class';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.services';
import { Router, ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public _product: Product={};
  public _subscription : Subscription;
  constructor(
    public service:DataService,
    
    ) { }

  ngOnInit() {
    this._subscription = this.service.getAllproduct(this._product).subscribe(data =>{
      this._product = data;
      console.log(data)
    });
  }
  onDeactive(id){
    this._subscription=this.service.getProductDetail(id).subscribe((product:Product)=>{
      this._product = product;
    });
    console.log(this._product);
  }
  ngOnDestroy(){
    if(this._subscription){
      this._subscription.unsubscribe();
    }
  }
}
