import { Component, input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css',
})
export class BookItemComponent {
  book = input.required<Book>();
}
