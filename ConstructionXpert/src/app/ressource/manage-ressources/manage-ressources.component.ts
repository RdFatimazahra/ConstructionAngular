import {Component, OnInit} from '@angular/core';
import {Ressource} from "../../models/ressource.model";
import {RessourceService} from "../../services/ressource.service";

@Component({
  selector: 'app-manage-ressources',
  templateUrl: './manage-ressources.component.html',
  styleUrls: ['./manage-ressources.component.css']
})
export class ManageRessourcesComponent implements OnInit{
  ressources :Ressource[]=[];
  displayedColumns: string[] = ['idRessource', 'nom', 'type', 'quantite', 'fournisseur', 'idTache'];


  constructor(private services:RessourceService) {}
  onLoading(): void {
    this.services.recupererTouts().subscribe(
      (response: Ressource[]) => {
        this.ressources = response;
        console.log('Succès', response);
      },
      (error) => {
        console.log('Not found', error);
      }
    );
  }

  ngOnInit(): void {
    this.onLoading();
  }

  deleteRessource(idRessource: number) {
    this.services.deleteRessource(idRessource).subscribe(
      () => {
        this.ressources = this.ressources.filter(ressource => ressource.idRessource !== idRessource);
        console.log('Ressource supprimée avec succès');
      },
      (error) => {
        console.log('Erreur lors de la suppression de la ressource', error);
      }
    );
  }
}
