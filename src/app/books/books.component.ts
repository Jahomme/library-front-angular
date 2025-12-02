import { Component } from '@angular/core';
import { MOCK_BOOKS } from '../../mock/books';
import { BookItemComponent } from "./book-item/book-item.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFilter, lucideSearch } from '@ng-icons/lucide';
import { GeneroLivro } from '../enum/generos';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [BookItemComponent, NgIcon],
  providers: [provideIcons({ lucideSearch, lucideFilter })],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  books = MOCK_BOOKS;
  genres = Object.keys(GeneroLivro).filter((k) => Number.isNaN(+k)) as Array<
    keyof typeof GeneroLivro
  >;
}
