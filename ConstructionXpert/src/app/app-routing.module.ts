import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageTachesComponent } from './tache/manage-taches/manage-taches.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';



import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ManageProjetsComponent } from './projet/manage-projet/manage-projet.component';
import {ManageRessourcesComponent} from "./ressource/manage-ressources/manage-ressources.component";
import {RessourceDialogComponent} from "./ressource/ressource-dialog/ressource-dialog.component";

const routes: Routes = [

  { path: '', redirectTo: '/taches', pathMatch: 'full' },
  { path: 'taches', component: ManageTachesComponent },
  { path: 'projets', component: ManageProjetsComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent},
  {path:'ressource',component:ManageRessourcesComponent},
  { path: 'new/:idTache', component: RessourceDialogComponent }

];




@NgModule({
  imports: [RouterModule.forRoot(routes),

    MatDialogModule,
    MatButtonModule


  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
