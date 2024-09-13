import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageTachesComponent } from './tache/manage-taches/manage-taches.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';



import { MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button';  
import { ManageProjetsComponent } from './projet/manage-projet/manage-projet.component';
import { LoginComponent } from './auth/login/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: 'full' },
  { path: 'taches', component: ManageTachesComponent },
  { path: 'projets', component: ManageProjetsComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'dashboard', component: AdminDashboardComponent }, // Tableau de bord admin
  { path: "login", component: LoginComponent },
];




@NgModule({
  imports: [RouterModule.forRoot(routes),

    MatDialogModule,
    MatButtonModule
    

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
