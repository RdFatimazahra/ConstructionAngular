import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageTachesComponent } from './tache/manage-taches/manage-taches.component';



import { MatDialogModule } from '@angular/material/dialog';  // Import MatDialogModule
import { MatButtonModule } from '@angular/material/button';  

const routes: Routes = [

  { path: '', redirectTo: '/taches', pathMatch: 'full' },
  { path: 'taches', component: ManageTachesComponent },

];




@NgModule({
  imports: [RouterModule.forRoot(routes),

    MatDialogModule,
    MatButtonModule
    

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
