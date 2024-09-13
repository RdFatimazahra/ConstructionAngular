import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // constructor(private router: Router) {}

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = localStorage.getItem('jwt');

  //   // Clone the request to add the new header with the token
  //   let clonedReq = req;
  //   if (token) {
  //     clonedReq = req.clone({
  //       headers: req.headers.set('Authorization', `Bearer ${token}`)
  //     });
  //   }

  //   return next.handle(clonedReq).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       if (error.status === 401) {
  //         // Redirect to login if unauthorized
  //         this.router.navigate(['/login']);
  //       }
  //       return throwError(() => error);
  //     })
  //   );
  // }
  constructor(private router: Router, private authService: AuthenticateService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }

}

