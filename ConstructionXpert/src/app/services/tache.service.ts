import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tache } from '../models/tache.model';
import { Page } from '../models/page.model'; 

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private apiUrl = 'http://localhost:8087/api/taches'; 

  constructor(private http: HttpClient) { }

  createTache(tache: Tache, projetId: number): Observable<Tache> {
    return this.http.post<Tache>(`${this.apiUrl}/projet/${projetId}`, tache)
      .pipe(catchError(this.handleError));
  }

  getAllTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getTacheById(idTache: number): Observable<Tache> {
    return this.http.get<Tache>(`${this.apiUrl}/${idTache}`)
      .pipe(catchError(this.handleError));
  }

  updateTache(idTache: number, tache: Tache): Observable<Tache> {
    return this.http.put<Tache>(`${this.apiUrl}/${idTache}`, tache)
      .pipe(catchError(this.handleError));
  }

  deleteTache(idTache: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idTache}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getPaginatedTaches(page: number, size: number): Observable<Page<Tache>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<Tache>>(`${this.apiUrl}/pagination`, { params })
      .pipe(catchError(this.handleError));
  }

  // getSortedTaches(field: string, direction: 'asc' | 'desc', page: number, size: number): Observable<Page<Tache>> {
  //   const params = new HttpParams().set('page', page).set('size', size);
  //   return this.http.get<Page<Tache>>(`${this.apiUrl}/sort/${direction}?field=${field}`, { params })
  //     .pipe(catchError(this.handleError));
  // }


}