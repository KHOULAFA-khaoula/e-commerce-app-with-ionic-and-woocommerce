import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { CommonSearchPage } from '../common-search/common-search.page';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  
  cart = [] 
  items;
  total 
  constructor(private modalController: ModalController,
              private alertController: AlertController,
              private cartService : CartService) { }

  ngOnInit() {
    console.log("this cart page ")
    this.cart = this.cartService.cart
    this.items =  this.cartService.cartItems
    this.total = this.cartService.total;
    console.log("items in cart are : >> ",this.cart)
    
  }

  async onShowSearch(){
      
    const modal =  await this.modalController.create({
      component: CommonSearchPage,
     
    });

   return await modal.present();
}

async onDeleteProduct(item) {

        let alert =  await this.alertController.create({
          header: 'Remove Product',
          message: 'Are you sure you want to remove this item form cart ?',
          buttons: [
             {
               text : 'Cancel',
               role: 'cancel'

             },
             {
               text: 'Yes , Remove ', 
               handler : () => {
                this.cartService.onDeleteItem(item);
               }
             }

          ]
        }) 
    alert.present();
}
}
