import { Routes } from '@angular/router';
import { CategoriaList } from './categoria-list/categoria-list';
import { CategoriaForm } from './categoria-form/categoria-form';
import { LivroList } from './livro-list/livro-list';
import { LivroForm } from './livro-form/livro-form';

export const routes: Routes = [
  { path: '', redirectTo: 'categorias', pathMatch: 'full' },
  { path: 'categorias', component: CategoriaList },
  { path: 'categorias/nova', component: CategoriaForm },
  { path: 'livros', component: LivroList },
  { path: 'livros/novo', component: LivroForm },
];
