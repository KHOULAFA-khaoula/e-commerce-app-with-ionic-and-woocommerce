import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    /*  children: [

     { 

          path: 'login',
          children: [
              { 
                path: '',
                loadChildren: () => import('../pages/login/login.module').then( m => m.LoginPageModule)
              }
           ]
     
    },
    {

          path: 'dashboard',
          children: [
            {    path: '',
                 loadChildren: () => import('../pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
            }
          ]
    },
    { 
          path: 'register',
          children: [
             {
                path: 'register',
                loadChildren: () => import('../pages/register/register.module').then( m => m.RegisterPageModule)
          }
         ]
    },

  ] */
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
