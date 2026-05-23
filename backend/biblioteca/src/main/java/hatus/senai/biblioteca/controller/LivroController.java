package hatus.senai.biblioteca.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hatus.senai.biblioteca.entity.Livro;
import hatus.senai.biblioteca.service.LivroService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/livros")
public class LivroController {

    @Autowired
    private LivroService livroService;

    @GetMapping
    public ResponseEntity<List<Livro>> listar(
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String busca) {
        return ResponseEntity.ok(livroService.listar(categoriaId, status, busca));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> buscarPorId(@PathVariable Long id) {
        Optional<Livro> livro = livroService.buscarPorId(id);
        return livro.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Livro> criar(@RequestBody Map<String, Object> body) {
        Livro livro = new Livro();
        livro.setTitulo((String) body.get("titulo"));
        livro.setAutor((String) body.get("autor"));
        livro.setIsbn((String) body.get("isbn"));
        if (body.get("ano") != null) {
            livro.setAno(((Number) body.get("ano")).intValue());
        }
        Long categoriaId = ((Number) body.get("categoriaId")).longValue();
        return ResponseEntity.status(HttpStatus.CREATED).body(livroService.criar(categoriaId, livro));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        boolean deletado = livroService.deletar(id);
        if (deletado) return ResponseEntity.noContent().build();
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<String> handleIllegalState(IllegalStateException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }
}
