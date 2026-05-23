import { Categoria } from './categoria';

export interface Livro {
  id?: number;
  titulo: string;
  autor: string;
  isbn?: string;
  ano?: number;
  status?: 'DISPONIVEL' | 'EMPRESTADO';
  categoria: Categoria;
}
