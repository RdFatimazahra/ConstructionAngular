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

  totalRecords: number = 0;
  pageSize: number = 5; // Nombre d'éléments par page
  currentPage: number = 1;

  searchTerm: string = '';


  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faInfoCircle = faInfoCircle;

  @Output() projectSelected = new EventEmitter<Projet>();

  constructor(private projetService: ProjetService, private dialog: MatDialog) { }

  ngOnInit(): void {
   this.loadProjets();
   //this.loadProjetsWithPagination();
  }


   // Load paginated projects
   /*loadProjetsWithPagination(): void {
    this.projetService.getProjectsWithPagination(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        console.log("Data received:", data);  // Log data
        this.projets = Array.isArray(data?.content) ? data.content : [];
        this.totalElements = data?.totalElements || 0;
      },
      error => this.errorMessage = 'Error loading paginated projets'
    );
  }
  
  

  // Sorting Ascending
  sortProjectsAsc(field: string): void {
    this.projetService.getProjectsWithSortingAsc(field).subscribe(
      (data: Projet[]) => this.projets = data,
      error => this.errorMessage = 'Error sorting projets (asc)'
    );
  }

  // Sorting Descending
  sortProjectsDesc(field: string): void {
    this.projetService.getProjectsWithSortingDesc(field).subscribe(
      (data: Projet[]) => this.projets = data,
      error => this.errorMessage = 'Error sorting projets (desc)'
    );
  }

  // Handle page change
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProjetsWithPagination();
  } */


  // Load all projects
  loadProjets(): void {
    this.projetService.getAllProject().subscribe(
      (data: Projet[]) => {
        if (Array.isArray(data)) {  // Ensure data is an array
          this.projets = data;
        } else {
          this.projets = [];  // Fallback to an empty array if data is not an array
          console.error('API response is not an array');
        }
      },
      error => this.errorMessage = 'Error loading projets'
    );
  }

  // Sort Ascending by field
sortProjectsAsc(field: string): void {
  this.projetService.getProjectsWithSortingAsc(field).subscribe(
    (data: any) => {
      console.log('API response (ascending):', data); // Log the API response
      if (data && Array.isArray(data.response)) {
        this.projets = data.response; // Access the array from 'response'
      } else {
        this.projets = [];
        console.error('Sorted API response is not an array');
      }
    },
    error => this.errorMessage = 'Error sorting projets (asc)'
  );
}

// Sort Descending by field
sortProjectsDesc(field: string): void {
  this.projetService.getProjectsWithSortingDesc(field).subscribe(
    (data: any) => {
      console.log('API response (descending):', data); // Log the API response
      if (data && Array.isArray(data.response)) {
        this.projets = data.response; // Access the array from 'response'
      } else {
        this.projets = [];
        console.error('Sorted API response is not an array');
      }
    },
    error => this.errorMessage = 'Error sorting projets (desc)'
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

  

  //Sort frontend

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