import { Injectable } from '@angular/core';
import {Ressource} from "../models/ressource.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Tache} from "../models/tache.model";

@Injectable({
  providedIn: 'root'
})
export class RessourceService {
  private baseUrl = 'http://localhost:8087/api/ressources';
  private allResourcesUrl = 'http://localhost:8087/api/ressources/all';
  private tachesUrl = 'http://localhost:8087/api/taches';
 private ressource ="http://localhost:8087/api/taches";
  constructor(private http: HttpClient) {
  }

  recupererTouts(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(this.allResourcesUrl);
  }

  deleteRessource(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  addRessource(objet: Ressource, idTache: number): Observable<Ressource> {
    const url = `${this.baseUrl}/tache/${idTache}`;
    return this.http.post<Ressource>(url, objet);
  }


  // getTacheById(id: number): Observable<Tache> {
  //   const url = `${this.tachesUrl}/${id}`;
  //   return this.http.get<Tache>(url);
  //
  // }

  // Méthode pour récupérer toutes les tâches
  getAllTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.ressource); // Utilisez l'URL correcte pour récupérer toutes les tâches
  }
}
