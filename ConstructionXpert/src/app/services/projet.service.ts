import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Projet } from '../models/projet.model';
import { AuthenticateService } from './authenticate.service';



@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  // // PORT CHANGE FROM 87 TO 81
  // private apiUrl = 'http://localhost:8087/api/projets'; 

  // constructor(private http: HttpClient) { }

  // createProjet(projet: Projet): Observable<Projet> {
  //   return this.http.post<Projet>(`${this.apiUrl}`, projet,{ headers: this.getHeaders() })
  //     .pipe(catchError(this.handleError));
  // }

  // getAllProject(): Observable<Projet[]> {
  //   return this.http.get<Projet[]>(this.apiUrl)
  //     .pipe(catchError(this.handleError));
  // }


  // getProjectById(idProjet: number): Observable<Projet> {
  //   return this.http.get<Projet>(`${this.apiUrl}/${idProjet}`)
  //     .pipe(catchError(this.handleError));
  // }

  // updateProject(idProjet: number, projet: Projet): Observable<Projet> {
  //   return this.http.put<Projet>(`${this.apiUrl}/${idProjet}`, projet)
  //     .pipe(catchError(this.handleError));
  // }

  // deleteProject(idProjet: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${idProjet}`)
  //     .pipe(catchError(this.handleError));
  // }
  // private handleError(error: HttpErrorResponse) {
  //   let errorMessage = 'An unknown error occurred!';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.error(errorMessage);
  //   return throwError(() => new Error(errorMessage));
  // }

  private apiUrl = 'http://localhost:8087/api/projets';

  constructor(private http: HttpClient, private authService: AuthenticateService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllProject(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  createProjet(projet: Projet): Observable<Projet> {
      return this.http.post<Projet>(`${this.apiUrl}`, projet,{ headers: this.getHeaders() })
     .pipe(catchError(this.handleError));
    }

   getProjectById(idProjet: number): Observable<Projet> {
     return this.http.get<Projet>(`${this.apiUrl}/${idProjet}`,{ headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
    }

   updateProject(idProjet: number, projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.apiUrl}/${idProjet}`, projet,{ headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
   }

   deleteProject(idProjet: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idProjet}`,{ headers: this.getHeaders() })
       .pipe(catchError(this.handleError));
   }

   



  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur inconnue s\'est produite !';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      errorMessage = `Code d'erreur : ${error.status}\nMessage : ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}




