import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageTachesComponent } from './tache/manage-taches/manage-taches.component';
import { ManageProjetComponent } from './projet/manage-projet/manage-projet.component';
import { ManageRessourcesComponent } from './ressource/manage-ressources/manage-ressources.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TacheDialogComponent } from './tache/tache-dialog/tache-dialog.component';
import { ProjetDialogComponent } from './projet/projet-dialog/projet-dialog.component';
import { RessourceDialogComponent } from './ressource/ressource-dialog/ressource-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageTachesComponent,
    ManageProjetComponent,
    ManageRessourcesComponent,
    AdminDashboardComponent,
    HomePageComponent,
    TacheDialogComponent,
    ProjetDialogComponent,
    RessourceDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
