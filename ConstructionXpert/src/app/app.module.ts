import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageTachesComponent } from './tache/manage-taches/manage-taches.component';
import { ManageRessourcesComponent } from './ressource/manage-ressources/manage-ressources.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TacheDialogComponent } from './tache/tache-dialog/tache-dialog.component';
import { ProjetDialogComponent } from './projet/projet-dialog/projet-dialog.component';
import { RessourceDialogComponent } from './ressource/ressource-dialog/ressource-dialog.component';



import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ManageProjetsComponent } from './projet/manage-projet/manage-projet.component';
import { ProjectDetailsComponent } from './projet/project-details/project-details.component';
import { TacheDetailsComponent } from './tache/tache-details/tache-details.component';
import { LoginComponent } from './auth/login/login/login.component';
import { AuthInterceptor } from './interceptors/interceptor';
import { RegisterComponent } from './auth/register/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageProjetsComponent,
    ManageTachesComponent,
    ManageRessourcesComponent,
    AdminDashboardComponent,
    HomePageComponent,
    TacheDialogComponent,
    ProjetDialogComponent,
    RessourceDialogComponent,
    ProjectDetailsComponent,
    TacheDetailsComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,


    // Angular Material
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule,

  
    
  ],


  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
   
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }
