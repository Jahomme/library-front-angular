import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBookOpen } from '@ng-icons/lucide';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIcon],
  providers: [provideIcons({ lucideBookOpen })],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
