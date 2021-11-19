import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product/product.component';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favItems = new BehaviorSubject(0);

  favProducts : Product[] = [];
  constructor() { 

    
  }

  onToggleFavorite(product: Product) {
     product.isFavorite = !product.isFavorite;

     // if the product is already a favorite one , so it's removed from the list of favorites
     if(this.favProducts.includes(product)) {
              let index = this.favProducts.indexOf(product); 

              if(index > -1){
                this.favProducts.splice(index, 1);
              }
              this.favItems.next(this.favItems.value - 1)
     }

     // otherwise it's added to favorites list
     else {
            this.favProducts.push(product)
            this.favItems.next(this.favItems.value + 1)
     }

  }

  onDeleteItem(product : Product) {
    product.isFavorite = false;
    let index = this.favProducts.indexOf(product); 

    if(index > -1){
      this.favProducts.splice(index, 1);
    }
    this.favItems.next(this.favItems.value - 1 )
    console.log("the nex cart contains :  " ,this.favProducts)
  }
}
