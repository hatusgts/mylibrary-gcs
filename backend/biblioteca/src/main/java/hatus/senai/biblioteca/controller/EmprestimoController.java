package hatus.senai.biblioteca.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hatus.senai.biblioteca.entity.Emprestimo;
import hatus.senai.biblioteca.service.EmprestimoService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/emprestimos")
public class EmprestimoController {

    @Autowired
    private EmprestimoService emprestimoService;

    @GetMapping
    public ResponseEntity<List<Emprestimo>> listar() {
        return ResponseEntity.ok(emprestimoService.listar());
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<Emprestimo>> listarAtivos() {
        return ResponseEntity.ok(emprestimoService.listarAtivos());
    }

    @GetMapping("/atrasados")
    public ResponseEntity<List<Emprestimo>> listarAtrasados() {
        return ResponseEntity.ok(emprestimoService.listarAtrasados());
    }

    @PostMapping("/emprestar")
    public ResponseEntity<Emprestimo> emprestar(@RequestBody Map<String, Object> body) {
        Long livroId = ((Number) body.get("livroId")).longValue();
        String nomePessoa = (String) body.get("nomePessoa");
        String telefone = (String) body.get("telefone");
        LocalDate dataDevolucaoPrevista = LocalDate.parse((String) body.get("dataDevolucaoPrevista"));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(emprestimoService.emprestar(livroId, nomePessoa, telefone, dataDevolucaoPrevista));
    }

    @PostMapping("/{id}/devolver")
    public ResponseEntity<Emprestimo> devolver(@PathVariable Long id) {
        return ResponseEntity.ok(emprestimoService.devolver(id));
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<String> handleIllegalState(IllegalStateException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }
}
