import { Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Book } from '../models/book.model';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { lucidePencil, lucideTrash2 } from '@ng-icons/lucide';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, NgIcon],
  providers: [
    provideIcons({
      lucidePencil,
      lucideTrash2,
    }),
  ],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css',
})
export class BookItemComponent {
  book = input.required<Book>();

  edit = output<Book>();
  delete = output<string>();
}
