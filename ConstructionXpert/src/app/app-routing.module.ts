import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageTachesComponent } from './tache/manage-taches/manage-taches.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HomePageComponent } from './pages/home-page/home-page.component';


import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ManageProjetsComponent } from './projet/manage-projet/manage-projet.component';

import {ManageRessourcesComponent} from "./ressource/manage-ressources/manage-ressources.component";
import {RessourceDialogComponent} from "./ressource/ressource-dialog/ressource-dialog.component";

import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register/register.component';

    
const routes: Routes = [
  { path: '', redirectTo: "/home", pathMatch: 'full' },

  { path: 'taches', component: ManageTachesComponent },

  { path: 'projets', component: ManageProjetsComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent},

  { path: 'home', component: HomePageComponent},

  {path:'ressource',component:ManageRessourcesComponent},
  { path: 'new/:idTache', component: RessourceDialogComponent },

  { path: 'dashboard', component: AdminDashboardComponent }, // Tableau de bord admin
  { path: "login", component: LoginComponent },
  { path: 'register', component: RegisterComponent},


];




@NgModule({
  imports: [RouterModule.forRoot(routes),

    MatDialogModule,
    MatButtonModule


  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
