import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-categoria-list',
  imports: [RouterLink],
  templateUrl: './categoria-list.html',
  styleUrl: './categoria-list.css',
})
export class CategoriaList implements OnInit {
  categorias = signal<Categoria[]>([]);
  erro = signal('');

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.categoriaService.listar().subscribe({
      next: (dados) => this.categorias.set(dados),
      error: () => this.erro.set('Erro ao carregar categorias.'),
    });
  }

  deletar(id: number): void {
    if (!confirm('Excluir esta categoria?')) return;
    this.categoriaService.deletar(id).subscribe({
      next: () => this.carregar(),
      error: () => this.erro.set('Não é possível excluir: categoria possui livros vinculados.'),
    });
  }
}
