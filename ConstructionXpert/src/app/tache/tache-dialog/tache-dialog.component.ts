import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tache } from 'src/app/models/tache.model';
import { TacheService } from 'src/app/services/tache.service';
import { ProjetService } from '../../services/projet.service';
import { Projet } from 'src/app/models/projet.model';

@Component({
  selector: 'app-tache-dialog',
  templateUrl: './tache-dialog.component.html',
  styleUrls: ['./tache-dialog.component.css']
})
export class TacheDialogComponent implements OnInit {
  tache: Tache;
  projets: Projet[] = []; // To hold the list of projects
  statuses: { value: string, label: string }[] = [
    { value: 'à faire', label: 'À faire' },
    { value: 'en cours', label: 'En cours' },
    { value: 'terminé', label: 'Terminé' },
    // Add more statuses if needed
  ];

  constructor(
    public dialogRef: MatDialogRef<TacheDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tache: Tache, projetId: number },
    private tacheService: TacheService,
    private projetService: ProjetService
  ) {
    this.tache = data.tache;
  }

  ngOnInit(): void {
    this.projetService.getAllProject().subscribe(
      (projects: Projet[]) => this.projets = projects,
      error => console.error('Error loading projects')
    );
  }

  save(): void {
    if (this.tache.idTache === 0) {
      // Create new tache
      console.log('Creating tache with projetId:', this.tache.idProjet); // Debugging statement
      this.tacheService.createTache(this.tache, this.tache.idProjet!).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      // Update existing tache
      console.log('Updating tache with id:', this.tache.idTache); // Debugging statement
      this.tacheService.updateTache(this.tache.idTache, this.tache).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
