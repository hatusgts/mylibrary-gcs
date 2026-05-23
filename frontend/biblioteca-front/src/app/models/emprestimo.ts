import { Livro } from './livro';

export interface Emprestimo {
  id?: number;
  livro: Livro;
  nomePessoa: string;
  telefone?: string;
  dataEmprestimo?: string;
  dataDevolucaoPrevista: string;
  dataDevolucaoEfetiva?: string;
}
