import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [

      { 
 
          path: 'cart',
          loadChildren: () => import('../cart/cart.module').then( m => m.CartPageModule)
               
            
      
     },
     { 
 
      path: 'categories',
      loadChildren: () => import('../categories/categories.module').then( m => m.CategoriesPageModule)
           
        
  
    },
    { 
 
      path: 'favorites',
      loadChildren: () => import('../favorites/favorites.module').then( m => m.FavoritesPageModule)
           
        
  
 },
     {
 
           path: 'home',
           loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
            
     },
     
     {
      path: '',
      //the first thing to see when opening the tab
      redirectTo: 'tabs/home',
      pathMatch: 'full'
    }

   ]
  },

  {
    path: '',
    //the first thing to see when opening the tab
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
