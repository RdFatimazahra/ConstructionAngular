import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Jwt } from '../models/Jwt';
import { User } from '../models/user.model';


const BASE_URL  = ["http://localhost:8087/api/v1/auth/"]

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

//   private readonly TOKEN_KEY = 'jwt_token'

//   constructor(private http: HttpClient,private jwtHelper:JwtHelperService,  private router: Router) { }

//   register(signRequest: any): Observable<Jwt> {
//     return this.http.post<Jwt>(BASE_URL + 'Admin/register', signRequest);
//   }

//   login(loginRequest: any): Observable<Jwt> {
//     return this.http.post<Jwt>(BASE_URL + 'authenticate', loginRequest);
//   }

//   getUserCount(): Observable<number> {
//     return this.http.get<number>(BASE_URL + 'Admin/count');
//   }

//   getToken(): string | null {
//     return localStorage.getItem('jwt');
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }


//   getAllUser(): Observable<User[]> {
//     return this.http.get<User[]>(`${BASE_URL}Admin/AllUsers`);
//   }



//   getUserRole(): string {
//     const token = localStorage.getItem(this.TOKEN_KEY);
//     if (token) {
//       const decodedToken = this.jwtHelper.decodeToken(token);
//       return decodedToken.role; 
//     }
//     return '';
//   }

//   logout(): void {
//     localStorage.removeItem(this.TOKEN_KEY);
//     this.router.navigate(['/login']);  // Redirect to login page after logout
//   }

private readonly TOKEN_KEY = 'jwt';

constructor(
  private http: HttpClient,
  private jwtHelper: JwtHelperService,
  private router: Router
) { }

 register(signRequest: any): Observable<Jwt> {
  return this.http.post<Jwt>(`${BASE_URL}register`, signRequest);
}

login(loginRequest: any): Observable<Jwt> {
  return this.http.post<Jwt>(`${BASE_URL}authenticate`, loginRequest).pipe(
    tap(response => {
      if (response && response.token) {
        localStorage.setItem(this.TOKEN_KEY, response.token);
      }
    })
  );
}

getToken(): string | null {
  return localStorage.getItem(this.TOKEN_KEY);
}

isLoggedIn(): boolean {
  const token = this.getToken();
  return token !== null && !this.jwtHelper.isTokenExpired(token);
}

logout(): void {
  localStorage.removeItem(this.TOKEN_KEY);
  this.router.navigate(['/home']);
}

 }
