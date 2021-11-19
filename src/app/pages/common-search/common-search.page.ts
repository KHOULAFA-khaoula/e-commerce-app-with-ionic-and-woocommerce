import { WoocommerceService } from './../../services/woocommerce.service';
import { StorageService } from './../../services/storage.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { SingleProductPage } from '../single-product/single-product.page';

@Component({
  selector: 'app-common-search',
  templateUrl: './common-search.page.html',
  styleUrls: ['./common-search.page.scss'],
})
export class CommonSearchPage implements OnInit {
  

  searchTerm: string;
  storageKey: string = "recent_searches";
  recentSearches : any = [];

  productsList = []

  constructor(private modalController : ModalController,
              private storage: StorageService,
              private woocommerceService: WoocommerceService) { 

               this.woocommerceService.getAllProducts().then((result) => {
                console.log("those are the products ==> ", JSON.parse(result.body))
                this.productsList = JSON.parse(result.body)
               }),(err) => {
                 console.log('erroor !! => ',err)
               }
                   
               


               this.storage.get(this.storageKey).then((result) => {
                 console.log("result :>> ", result)
                 this.recentSearches=result
               }).catch((err) =>
               console.log('err :>> ', err))
         
              }


   onSubmit( term?: string) {
        
          if( term ) {
            this.searchTerm = term
          }

          console.log('searchTerm :>>', this.searchTerm);

          // this condition checks if the word isn't null and if it contains only spaces
          //  ==> trim function erases spaces in word

          if ( this.searchTerm && this.searchTerm.trim()) 
          {
              //this condition checks if the word has already been stored
              if ( !this.recentSearches.includes(this.searchTerm)) 
            {
                this.recentSearches.push(this.searchTerm) ;
                
                this.storage.set(this.storageKey, this.recentSearches)
            }
          }
   }     

   onClearSearches(){
     this.recentSearches = [];
     this.storage.remove(this.storageKey)
   }

   async onShowProduct(id: number){
    const modal =  await this.modalController.create({
      component: SingleProductPage,
      componentProps: {
        productId: id
     }
    });

   return await modal.present();
  }

  async onCloseModal() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

  ngOnInit() {
  }
}
