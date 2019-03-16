import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../../../services/data.services';
import { Product } from '../../../modules/product.class';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
//import Sawl from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  public _subsription: Subscription;
  public _product: Product={};
  constructor( 
      public service:DataService,
      public router:Router,
    
    ) { }

  ngOnInit() {
      //this.service.getAllproduct.Da
  }
  onCreate(){
    this._subsription= this.service.getAllproduct(this._product).subscribe(data =>{
      if(data && data['id']){
        this.router.navigate(['/admin']);
      }
    });
  }
  onSubmit(formAdd){
    if(formAdd.valid){
      this.onCreate();
    }
    else{
      Swal.fire({
        title:'Error',
        text:'Not Empty',
      })
    }
  }
  ngOnDestroy(){
    if(this._subsription){
      this._subsription.unsubscribe();
    }
  }
}
