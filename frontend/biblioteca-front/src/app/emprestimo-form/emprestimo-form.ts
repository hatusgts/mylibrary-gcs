import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmprestimoService } from '../services/emprestimo.service';
import { LivroService } from '../services/livro.service';
import { Livro } from '../models/livro';

@Component({
  selector: 'app-emprestimo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './emprestimo-form.html',
  styleUrl: './emprestimo-form.css',
})
export class EmprestimoForm implements OnInit {
  form: FormGroup;
  livrosDisponiveis = signal<Livro[]>([]);
  erro = signal('');

  constructor(
    private fb: FormBuilder,
    private emprestimoService: EmprestimoService,
    private livroService: LivroService,
    private router: Router
  ) {
    this.form = this.fb.group({
      livroId: [null, Validators.required],
      nomePessoa: ['', [Validators.required, Validators.maxLength(200)]],
      telefone: [''],
      dataDevolucaoPrevista: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.livroService.listar({ status: 'DISPONIVEL' }).subscribe({
      next: (dados) => this.livrosDisponiveis.set(dados),
    });
  }

  salvar(): void {
    if (this.form.invalid) return;
    this.emprestimoService.emprestar(this.form.value).subscribe({
      next: () => this.router.navigate(['/emprestimos']),
      error: () => this.erro.set('Erro ao registrar empréstimo.'),
    });
  }

  cancelar(): void {
    this.router.navigate(['/emprestimos']);
  }
}
