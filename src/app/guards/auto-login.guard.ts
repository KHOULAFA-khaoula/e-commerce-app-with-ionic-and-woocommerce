import { AuthentificationService } from './../services/authentification.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  
  constructor(private authService: AuthentificationService,
              private router: Router) {}

   canLoad(): Observable<boolean> {
    console.log(" >>>>> HEY it's the AUTO LOGIN GUARD <3")
      console.log("isAuthentifcated ", this.authService.isAuthentificated.value)
   return this.authService.isAuthentificated.pipe(
   
     filter(val => val !== null),
      take(1),// Otherwise the Observable doesn't complete! it will take only one result
      map( isAuthentificated => {
       
        if(!isAuthentificated) {
           //Simply allow access to the login
        
           console.log('Is not Authentificated aldready ');
           return true;
         
        } else {
           //Directly open inside area
           console.log('Is Authentificated aldready ');
           this.router.navigateByUrl('/tabs/home', { replaceUrl: true })
           return false;
         
        }
      }
    ))
    
    }
}
