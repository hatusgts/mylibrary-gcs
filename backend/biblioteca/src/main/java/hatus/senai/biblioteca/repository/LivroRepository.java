package hatus.senai.biblioteca.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hatus.senai.biblioteca.entity.Livro;
import hatus.senai.biblioteca.entity.StatusLivro;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {

    List<Livro> findByCategoriaId(Long categoriaId);

    List<Livro> findByStatus(StatusLivro status);

    List<Livro> findByCategoriaIdAndStatus(Long categoriaId, StatusLivro status);

    List<Livro> findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCase(String titulo, String autor);
}
