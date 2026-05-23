package hatus.senai.biblioteca.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hatus.senai.biblioteca.entity.Emprestimo;

@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {

    List<Emprestimo> findByDataDevolucaoEfetivaIsNull();

    List<Emprestimo> findByDataDevolucaoPrevistaBeforeAndDataDevolucaoEfetivaIsNull(LocalDate data);
}
