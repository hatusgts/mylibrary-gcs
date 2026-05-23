package hatus.senai.biblioteca.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hatus.senai.biblioteca.entity.Categoria;
import hatus.senai.biblioteca.entity.Livro;
import hatus.senai.biblioteca.entity.StatusLivro;
import hatus.senai.biblioteca.repository.CategoriaRepository;
import hatus.senai.biblioteca.repository.LivroRepository;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Livro> listar(Long categoriaId, String status, String busca) {
        if (busca != null && !busca.isBlank()) {
            return livroRepository.findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCase(busca, busca);
        }
        if (categoriaId != null && status != null && !status.isBlank()) {
            return livroRepository.findByCategoriaIdAndStatus(categoriaId, StatusLivro.valueOf(status));
        }
        if (categoriaId != null) {
            return livroRepository.findByCategoriaId(categoriaId);
        }
        if (status != null && !status.isBlank()) {
            return livroRepository.findByStatus(StatusLivro.valueOf(status));
        }
        return livroRepository.findAll();
    }

    public Optional<Livro> buscarPorId(Long id) {
        return livroRepository.findById(id);
    }

    public Livro criar(Long categoriaId, Livro livro) {
        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada."));
        livro.setCategoria(categoria);
        livro.setStatus(StatusLivro.DISPONIVEL);
        return livroRepository.save(livro);
    }

    public boolean deletar(Long id) {
        Optional<Livro> livro = livroRepository.findById(id);
        if (livro.isEmpty()) return false;
        if (livro.get().getStatus() == StatusLivro.EMPRESTADO) {
            throw new IllegalStateException("Não é possível excluir livro emprestado.");
        }
        livroRepository.deleteById(id);
        return true;
    }
}
