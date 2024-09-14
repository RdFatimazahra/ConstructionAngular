import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Projet } from '../../models/projet.model';

@Component({
  selector: 'app-project-details',
  template: `
    <div *ngIf="project" class="bg-white p-6 rounded-lg shadow-md border">
      <h2 class="text-2xl font-semibold mb-4">{{ project.nomProjet }}</h2>
      <p><strong>Description:</strong> {{ project.description }}</p>
      <p><strong>Date Début:</strong> {{ project.dateDebut | date: 'mediumDate' }}</p>
      <p><strong>Date Fin:</strong> {{ project.dateFin | date: 'mediumDate' }}</p>
      <p><strong>Budget:</strong> {{ project.budget }}</p>
      <!-- Add other details here -->
    </div>
  `,
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {
  @Input() project: Projet | null = null;
}

