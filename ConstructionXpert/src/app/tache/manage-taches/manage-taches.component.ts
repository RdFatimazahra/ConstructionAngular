import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tache } from '../../models/tache.model';
import { TacheService } from '../../services/tache.service';
import { TacheDialogComponent } from '../../tache/tache-dialog/tache-dialog.component';


@Component({
  selector: 'app-manage-taches',
  templateUrl: './manage-taches.component.html',
  styleUrls: ['./manage-taches.component.css']
})
export class ManageTachesComponent {
  taches: Tache[] = [];
  errorMessage: string | null = null;

  constructor(private tacheService: TacheService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTaches();
  }

  loadTaches(): void {
    this.tacheService.getAllTaches().subscribe(
      (data: Tache[]) => this.taches = data,
      error => this.errorMessage = 'Error loading taches'
    );
  }

  openDialog(tache: Tache | null = null): void {
    const dialogRef = this.dialog.open(TacheDialogComponent, {
      width: '400px',
      data: { tache: tache || { id: 0, description: '', status: '', date: new Date() } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTaches();
      }
    });
  }

  deleteTache(id: number): void {
    if (confirm('Are you sure you want to delete this tache?')) {
      this.tacheService.deleteTache(id).subscribe(
        () => this.loadTaches(),
        error => this.errorMessage = 'Error deleting tache'
      );
    }
  }
}