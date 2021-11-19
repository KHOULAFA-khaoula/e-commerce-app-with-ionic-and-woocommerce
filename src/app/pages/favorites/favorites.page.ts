import { FavoritesService } from './../../services/favorites.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonSearchPage } from '../common-search/common-search.page';
import { Product } from 'src/app/models/product/product.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

   favorites = [ ]

  constructor(private modalController: ModalController,
              private favService : FavoritesService) { }

  ngOnInit() {

    this.favorites = this.favService.favProducts ; 
    console.log(" list of favorites items >>  " , this.favorites);
  }

  async onShowSearch(){
      
    const modal =  await this.modalController.create({
      component: CommonSearchPage,
     
    });

   return await modal.present();
}

onDeleteProduct(favorite : Product) {
      this.favService.onDeleteItem(favorite);
}

}
