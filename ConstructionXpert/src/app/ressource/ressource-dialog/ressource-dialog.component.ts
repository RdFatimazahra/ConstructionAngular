import { Component, OnInit } from '@angular/core';
import { Tache } from "../../models/tache.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RessourceService } from "../../services/ressource.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Ressource } from "../../models/ressource.model";

@Component({
  selector: 'app-ressource-dialog',
  templateUrl: './ressource-dialog.component.html',
  styleUrls: ['./ressource-dialog.component.css']
})
export class RessourceDialogComponent implements OnInit {
  taches: Tache[] = [];
  form!: FormGroup;
  idTache?: number;

  constructor(
    private fb: FormBuilder,
    private ressourceService: RessourceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTaches();

    // Récupère l'ID de la tâche depuis les paramètres de la route
    this.route.paramMap.subscribe(params => {
      this.idTache = +params.get('idTache')!;
      console.log('ID de la tâche récupéré:', this.idTache);
    });

    // Initialisation du formulaire
    this.form = this.fb.group({
      nom: ['', Validators.required],
      type: ['', Validators.required],
      quantite: [null, [Validators.required, Validators.min(1)]],
      fournisseur: ['', Validators.required],
      idTache: [null, Validators.required]
    });
  }

  // Charge toutes les tâches
  loadTaches(): void {
    this.ressourceService.getAllTaches().subscribe(
      (taches: Tache[]) => {
        this.taches = taches;
        console.log('Tâches chargées:', this.taches);
      },
      error => {
        console.error('Erreur lors du chargement des tâches', error);
        alert('Une erreur est survenue lors du chargement des tâches. Veuillez réessayer plus tard.');
      }
    );
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(): void {
    if (this.form.valid) {
      const newRessource: Ressource = this.form.value;
      console.log('Valeurs du formulaire:', newRessource);
      console.log('ID de la tâche depuis le formulaire:', this.form.get('idTache')?.value);
      console.log('ID de la tâche depuis la route:', this.idTache);

      if (this.idTache !== undefined && !isNaN(this.idTache)) {
        this.ressourceService.addRessource(newRessource, this.idTache).subscribe(
          response => {
            console.log('Ressource ajoutée avec succès!', response);
            this.form.reset();
            this.router.navigate(['/ressources']);
          },
          error => {
            console.error('Erreur lors de l\'ajout de la ressource', error);
          }
        );
      } else {
        console.error('L\'ID de la tâche est inconnu ou invalide');
      }
    } else {
      console.log('Le formulaire n\'est pas valide');
    }
  }
}
