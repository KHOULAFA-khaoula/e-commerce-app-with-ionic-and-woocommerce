import { StorageService } from './services/storage.service';
import { AuthentificationService } from './services/authentification.service';
import { TabsPage } from './pages/tabs/tabs.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { Router, RouterEvent } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  tabsPage:any = TabsPage;

 active =""

 Pages = [
   {
     title: 'Logout',
     url: '/login',
     icon: 'exit'
   }
 ]
  constructor(private platform: Platform,
               private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private router: Router,
              private authService: AuthentificationService,
              private storage : StorageService,
            ) {

                this.router.events.subscribe((event:RouterEvent) =>{
                  this.active = event.url
                })
                this.initializeApp();
    }
 

    async initializeApp(){
    
      const userValue = await this.storage.get('jwtKEy');
      console.log("this the user value  >>> " + userValue)
      this.platform.ready().then(
        () => {
          this.router.navigateByUrl(this.tabsPage)
          this.statusBar.styleDefault();
           setTimeout(() => {
        this.splashScreen.hide();
      }, 1000);

         

  /*
         if(!userValue){
            this.router.navigateByUrl('/login')
        } else {
          this.router.navigateByUrl('/tabs/home',{replaceUrl : true})
        }

    */
        }
      )
         
        
      /*  console.log('from storage data: ', data)
        console.log('is already authentificated ', this.isAuthentificated.value)
*/
 
   /*   if (!this.authService.token) {
        this.route.navigate(["login"]);
      } else {
        this.route.navigate(["home"]);*/
      }
    

   async onLogout(){
        await this.authService.logout();
        this.router.navigateByUrl('/', {replaceUrl : true})
    }

    
    
    
}
