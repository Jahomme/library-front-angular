import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBookOpen, lucideLogIn, lucideSettings } from '@ng-icons/lucide';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIcon],
  providers: [provideIcons({ lucideBookOpen, lucideLogIn, lucideSettings })],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  title = signal('Meus Livros');
  subtitle = signal('Bem-vindo');
  icon = signal('lucideBookOpen');

  showLoginBtn = signal(true);

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
    this.showLoginBtn.set(data['showLoginButton'] !== false);
  }
}
