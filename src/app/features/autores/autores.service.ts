import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from './models/autores.model';
import { environment } from '../../../environments/environment.development';
import { CadastroAutorDTO } from './models/autor-dto.model';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  private http = inject(HttpClient);
  private API_URL = `${environment.apiUrl}/autores`;

  listarAutores(page: number = 0, size: number = 10): Observable<Autor[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Autor[]>(this.API_URL, { params });
  }

  salvar(dto: CadastroAutorDTO): Observable<void> {
    return this.http.post<void>(this.API_URL, dto);
  }

  atualizar(dto: CadastroAutorDTO): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${dto.id}`, dto);
  }

  getById(id: string): Observable<Autor> {
    return this.http.get<Autor>(`${this.API_URL}/${id}`);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
