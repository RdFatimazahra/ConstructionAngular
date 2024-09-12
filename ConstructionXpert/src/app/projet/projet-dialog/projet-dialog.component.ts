import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Projet } from 'src/app/models/projet.model';  // Import du modèle Projet
import { ProjetService } from 'src/app/services/projet.service';  // Import du service Projet

@Component({
  selector: 'app-projet-dialog',
  templateUrl: './projet-dialog.component.html',
  styleUrls: ['./projet-dialog.component.css']
})
export class ProjetDialogComponent {
cancel(): void { 
  this.dialogRef.close();
}
  projet: Projet;

  constructor(
    public dialogRef: MatDialogRef<ProjetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { projet: Projet },
    private projetService: ProjetService  // Utilisation du service Projet
  ) {
    this.projet = data.projet;
  }

  save(): void {
    if (this.projet.idProjet === undefined || this.projet.idProjet === 0) {
      // Create a new project
      this.projetService.createProjet(this.projet).subscribe(() => this.dialogRef.close(true));
    } else {
      // Update the existing project
      this.projetService.updateProject(this.projet.idProjet!, this.projet)  // Using the non-null assertion operator (!)
        .subscribe(() => this.dialogRef.close(true));
    }
  }
  
}
