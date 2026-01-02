import { Component, input, output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucidePencil,
  lucideTrash2,
  lucideCalendar,
  lucideGlobe,
} from '@ng-icons/lucide';
import { Autor } from '../models/autores.model';

@Component({
  selector: 'app-autor-item',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIcon, DatePipe],
  providers: [
    provideIcons({ lucidePencil, lucideTrash2, lucideCalendar, lucideGlobe }),
  ],
  templateUrl: './autor-item.component.html',
  styleUrl: './autor-item.component.css',
})
export class AutorItemComponent {
  autor = input.required<Autor>();
  delete = output<string>();
}
