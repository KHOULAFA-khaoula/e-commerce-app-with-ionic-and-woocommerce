import { Injectable } from '@angular/core';

import CoCartAPI from "@cocart/cocart-rest-api";
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product/product.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  CoCart: any;
  cartItems = new BehaviorSubject(0);
  cart :Product[] = [];


  constructor() {

    this.CoCart = new CoCartAPI({
      url: "http://localhost/wordpress",
      consumerKey:"khaoula",
      consumerSecret:"123456jghjghkug",
     }
     );
   }


  addProductToCart( product){
    var data = {
      id:product.id,
      quantity:product.quantity,
  }

    product.quantity = product.quantity + 1 

    if(!this.cart.includes(product)) {
      this.cartItems.next(this.cartItems.value + 1);
      this.cart.push(product)
    }
   
    console.log("the number of items are : " + this.cartItems.value)
    console.log("***** the cart : " + this.cart)
   return this.CoCart.post("cart/add-item",data)
   // return this.CoCart.get("cart")
  }

  onDeleteItem(item) {
    let index = this.cart.indexOf(item); 

    if(index > -1){
      this.cart.splice(index, 1);
    }
    this.cartItems.next(this.cartItems.value - 1 )
    console.log("the nex cart contains :  " ,this.cart)
  }
}
