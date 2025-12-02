import { Component } from '@angular/core';
import { MOCK_BOOKS } from '../../mock/books';
import { BookItemComponent } from "./book-item/book-item.component";

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [BookItemComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  books = MOCK_BOOKS;
}
