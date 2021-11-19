import { FavoritesService } from './../../services/favorites.service';
import { Product } from './../../models/product/product.component';
import { CartService } from './../../services/cart.service';
import { WoocommerceService } from './../../services/woocommerce.service';
//import { FormGroup, FormBuilder, Validators ,ReactiveFormsModule} from '@angular/forms';
import { HomePage } from '../home/home.page';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';


import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.page.html',
  styleUrls: ['./single-product.page.scss'],
})
export class SingleProductPage implements OnInit {

  chosenProduct

  quantity: number = 1;

  homePage: HomePage;

  WooCommerce: any;
  
  //product

  isFavorite : boolean = false


  constructor( private modalController: ModalController,
               private woocommerceService : WoocommerceService,
               private cartService:CartService,
               private favService : FavoritesService,
               private navCtrl: NavController ,
               private loadingCtrl: LoadingController) {  
 }
  

   ngOnInit() {
   

   /* this.woocommerceService.getSingleProduct(this.productId).then(
     async (data) => {
       loading.dismiss()
        console.log(`products/${this.productId}`)
        console.log(JSON.parse(data.body))
        this.chosenProduct = JSON.parse(data.body)
        console.log("heres the name of the chosen product"+this.chosenProduct.name)
      }
    ), async (err) => {
      loading.dismiss()
      console.log("error!!!")
    }*/
   
    console.log("heres the name of the chosen product"+this.chosenProduct.name)
  }

   async onTagSelected(id , tagName: string) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
          id : id,
          tagName : tagName
      }
  };
  
    await this.navCtrl.navigateForward('single-tag',navigationExtras)
     this.onCloseModal();
  }
 
  
  
  async onCloseModal() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

  onToggleFavorite( product : Product){
    console.log("Favorite buttons was clicked")
    this.favService.onToggleFavorite(product);
   
   }

   onIncreaseQuantity(){
     
     this.quantity = this.quantity + 1 
     console.log(this.quantity)
   }

   onDecreaseQuantity(){
      if (this.quantity > 1) {
        this.quantity = this.quantity - 1 
      }
   
    console.log(this.quantity)
  }
  onAddProduct(){
    this.cartService.addProductToCart(this.chosenProduct);
  }
}
