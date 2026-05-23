import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmprestimoService } from '../services/emprestimo.service';
import { Emprestimo } from '../models/emprestimo';

@Component({
  selector: 'app-emprestimo-list',
  imports: [RouterLink],
  templateUrl: './emprestimo-list.html',
  styleUrl: './emprestimo-list.css',
})
export class EmprestimoList implements OnInit {
  emprestimos = signal<Emprestimo[]>([]);
  erro = signal('');
  sucesso = signal('');

  constructor(private emprestimoService: EmprestimoService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.emprestimoService.listarAtivos().subscribe({
      next: (dados) => { this.emprestimos.set(dados); this.erro.set(''); },
      error: () => this.erro.set('Erro ao carregar empréstimos.'),
    });
  }

  devolver(id: number): void {
    if (!confirm('Confirmar devolução?')) return;
    this.emprestimoService.devolver(id).subscribe({
      next: () => {
        this.sucesso.set('Devolução registrada com sucesso.');
        this.carregar();
      },
      error: () => this.erro.set('Erro ao registrar devolução.'),
    });
  }

  estaAtrasado(dataPrevista: string): boolean {
    return new Date(dataPrevista) < new Date(new Date().toDateString());
  }
}
