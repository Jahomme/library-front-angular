import { Component, inject } from '@angular/core';
import { MOCK_BOOKS } from '../../mock/books';
import { BookItemComponent } from './book-item/book-item.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFilter, lucideSearch } from '@ng-icons/lucide';
import { GeneroLivro } from '../enum/generos';
import { FormsModule } from '@angular/forms';
import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [BookItemComponent, NgIcon, FormsModule],
  providers: [provideIcons({ lucideSearch, lucideFilter })],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  protected booksService = inject(BooksService);

  books = MOCK_BOOKS;

  genres = Object.keys(GeneroLivro).filter((k) => Number.isNaN(+k)) as Array<
    keyof typeof GeneroLivro
  >;

  search = this.booksService.search;

  onSubmitBySearch() {
    this.booksService.findAllBooksByName();
  }

  onSubmitByGenre() {
    this.booksService.findAllBooksByGenre();
  }

  isSelected(genre: string) {
    return this.booksService.isSelected(genre);
  }
}
