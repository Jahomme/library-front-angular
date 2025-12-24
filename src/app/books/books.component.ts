import { Component, inject, OnInit, signal } from '@angular/core';
import { BookItemComponent } from './book-item/book-item.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFilter, lucideSearch } from '@ng-icons/lucide';
import { GeneroLivro } from '../enum/generos';
import { FormsModule } from '@angular/forms';
import { BooksService } from './books.service';
import { GenrePipe } from './genre.pipe';
import { Book } from './models/book.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [BookItemComponent, NgIcon, FormsModule, GenrePipe],
  providers: [provideIcons({ lucideSearch, lucideFilter })],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit {
  protected booksService = inject(BooksService);

  books = signal<Book[]>([]);
  totalBooks = signal<number>(0);

  genres: string[] = Object.keys(GeneroLivro).filter((k) => Number.isNaN(+k));

  search = this.booksService.search;

  ngOnInit(): void {
    this.booksService.listarLivros().subscribe({
      next: (data) => {
        this.books.set(data.content);
        this.totalBooks.set(data.totalElements);
      },
      error: (erro) => {
        console.error('Erro ao buscar livros:', erro);
      },
    });
  }

  onSubmitBySearch() {
    this.booksService.listarLivros().subscribe({
      next: (data) => {
        this.books.set(data.content);
        this.totalBooks.set(data.totalElements);
      },
      error: (erro) => {
        console.error('Erro ao buscar livros:', erro);
      },
    });
  }

  onSubmitByGenre() {
    this.booksService.listarLivros().subscribe({
      next: (data) => {
        this.books.set(data.content);
        this.totalBooks.set(data.totalElements);
      },
      error: (erro) => {
        console.error('Erro ao buscar livros:', erro);
      },
    });
  }

  isSelected(genre: string) {
    return this.booksService.isSelected(genre);
  }
}
