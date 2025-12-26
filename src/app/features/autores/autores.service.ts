import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from './models/autores.model';
import { environment } from '../../../environments/environment.development';

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
}
