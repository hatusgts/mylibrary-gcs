import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LivroService } from '../services/livro.service';
import { CategoriaService } from '../services/categoria.service';
import { Livro } from '../models/livro';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-livro-list',
  imports: [RouterLink],
  templateUrl: './livro-list.html',
  styleUrl: './livro-list.css',
})
export class LivroList implements OnInit {
  livros = signal<Livro[]>([]);
  categorias = signal<Categoria[]>([]);
  erro = signal('');

  filtroCategoriaId = signal('');
  filtroStatus = signal('');
  filtroBusca = signal('');

  constructor(
    private livroService: LivroService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.categoriaService.listar().subscribe({
      next: (dados) => this.categorias.set(dados),
    });
    this.carregar();
  }

  carregar(): void {
    this.livroService.listar({
      categoriaId: this.filtroCategoriaId() ? Number(this.filtroCategoriaId()) : undefined,
      status: this.filtroStatus() || undefined,
      busca: this.filtroBusca() || undefined,
    }).subscribe({
      next: (dados) => { this.livros.set(dados); this.erro.set(''); },
      error: () => this.erro.set('Erro ao carregar livros.'),
    });
  }

  limpar(selectCategoria: HTMLSelectElement, selectStatus: HTMLSelectElement, inputBusca: HTMLInputElement): void {
    this.filtroCategoriaId.set('');
    this.filtroStatus.set('');
    this.filtroBusca.set('');
    selectCategoria.value = '';
    selectStatus.value = '';
    inputBusca.value = '';
    this.carregar();
  }

  deletar(id: number): void {
    if (!confirm('Excluir este livro?')) return;
    this.livroService.deletar(id).subscribe({
      next: () => this.carregar(),
      error: () => this.erro.set('Não é possível excluir: livro está emprestado.'),
    });
  }
}
