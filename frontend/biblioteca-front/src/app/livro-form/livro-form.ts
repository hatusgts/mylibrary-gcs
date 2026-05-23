import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LivroService } from '../services/livro.service';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-livro-form',
  imports: [ReactiveFormsModule],
  templateUrl: './livro-form.html',
  styleUrl: './livro-form.css',
})
export class LivroForm implements OnInit {
  form: FormGroup;
  categorias = signal<Categoria[]>([]);
  erro = signal('');

  constructor(
    private fb: FormBuilder,
    private livroService: LivroService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(200)]],
      autor: ['', [Validators.required, Validators.maxLength(200)]],
      isbn: [''],
      ano: [null],
      categoriaId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoriaService.listar().subscribe({
      next: (dados) => this.categorias.set(dados),
    });
  }

  salvar(): void {
    if (this.form.invalid) return;
    this.livroService.criar(this.form.value).subscribe({
      next: () => this.router.navigate(['/livros']),
      error: () => this.erro.set('Erro ao salvar livro.'),
    });
  }

  cancelar(): void {
    this.router.navigate(['/livros']);
  }
}
