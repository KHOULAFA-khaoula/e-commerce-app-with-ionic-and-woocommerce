import { WoocommerceService } from './../../services/woocommerce.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import  * as WC from 'woocommerce-api'
import { SingleProductPage } from '../single-product/single-product.page';
import { Product } from 'src/app/models/product/product.component';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.page.html',
  styleUrls: ['./single-category.page.scss'],
})
export class SingleCategoryPage implements OnInit {


  WooCommerce: any;

  productsByCatList: Product[] = [];

  categoryId  : number; 

  categoryName: string;


  constructor(private route: ActivatedRoute,
              private modalController: ModalController,
              private woocommerceService: WoocommerceService,
              private loadingCtrl : LoadingController) { 
    
  }
   
  
  async ngOnInit() {

    const loading = await this.loadingCtrl.create()
    loading.present()

    await this.route.queryParams.subscribe(params => {

          this.categoryId = params['id'] ;
          this.categoryName = params['name'];
     })

     this.woocommerceService.getSingleCategory(this.categoryId).then(
      async (data) => {
        loading.dismiss();
        const json_products = JSON.parse(data.body)
        console.log("the products are ...",)
        for (let i = 0; i <  json_products.length; i++) {
          const product: Product= new Product( json_products[i].id , json_products[i].name ,
                                   json_products[i].regular_price ,json_products[i].sale_price ,
                                    json_products[i].images[0].src , json_products[i].description , json_products[i].tags);
          this.productsByCatList.push(product);
          }
       
        console.log("heres the product list >> ", this.productsByCatList)
      }
      
    ),(err) => {
      loading.dismiss()
      console.log("error!!!")
    }
      
  }


  async onShowProduct(productToShow : Product){
    const modal =  await this.modalController.create({
      component: SingleProductPage,
      componentProps: {
        chosenProduct: productToShow
     }
    });

   return await modal.present();
  }
}
