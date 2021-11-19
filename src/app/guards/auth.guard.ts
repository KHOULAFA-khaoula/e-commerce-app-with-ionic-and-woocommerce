import { AuthentificationService } from './../services/authentification.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
 
  constructor(private authService: AuthentificationService, private router: Router){}
 
  canLoad(): Observable<boolean>{
    console.log(" >>>>> HEY  it's the AUTH GUARD <3")
   
    return this.authService.isAuthentificated.pipe(
      filter(val => val !==null), // Filter the initial Behaviour subject value
      take(1), //OtherWise the Observable doesn't complete
      map(isAuthentificated => {
        if(isAuthentificated) {
          return true;
        }else {
          this.router.navigateByUrl('/login')
          return false;
        }
      })

    );
  
  }
}


/**
 * 
 * 
  canLoad(): Observable<boolean>{
      return this.authService.isAuthentificated.pipe(
        filter(val => val !==null), // Filter the initial Behaviour subject value
        take(1), //OtherWise the Observable doesn't complete
        map(isAuthentificated => {
          if(isAuthentificated) {
            return true;
          }else {
            this.router.navigateByUrl('/login')
            return false;
          }
        })

      );
    
    }
 */