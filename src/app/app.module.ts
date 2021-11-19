import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { WoocommerceService } from './services/woocommerce.service';


import { HTTP } from '@ionic-native/http/ngx'
import { InterceptorProviders } from './services/interceptor.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            HttpClientModule,
            IonicStorageModule.forRoot()
  ],
           
  providers: [
              { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
              HTTP,
             
              Platform,
              StatusBar,
              SplashScreen,
              WoocommerceService,
              InterceptorProviders,
             { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
              ], 
  bootstrap: [AppComponent],
})
export class AppModule {}
