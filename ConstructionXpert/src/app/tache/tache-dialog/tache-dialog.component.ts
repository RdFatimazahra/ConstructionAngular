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
    @Inject(MAT_DIALOG_DATA) public data: { tache: Tache },
    private tacheService: TacheService
  ) {
    this.tache = data.tache;
  }

  save(): void {
    console.log('Saving tache:', this.tache);
    if (this.tache.idTache === 0) {
      // Create new tache
      this.tacheService.createTache(this.tache, 1).subscribe(() => {
        console.log('Tache created successfully');
        this.dialogRef.close(true);
      });
    } else {
      // Update existing tache
      this.tacheService.updateTache(this.tache.idTache, this.tache).subscribe(() => {
        console.log('Tache updated successfully');
        this.dialogRef.close(true);
      });
    }
  }
  
  

  cancel(): void {
    this.dialogRef.close();
  }
}
