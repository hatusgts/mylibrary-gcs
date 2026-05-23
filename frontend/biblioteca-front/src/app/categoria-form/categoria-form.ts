import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-categoria-form',
  imports: [ReactiveFormsModule],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css',
})
export class CategoriaForm {
  form: FormGroup;
  erro = signal('');

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      descricao: ['', Validators.maxLength(500)],
    });
  }

  salvar(): void {
    if (this.form.invalid) return;
    this.categoriaService.criar(this.form.value).subscribe({
      next: () => this.router.navigate(['/categorias']),
      error: () => this.erro.set('Erro ao salvar. Verifique se o nome já existe.'),
    });
  }

  cancelar(): void {
    this.router.navigate(['/categorias']);
  }
}
