import { isPlatform, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, switchMap, tap } from 'rxjs/operators';

import {Storage} from '@ionic/storage-angular'
import  * as WC from 'woocommerce-api'
import { BehaviorSubject, from } from 'rxjs';

import '@capacitor-community/http'
import { Plugins } from '@capacitor/core';
import { StorageService } from './storage.service';


export const JWT_KEY = 'jwtKEy'

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {

  isAuthentificated :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  WooCommerce: any;

  

  private _storage: Storage | null = null;

  user = new BehaviorSubject(null)

  constructor(private http:HttpClient,
              public storage: StorageService,
              private plt: Platform) { 
   
          //this.init();
            this.loadToken();
            this.storage.get(JWT_KEY).then(data => {
                  this.user.next(data)
                   console.log("from authService is Authenticated >> ", this.isAuthentificated.value)
                  console.log('from storage data: ', data)
                  console.log('user value >>  ', this.getUserValue())

            })

          
  }

  /*async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }*/


  async loadToken() {
    const userToken = await this.storage.get(JWT_KEY)
    console.log(">>>> here's the token " , userToken) 
     this.isAuthentificated.next(userToken ? true : false)
     console.log(">>>> is Authenticated " , this.isAuthentificated.value) 
   
  }

   async ifLoggedIn():Promise<BehaviorSubject<Boolean>>{
        const userToken =await  this.storage.get(JWT_KEY)
        console.log("TOKEN !! " , userToken)
              if (userToken){
                this.isAuthentificated.next(true)
              }
       return this.isAuthentificated
  }

  
  signIn(password: string , username: string){
     //https://cors-anywhere.herokuapp.com/
    return this.http.post(`${environment.apiUrl}/jwt-auth/v1/token`, { username, password }).pipe(
      switchMap(data => {
        console.log('data: ', data);
        return from(this.storage.set(JWT_KEY, data));
      }),
      tap(data => {
        this.user.next(data);
        this.isAuthentificated.next(true);
      })
    );

  }


  signUp(password:string, username:string, email:string ){
      return this.http.post(`${environment.apiUrl}/wp/v2/users/register`,{username, email, password}).pipe(
        switchMap(data => {
          console.log('data: ', data);
          return from(this.storage.set(JWT_KEY, data));
        }),
        tap(data => {
          this.user.next(data);
          this.isAuthentificated.next(true);
        })
      );
  
  }
  


  resetPassword(usernameOrEmail){
    return this.http.post(`${environment.apiUrl}/wp/v2/users/lostpassword`, {user_login: usernameOrEmail})
  }

  getCurrentUser(){
        return this.user.asObservable();

  }

  getUserValue(){
    return this.user.getValue()
  }
  
  async logout() {
    console.log("logging out ")
    await this.isAuthentificated.next(false)
    await this.user.next(null)
    await this.storage.remove(JWT_KEY)
    /*. then(() => {
     
    })*/
   
    
  }


 
 
}
