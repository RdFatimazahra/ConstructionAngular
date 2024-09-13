import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faTachometerAlt, faProjectDiagram, faTasks, faSignOutAlt , faTools } from '@fortawesome/free-solid-svg-icons';
import { ProjetService } from '../../services/projet.service';
import { TacheService } from '../../services/tache.service';  // Assuming you have this service

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  faTachometerAlt = faTachometerAlt;
  faProjectDiagram = faProjectDiagram;
  faTasks = faTasks;
  faSignOutAlt = faSignOutAlt;
  

  
  isMobileMenuOpen = false;

  // Dashboard Sections
  currentSection: string = 'dashboard';
  menuItems = [
    { section: 'dashboard', label: 'Dashboard', icon: faTachometerAlt },
    { section: 'projects', label: 'Projects', icon: faProjectDiagram },
    { section: 'taches', label: 'Tasks', icon: faTasks },
    { label: 'Resources', section: 'resources', icon: faTools },
    
  ];

  // Dashboard Cards (summary data)
  dashboardCards = [
    { title: 'Total Projects', value: '10', link: 'projects', linkText: 'Manage Projects', icon: faProjectDiagram },
    { title: 'Total Tasks', value: '80', link: 'taches', linkText: 'Manage Tasks', icon: faTasks },
    { title: 'Total Ressources', value: '30', link: 'taches', linkText: 'Manage Ressources', icon: faTools }
  ];

  constructor(
    private router: Router,
    private ProjetService: ProjetService,
    private tacheService: TacheService
  ) {}

  ngOnInit(): void {
    // this.loadProjectCount();
    // this.loadTacheCount();
  }

  // logout(): void {
  //   // Assuming you have an authService to handle logout
  //   this.authService.logout();
  //   this.router.navigate(['/login']);
  // }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  loadContent(section: string) {
    this.currentSection = section;
    if (this.isMobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  // loadProjectCount(): void {
  //   this.projetService.getProjectCount().subscribe(
  //     (count: number) => this.dashboardCards[0].value = count.toString(),
  //     error => console.error('Error fetching project count', error)
  //   );
  // }

  // loadTacheCount(): void {
  //   this.tacheService.getTacheCount().subscribe(
  //     (count: number) => this.dashboardCards[1].value = count.toString(),
  //     error => console.error('Error fetching task count', error)
  //   );
  // }
}
