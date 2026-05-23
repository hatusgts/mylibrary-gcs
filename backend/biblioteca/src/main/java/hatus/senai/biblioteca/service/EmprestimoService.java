package hatus.senai.biblioteca.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hatus.senai.biblioteca.entity.Emprestimo;
import hatus.senai.biblioteca.entity.Livro;
import hatus.senai.biblioteca.entity.StatusLivro;
import hatus.senai.biblioteca.repository.EmprestimoRepository;
import hatus.senai.biblioteca.repository.LivroRepository;

@Service
public class EmprestimoService {

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private LivroRepository livroRepository;

    public Emprestimo emprestar(Long livroId, String nomePessoa, String telefone, LocalDate dataDevolucaoPrevista) {
        Livro livro = livroRepository.findById(livroId)
                .orElseThrow(() -> new IllegalArgumentException("Livro não encontrado."));

        if (livro.getStatus() != StatusLivro.DISPONIVEL) {
            throw new IllegalStateException("Livro não está disponível para empréstimo.");
        }

        Emprestimo emprestimo = new Emprestimo();
        emprestimo.setLivro(livro);
        emprestimo.setNomePessoa(nomePessoa);
        emprestimo.setTelefone(telefone);
        emprestimo.setDataEmprestimo(LocalDate.now());
        emprestimo.setDataDevolucaoPrevista(dataDevolucaoPrevista);

        livro.setStatus(StatusLivro.EMPRESTADO);
        livroRepository.save(livro);

        return emprestimoRepository.save(emprestimo);
    }

    public Emprestimo devolver(Long emprestimoId) {
        Emprestimo emprestimo = emprestimoRepository.findById(emprestimoId)
                .orElseThrow(() -> new IllegalArgumentException("Empréstimo não encontrado."));

        if (emprestimo.getDataDevolucaoEfetiva() != null) {
            throw new IllegalStateException("Este livro já foi devolvido.");
        }

        emprestimo.setDataDevolucaoEfetiva(LocalDate.now());

        Livro livro = emprestimo.getLivro();
        livro.setStatus(StatusLivro.DISPONIVEL);
        livroRepository.save(livro);

        return emprestimoRepository.save(emprestimo);
    }

    public List<Emprestimo> listar() {
        return emprestimoRepository.findAll();
    }

    public List<Emprestimo> listarAtivos() {
        return emprestimoRepository.findByDataDevolucaoEfetivaIsNull();
    }

    public List<Emprestimo> listarAtrasados() {
        return emprestimoRepository.findByDataDevolucaoPrevistaBeforeAndDataDevolucaoEfetivaIsNull(LocalDate.now());
    }
}
