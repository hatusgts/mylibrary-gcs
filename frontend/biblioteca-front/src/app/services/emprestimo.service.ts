import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprestimo } from '../models/emprestimo';

export interface EmprestimoRequest {
  livroId: number;
  nomePessoa: string;
  telefone?: string;
  dataDevolucaoPrevista: string;
}

@Injectable({ providedIn: 'root' })
export class EmprestimoService {
  private readonly apiUrl = 'http://localhost:8080/api/emprestimos';

  constructor(private http: HttpClient) {}

  listarAtivos(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.apiUrl}/ativos`);
  }

  emprestar(dados: EmprestimoRequest): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(`${this.apiUrl}/emprestar`, dados);
  }

  devolver(id: number): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(`${this.apiUrl}/${id}/devolver`, {});
  }
}
