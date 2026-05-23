import { Routes } from '@angular/router';
import { CategoriaList } from './categoria-list/categoria-list';
import { CategoriaForm } from './categoria-form/categoria-form';

export const routes: Routes = [
  { path: '', redirectTo: 'categorias', pathMatch: 'full' },
  { path: 'categorias', component: CategoriaList },
  { path: 'categorias/nova', component: CategoriaForm },
];
