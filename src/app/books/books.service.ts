import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Book } from './models/book.model';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Page } from '../shared/models/page.model';
import { CadastroLivroDTO } from './models/book-dto.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);

  private API_URL = `${environment.apiUrl}/livros`;

  selectedGenres = signal<string[]>([]);
  search = signal<string | undefined>(undefined);

  toggleGenre(genre: string) {
    this.selectedGenres.update((currentGenres) => {
      if (currentGenres.includes(genre)) {
        return currentGenres.filter((g) => g !== genre);
      } else {
        return [...currentGenres, genre];
      }
    });
  }

  isSelected(genre: string): boolean {
    return this.selectedGenres().includes(genre);
  }

  listarLivros(page: number = 0, size: number = 10): Observable<Page<Book>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const termoBusca = this.search();
    if (termoBusca) {
      params = params.set('titulo', termoBusca);
    }

    const generos = this.selectedGenres();
    if (generos.length > 0) {
      for (const genero of generos) {
        params = params.append('genero', genero);
      }
    }

    return this.http.get<Page<Book>>(this.API_URL, { params });
  }

  salvar(livro: CadastroLivroDTO): Observable<void> {
    return this.http.post<void>(this.API_URL, livro);
  }
}
