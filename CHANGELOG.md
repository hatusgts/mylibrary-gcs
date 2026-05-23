# Changelog

## [1.0.1] - 2026-05-23

### Fixed
- Mensagem de erro ao tentar excluir livro emprestado agora inclui o título do livro (Issue #7)

## [1.0.0] - 2026-05-23

### Added
- RF01: CRUD de Categorias com validação de exclusão (Issues #1)
- RF02: CRUD de Livros com filtros por categoria, status e busca (Issue #2)
- RF03: Sistema de Empréstimos — emprestar e devolver com controle de status (Issue #3)
- Pipeline CI: build do backend (Maven) e frontend (Angular) via GitHub Actions (Issue #4)
- Navbar de navegação entre os módulos

### Technical
- Backend: Spring Boot 4 + Java 21 + H2 in-memory + Spring Data JPA
- Frontend: Angular 21 standalone, zoneless, signals
- 3 entidades: Categoria, Livro, Emprestimo
- Status automático do livro: DISPONIVEL / EMPRESTADO
- Serialização de datas via @JsonFormat (yyyy-MM-dd)

## [0.1.0] - 2026-05-18

### Added
- Configuração inicial do repositório
- Estrutura de pastas backend e frontend
- Branch develop e tag v0.1.0
