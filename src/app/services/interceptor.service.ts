import { HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(request, next));
  }

  async handle(request: HttpRequest<any>, next: HttpHandler) {
    let authRequest = request;
  //  let token = null;
  //  await this.storageService.get(environment.authenticatedUserTokenKey).then(async(receivedToken)=>{await (token = receivedToken);});
   // const TOKEN_HEADER_KEY = 'Authorization';
    const CONTENT_TYPE_HEADER_KEY = 'Content-Type';
    const ACCEPT_HEADER_KEY = 'Accept';
    //
    const ACCESS_CONTROL_ALLOW_ORIGIN_KEY = 'Access-Control-Allow-Origin';
    const ACCESS_CONTROL_ALLOW_METHODS_KEY = 'Access-Control-Allow-Methods';
    const ACCESS_CONTROL_ALLOW_HEADERS_KEY = 'Access-Control-Allow-Headers';
    const ACCESS_CONTROL_ALLOW_CREDENTIALS_KEY = 'Access-Control-Allow-Credentials';
   /* const ACCESS_CONTROL_ALLOW_CREDENTIALS_KEY = 'Access-Control-Allow-Credentials';
    const ACCESS_CONTROL_ALLOW_CREDENTIALS_KEY = 'Access-Control-Allow-Credentials';
*/
    //consumerKey = "ck_2e5c8c394fb443600de17a5275577bf6c717977a",
    //consumerSecret"cs_3177b4dba3a1e281d328de7d7e01ae71fafa1f01",
    //
   /* if(token && authRequest.url.split('/')[2]!='open.er-api.com') {
      authRequest = authRequest.clone({ headers: authRequest.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }*/
  /*  if (!authRequest.headers.has('Content-Type') && authRequest.url.split('/')[(authRequest.url.split('/').length-1)]!='upload-media' && authRequest.url.split('/')[2]!='open.er-api.com') {
      authRequest = authRequest.clone({ headers: authRequest.headers.set(CONTENT_TYPE_HEADER_KEY, 'application/json') });
    }
   */// if (!authRequest.headers.has('Accept') && authRequest.url.split('/')[(authRequest.url.split('/').length-1)]!='upload-media' && authRequest.url.split('/')[2]!='open.er-api.com') {
     // authRequest = authRequest.clone({ headers: authRequest.headers.set(ACCEPT_HEADER_KEY, '*/*') });
   // }
    //
    authRequest = authRequest.clone({ headers: authRequest.headers.set(ACCESS_CONTROL_ALLOW_ORIGIN_KEY, '*') });
    authRequest = authRequest.clone({ headers: authRequest.headers.set(ACCESS_CONTROL_ALLOW_METHODS_KEY, 'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD') }); // TRACE, CONNECT,
    authRequest = authRequest.clone({ headers: authRequest.headers.set(ACCESS_CONTROL_ALLOW_HEADERS_KEY, '*') });
    authRequest = authRequest.clone({ headers: authRequest.headers.set(ACCESS_CONTROL_ALLOW_CREDENTIALS_KEY, 'true') });
   // authRequest = authRequest.clone({ headers: authRequest.headers.set(ACCESS_CONTROL_ALLOW_CREDENTIALS_KEY, 'true') });
    //authRequest = authRequest.clone({ headers: authRequest.headers.set(ACCESS_CONTROL_ALLOW_CREDENTIALS_KEY, 'true') });
   // consumerKey = "ck_2e5c8c394fb443600de17a5275577bf6c717977a",
    //consumerSecret:"cs_3177b4dba3a1e281d328de7d7e01ae71fafa1f01",
    //
    return next.handle(authRequest).toPromise();

  }
}
export const InterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass:  InterceptorService  , multi: true }
];