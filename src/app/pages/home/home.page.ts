import { FavoritesService } from './../../services/favorites.service';
import { Product } from './../../models/product/product.component';
import { CartService } from './../../services/cart.service';
import { WoocommerceService } from '../../services/woocommerce.service';
import { SingleProductPage } from '../single-product/single-product.page';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';

import  * as WC from 'woocommerce-api'
import { Observable } from 'rxjs';
import { CommonSearchPage } from '../common-search/common-search.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  WooCommerce: any;

  productList: Product[] = [];

  productById: any;

  filterTerm: string;

  isFavorite: boolean = false;

  constructor(public modalController:ModalController,
              private woocommerceService:WoocommerceService,
              private cartService:CartService, 
              private loadingCtrl: LoadingController,
              private favService: FavoritesService)  {

            
 
      

  }

  async onShowThisProduct(productToShow: Product){
      
       const modal =  await this.modalController.create({
         component: SingleProductPage,
         componentProps: {
          chosenProduct: productToShow
        }
       });

      return await modal.present();
  }


  async onShowSearch(){
      
    const modal =  await this.modalController.create({
      component: CommonSearchPage,
     
    });

   return await modal.present();
}

  onAddToCart(productToBuy : Product){
  
    this.cartService.addProductToCart(productToBuy).then(
      (response) => {
      // let response = (JSON.parse(data.body));
          console.log("this the response of adding a product !!!!!!")  
          console.log("Response Status:", response.status);
          console.log("Response Headers:", response.headers);
          console.log("Response Data:", response.data);
      }),(error) => {
        console.log("Error on adding a product !!!!!!")  
        console.log("Response Status:", error.status);
        console.log("Response Headers:", error.headers);
        console.log("Response Data:", error.data);
      }

 }

 
 async ngOnInit(){

    const loading = await this.loadingCtrl.create()

    loading.present();

    this.woocommerceService.getAllProducts().then(
      async (data) => {
        this.loadingCtrl.dismiss()
        console.log("success!!!")
        console.log(JSON.parse(data.body))
        const json_products = JSON.parse(data.body)
        for (let i = 0; i < json_products.length; i++) {
          const product: Product= new Product( json_products[i].id , json_products[i].name ,
                                   json_products[i].regular_price ,json_products[i].sale_price ,
                                    json_products[i].images[0].src , json_products[i].description , json_products[i].tags);
          this.productList.push(product);
          }
       
        console.log("heres the product list >> ", this.productList)
      }
    ),async (err) => {
      await loading.dismiss()
      console.log("error!!!")
    }
  }

  onToggleFavorite( product : Product) {
          this.favService.onToggleFavorite(product);
  }

  
}
