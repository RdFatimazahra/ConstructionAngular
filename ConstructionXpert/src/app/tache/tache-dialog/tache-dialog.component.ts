import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tache } from 'src/app/models/tache.model';
import { TacheService } from 'src/app/services/tache.service';

@Component({
  selector: 'app-tache-dialog',
  templateUrl: './tache-dialog.component.html',
  styleUrls: ['./tache-dialog.component.css']
})
export class TacheDialogComponent {
  tache: Tache;

  constructor(
    public dialogRef: MatDialogRef<TacheDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tache: Tache, projetId: number },
    private tacheService: TacheService
  ) {
    this.tache = data.tache;
  }

  save(): void {
    if (this.tache.idTache === 0) {
      // Create new tache
      this.tache.idProjet = this.data.projetId; // Set project ID
      this.tacheService.createTache(this.tache, this.data.projetId).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      // Update existing tache
      this.tacheService.updateTache(this.tache.idTache, this.tache).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
