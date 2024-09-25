import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Projet } from '../../models/projet.model';
import { ProjetDialogComponent } from '../../projet/projet-dialog/projet-dialog.component';
import { ProjetService } from 'src/app/services/projet.service';
import { faTrashAlt , faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-projets',
  templateUrl: './manage-projet.component.html',
  styleUrls: ['./manage-projet.component.css']
})
export class ManageProjetsComponent {
  projets: Projet[] = [];
  errorMessage: string | null = null;

  searchTerm: string = '';


  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faInfoCircle = faInfoCircle;

  @Output() projectSelected = new EventEmitter<Projet>();

  constructor(private projetService: ProjetService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets(): void {
    this.projetService.getAllProject().subscribe(
      (data: Projet[]) => this.projets = data,
      error => this.errorMessage = 'Error loading projets'
    );
  }

  openDialog(projet: Projet | null = null): void {
    const dialogRef = this.dialog.open(ProjetDialogComponent, {
      width: '400px',
      data: { projet: projet || { idProjet: 0, nomProjet: '', description: '', dateDebut: new Date(), dateFin: new Date(), budget: 0 } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProjets();
      }
    });
  }

  deleteProjet(idProjet: number): void {
    if (confirm('Are you sure you want to delete this projet?')) {
      this.projetService.deleteProject(idProjet).subscribe(
        () => this.loadProjets(),
        error => this.errorMessage = 'Error deleting projet'
      );
    }
  }

  showDetails(projet: Projet): void {
    console.log('Selected Project:', projet);
    this.projectSelected.emit(projet);
  }

  

  

  sortedProjectAsc() {
    this.projets.sort((a, b) => a.nomProjet.localeCompare(b.nomProjet));
  }
  
  sortedProjectDesc() {
    this.projets.sort((a, b) => b.nomProjet.localeCompare(a.nomProjet));
  }
  

  filteredProjets(): Projet[] {
    return this.projets.filter(projets=>
    projets.nomProjet.toLowerCase().includes(this.searchTerm.toLowerCase())

    );
  }
  
}