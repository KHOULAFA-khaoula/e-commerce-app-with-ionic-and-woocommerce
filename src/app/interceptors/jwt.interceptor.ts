import { AuthentificationService } from './../services/authentification.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthentificationService){}

    intercept(request: HttpRequest<any>,
               next: HttpHandler) : Observable<HttpEvent<any>> {

                let currentUser = this.authService.getUserValue();
                
                if(currentUser && currentUser.token) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${currentUser.token}`
                        }
                    });
                }

                return next.handle(request);
            }
            }

               