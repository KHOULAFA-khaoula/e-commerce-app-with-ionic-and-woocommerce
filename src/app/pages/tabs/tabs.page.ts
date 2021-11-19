import { FavoritesService } from './../../services/favorites.service';


import { LoginPage } from '../login/login.page';

import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

 
  loginPage: LoginPage;
 
  cartItems 

  favItems
 
 // @ViewChild(Tabs) tabs: Tabs;
 

  cartIcon = "cart-outline"
  favoriteIcon ='heart-outline'
  homeIcon ='home-outline'
  accountIcon ='person-circle-outline'




  cart: boolean = false;
  shop: boolean  = true;
  category: boolean  = false;
  favorite: boolean  = false;

   

  constructor( private cartService : CartService,
                private favService: FavoritesService) { }

  ngOnInit() {
    this.cartItems = this.cartService.cartItems;
    this.favItems = this.favService.favItems;

  }



  onClickCart(){
      console.log("cart is clicked"),
      this.cart = true
      this.shop = false
      this.favorite = false
      this.category = false
  }

  onClickCategories(){
    console.log("Categories are clicked")
    this.cart = false
    this.shop = false
    this.favorite = false
    this.category = true
    
}

onClickShop(){
  console.log("Shop is clicked")
  this.cart = false
  this.shop = true
  this.favorite = false
  this.category = false
}

onClickFavorite(){
  console.log("Favorite is clicked")

  this.cart = false
  this.shop = false
  this.favorite = true
  this.category = false
  
}

  

}
