import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import  * as WC from 'woocommerce-api'




@Injectable({
  providedIn: 'root'
})
export class WoocommerceService {

 
  WooCommerce: any;

  productList: any;



  consumerKey = "ck_2e5c8c394fb443600de17a5275577bf6c717977a"
  consumerSecret = "cs_3177b4dba3a1e281d328de7d7e01ae71fafa1f01"
  

  endpoint ='http://localhost/wordpress/wp-json/cocart/v2/cart/add-item'
  httpOptions = {
    headers : new HttpHeaders({'Content-Type': 'application/json'})
  }


  constructor(private http : HttpClient,
              private httpClient: HttpClient) { 
    this.WooCommerce = WC({

      //Authentifaction  data
        url: "http://localhost/wordpress",
        consumerKey:"ck_2e5c8c394fb443600de17a5275577bf6c717977a",
        consumerSecret:"cs_3177b4dba3a1e281d328de7d7e01ae71fafa1f01",
        wpAPI: true,
        version: 'wc/v3',
       
    });

   

     
    
    
    
  }


   

  getAllProducts(){

  // return this.http.get(`http://localhost/wordpress/wp-json/wc/v2/products?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`)
  
    return  this.WooCommerce.getAsync("products");
  }

  getAllCategories(){
    return this.WooCommerce.getAsync("products/categories");
  }
  
  getSingleProduct( id: number){
    return this.WooCommerce.getAsync(`products/${id}`)
  }

  getSingleCategory(id: number){
    return this.WooCommerce.getAsync(`products?category=${id}`)
  }

  getSingleTag(id: number){
    return this.WooCommerce.getAsync(`products?tag=${id}`)
  }



  
 

  /*addProductToCart(data){
    return this.httpClient.post(this.endpoint,JSON.stringify(data),this.httpOptions)
   
   }
*/
}
