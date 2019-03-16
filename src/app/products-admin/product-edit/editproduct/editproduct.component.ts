import { Component, OnInit,OnDestroy } from '@angular/core';
import { Product } from '../../../modules/product.class';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/data.services';
import { Router, ActivatedRoute,Params } from '@angular/router';
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  public _subscription : Subscription;
  public _subscriptionParams : Subscription;
  public _product : Product = {};
  constructor(
    public router :Router,
    public service:DataService,
    private activeRouterService:ActivatedRoute,
  ) { }

  ngOnInit() {
    this._subscription=this.service.getAllproduct(this._product).subscribe(data =>{
      this._product=data;
    })
  }
  getID(){
    this._subscriptionParams=this.activeRouterService.params.subscribe((data :Params) =>{
      this._subscription=this.service.getProductDetail(data['id']).subscribe((Product:Product) =>{
        this._product = Product;
      })
    })
  }
  onUpdate(){
    this._subscription = this.service.UpdateProductID(this._product).subscribe((data: Product) =>{
      this.router.navigateByUrl('/admin');
    })
  }
  ngOnDestroy(){
    if(this._subscription){
      this._subscription.unsubscribe();
    }
    if(this._subscriptionParams){
      this._subscriptionParams.unsubscribe();
    }
  }
}
