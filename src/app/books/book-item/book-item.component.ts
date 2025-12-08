import { Component, Input } from '@angular/core';
import { Book } from './book.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css',
})
export class BookItemComponent {
  @Input({ required: true }) book!: Book;
}
