import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {
    path: '',
   redirectTo: '/login',
   pathMatch: 'full'
   
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad:  [AutoLoginGuard] //Checks if we should forward to inside
  },

  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canLoad: [AuthGuard]  // secure all child pages
  },
 
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'single-product',
    loadChildren: () => import('./pages/single-product/single-product.module').then( m => m.SingleProductPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'single-category',
    loadChildren: () => import('./pages/single-category/single-category.module').then( m => m.SingleCategoryPageModule)
  },
  {
    path: 'single-category/:id',
    loadChildren: () => import('./pages/single-category/single-category.module').then( m => m.SingleCategoryPageModule)
  },
 
  {
    path: 'common-search',
    loadChildren: () => import('./pages/common-search/common-search.module').then( m => m.CommonSearchPageModule)
  },
  {
    path: 'single-tag',
    loadChildren: () => import('./pages/single-tag/single-tag.module').then( m => m.SingleTagPageModule)
  },
  {
    path: 'single-tag/:id',
    loadChildren: () => import('./pages/single-tag/single-tag.module').then( m => m.SingleTagPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
   // canLoad: [AuthGuard] 
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
