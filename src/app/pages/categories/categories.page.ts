import { WoocommerceService } from './../../services/woocommerce.service';
import { SingleCategoryPage } from './../single-category/single-category.page';
import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController } from '@ionic/angular';

import  * as WC from 'woocommerce-api'
import { NavigationExtras } from '@angular/router';
import { CommonSearchPage } from '../common-search/common-search.page';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  WooCommerce: any;

  categoriesList: any;

  categoryById: any;

  constructor(private navController: NavController,
              private modalController: ModalController,
              private woocoomerceService: WoocommerceService,
              private loadingCtrl : LoadingController)  {

  
    
  }
   
  onClickCategory(id : number, name:string){
        let navigationExtras: NavigationExtras = {
          queryParams: {
            id: id,
            name: name
          }
        }
       this.navController.navigateForward(['single-category'],navigationExtras)
          
  }

  async onShowSearch(){
      
    const modal =  await this.modalController.create({
      component: CommonSearchPage,
     
    });

   return await modal.present();
}


  async ngOnInit() {
    const loading =  await this.loadingCtrl.create()
    loading.present();

    this.woocoomerceService.getAllCategories().then(
      async (data) => {
        loading.dismiss();
        console.log("Categories are loading!!!")
        console.log(JSON.parse(data.body))
        this.categoriesList = JSON.parse(data.body)
      }
    ),(err) => {
      loading.dismiss();
      console.log("error!!!")
    }

  }

}
