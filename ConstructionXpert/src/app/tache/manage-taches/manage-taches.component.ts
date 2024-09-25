import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tache } from '../../models/tache.model';
import { TacheService } from '../../services/tache.service';
import { TacheDialogComponent } from '../../tache/tache-dialog/tache-dialog.component';
import { faTrashAlt, faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ProjetService } from '../../services/projet.service';
import { Page } from '../../models/page.model'; // Import Page model

@Component({
  selector: 'app-manage-taches',
  templateUrl: './manage-taches.component.html',
  styleUrls: ['./manage-taches.component.css']
})
export class ManageTachesComponent {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faInfoCircle = faInfoCircle;

  taches: Tache[] = [];
  errorMessage: string | null = null;

  // Pagination properties
  currentPage: number = 0;
  pageSize: number = 5; // You can change this to your desired page size
  totalPages: number = 0;

  searchQuery: string = '';
  selectedStatus: string = '';
  filteredTaches: Tache[] = [];

  statusOptions = [
    { value: 'à faire', label: 'À faire' },
    { value: 'en cours', label: 'En cours' },
    { value: 'terminé', label: 'Terminé' }
  ];

  projects: { [key: number]: string } = {};

  @Output() viewDetailsEvent = new EventEmitter<Tache>();

  constructor(private tacheService: TacheService, private dialog: MatDialog, private projetService: ProjetService) { }

  ngOnInit(): void {
    this.loadPaginatedTaches();
  }

  loadPaginatedTaches(): void {
    this.tacheService.getPaginatedTaches(this.currentPage, this.pageSize).subscribe(
      (data: Page<Tache>) => {
        console.log('Received paginated taches:', data);
        this.taches = data.content; 
        this.totalPages = data.totalPages; 
        this.filteredTaches = [...this.taches]; 
        this.loadProjects();
      },
      error => this.errorMessage = 'Error loading taches'
    );
  }
  

  loadProjects(): void {
    const projectIds = [...new Set(this.taches.map(tache => tache.idProjet).filter(id => id !== undefined))];

    console.log('Project IDs:', projectIds); // Debugging line

    projectIds.forEach(id => {
      this.projetService.getProjectById(id).subscribe(
        (project) => {
          this.projects[id] = project.nomProjet;
          console.log('Project fetched:', id, project.nomProjet); // Debugging line
        },
        error => this.errorMessage = 'Error loading projects'
      );
    });
  }

  openDialog(tache: Tache | null = null): void {
    const dialogRef = this.dialog.open(TacheDialogComponent, {
      width: '400px',
      data: { tache: tache || { idTache: 0, description: '', statut: 'Pending', dateDebut: new Date(), dateFin: new Date() } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPaginatedTaches(); // Reload paginated tasks after dialog closes
      }
    });
  }
  
  deleteTache(id: number): void {
    if (confirm('Are you sure you want to delete this tache?')) {
      this.tacheService.deleteTache(id).subscribe(
        () => this.loadPaginatedTaches(),
        error => this.errorMessage = 'Error deleting tache'
      );
    }
  }

  viewDetails(id: number): void {
    this.tacheService.getTacheById(id).subscribe(
      (tache: Tache) => this.viewDetailsEvent.emit(tache),
      error => this.errorMessage = 'Error fetching tache details'
    );
  }

  applyFilters(): void {
    this.filteredTaches = this.taches.filter(tache => {
      const matchesSearchQuery = this.searchQuery
        ? tache.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          (this.projects[tache.idProjet] || '').toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;
      
      const matchesStatus = this.selectedStatus
        ? tache.statut === this.selectedStatus
        : true;
      
      return matchesSearchQuery && matchesStatus;
    });
    console.log('Filtered Taches:', this.filteredTaches); // Debugging line
  }

  // Pagination control methods
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadPaginatedTaches();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPaginatedTaches();
    }
  }

  
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadPaginatedTaches();
    }
  }

}





// import { Component, EventEmitter, Output } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Tache } from '../../models/tache.model';
// import { TacheService } from '../../services/tache.service';
// import { TacheDialogComponent } from '../../tache/tache-dialog/tache-dialog.component';
// import { faTrashAlt, faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import { ProjetService } from '../../services/projet.service'; 

// @Component({
//   selector: 'app-manage-taches',
//   templateUrl: './manage-taches.component.html',
//   styleUrls: ['./manage-taches.component.css']
// })
// export class ManageTachesComponent {
//   faEdit = faEdit;
//   faTrashAlt = faTrashAlt;
//   faInfoCircle = faInfoCircle;

//   taches: Tache[] = [];
//   errorMessage: string | null = null;

//   searchQuery: string = '';
//   selectedStatus: string = '';
//   filteredTaches: Tache[] = [];

//   statusOptions = [
//     { value: 'à faire', label: 'À faire' },
//     { value: 'en cours', label: 'En cours' },
//     { value: 'terminé', label: 'Terminé' }
//   ];

//   projects: { [key: number]: string } = {};

//   @Output() viewDetailsEvent = new EventEmitter<Tache>();

//   constructor(private tacheService: TacheService, private dialog: MatDialog, private projetService: ProjetService) { }

//   ngOnInit(): void {
//     this.loadTaches();
//   }

//   loadTaches(): void {
//     this.tacheService.getAllTaches().subscribe(
//       (data: Tache[]) => {
//         this.taches = data;
//         this.filteredTaches = [...this.taches]; // Initialize filteredTaches
//         this.loadProjects();
//       },
//       error => this.errorMessage = 'Error loading taches'
//     );
//   }

//   loadProjects(): void {
//     const projectIds = [...new Set(this.taches.map(tache => tache.idProjet).filter(id => id !== undefined))];

//     console.log('Project IDs:', projectIds); // Debugging line

//     projectIds.forEach(id => {
//       this.projetService.getProjectById(id).subscribe(
//         (project) => {
//           this.projects[id] = project.nomProjet;
//           console.log('Project fetched:', id, project.nomProjet); // Debugging line
//         },
//         error => this.errorMessage = 'Error loading projects'
//       );
//     });
//   }

//   openDialog(tache: Tache | null = null): void {
//     const dialogRef = this.dialog.open(TacheDialogComponent, {
//       width: '400px',
//       data: { tache: tache || { idTache: 0, description: '', statut: 'Pending', dateDebut: new Date(), dateFin: new Date() } }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.loadTaches();
//       }
//     });
//   }
  
//   deleteTache(id: number): void {
//     if (confirm('Are you sure you want to delete this tache?')) {
//       this.tacheService.deleteTache(id).subscribe(
//         () => this.loadTaches(),
//         error => this.errorMessage = 'Error deleting tache'
//       );
//     }
//   }

//   viewDetails(id: number): void {
//     this.tacheService.getTacheById(id).subscribe(
//       (tache: Tache) => this.viewDetailsEvent.emit(tache),
//       error => this.errorMessage = 'Error fetching tache details'
//     );
//   }

//   applyFilters(): void {
//     this.filteredTaches = this.taches.filter(tache => {
//       const matchesSearchQuery = this.searchQuery
//         ? tache.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
//           (this.projects[tache.idProjet] || '').toLowerCase().includes(this.searchQuery.toLowerCase())
//         : true;
      
//       const matchesStatus = this.selectedStatus
//         ? tache.statut === this.selectedStatus
//         : true;
      
//       return matchesSearchQuery && matchesStatus;
//     });
//     console.log('Filtered Taches:', this.filteredTaches); // Debugging line
//   }
// }
