import { Component, inject, OnInit, signal } from '@angular/core';
import { BookItemComponent } from './book-item/book-item.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFilter, lucidePlus, lucideSearch } from '@ng-icons/lucide';
import { GeneroLivro } from '../enum/generos';
import { FormsModule } from '@angular/forms';
import { BooksService } from './books.service';
import { GenrePipe } from './genre.pipe';
import { Book } from './models/book.model';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationModalComponent } from '../shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    BookItemComponent,
    NgIcon,
    FormsModule,
    GenrePipe,
    RouterLink,
    ConfirmationModalComponent,
  ],
  providers: [
    provideIcons({
      lucideSearch,
      lucideFilter,
      lucidePlus,
    }),
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit {
  protected booksService = inject(BooksService);

  private router = inject(Router);
  books = signal<Book[]>([]);
  totalBooks = signal<number>(0);
  deleteModalOpen = signal(false);
  itemToDelete = signal<string | null>(null);

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

  onDeleteRequest(id: string) {
    this.itemToDelete.set(id);
    this.deleteModalOpen.set(true);
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

  onConfirmDelete() {
    const id = this.itemToDelete();
    if (id) {
      this.booksService.excluir(id).subscribe({
        next: () => {
          this.atualizarLista();
          this.closeModal();
        },
        error: () => {
          this.closeModal();
        },
      });
    }
  }

  onEdit(book: Book) {
    this.router.navigate(['/book/edit', book.id]);
  }

  closeModal() {
    this.deleteModalOpen.set(false);
    this.itemToDelete.set(null);
  }

  isSelected(genre: string) {
    return this.booksService.isSelected(genre);
  }

  private atualizarLista() {
    this.booksService.listarLivros().subscribe({
      next: (data) => {
        this.books.set(data.content);
      },
    });
  }
}
