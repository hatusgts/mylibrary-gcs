import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro';

export interface LivroFiltros {
  categoriaId?: number;
  status?: string;
  busca?: string;
}

@Injectable({ providedIn: 'root' })
export class LivroService {
  private readonly apiUrl = 'http://localhost:8080/api/livros';

  constructor(private http: HttpClient) {}

  listar(filtros?: LivroFiltros): Observable<Livro[]> {
    let params = new HttpParams();
    if (filtros?.categoriaId) params = params.set('categoriaId', filtros.categoriaId);
    if (filtros?.status) params = params.set('status', filtros.status);
    if (filtros?.busca) params = params.set('busca', filtros.busca);
    return this.http.get<Livro[]>(this.apiUrl, { params });
  }

  buscarPorId(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/${id}`);
  }

  criar(dados: { titulo: string; autor: string; isbn?: string; ano?: number; categoriaId: number }): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, dados);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
