import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBookOpen, lucideLogIn, lucideSettings } from '@ng-icons/lucide';
import { filter } from 'rxjs';
import { AuthService } from '../core/auth/auth.service';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIcon],
  providers: [provideIcons({ lucideBookOpen, lucideLogIn, lucideSettings })],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  title = signal('Meus Livros');
  subtitle = signal('Bem-vindo');
  icon = signal('lucideBookOpen');

  currentUser = this.authService.currentUser;
  isAuthenticated = this.authService.isAuthenticated;

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateHeaderData();
      });
  }

  private updateHeaderData() {
    let currentRoute = this.route;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    const data = currentRoute.snapshot.data;

    this.title.set(data['title'] || 'App Livraria');
    this.subtitle.set(data['subtitle'] || '');
    this.icon.set(data['icon'] || 'lucideBookOpen');
  }

  async login() {
    this.authService.login();
  }

  async logout() {
    this.authService.logout();
  }
}
