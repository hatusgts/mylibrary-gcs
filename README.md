# MyLibrary GCS

Sistema fullstack de gerenciamento de biblioteca pessoal, desenvolvido como atividade de Construção de Software e Gerência de Configuração de Software

---

# Funcionalidades

- CRUD de categorias de livros
- CRUD de livros vinculados a categorias
- Controle de status automático: DISPONIVEL / EMPRESTADO
- Registro de empréstimos e devoluções

---

# Tecnologias

- Backend: Java 21, Spring Boot 4, Spring Data JPA, H2
- Frontend: Angular 21

---

# Como executar

Backend:
bash
cd backend/biblioteca
./mvnw spring-boot:run


Frontend:
bash
cd frontend/biblioteca-front
npm install
npm start


Backend disponível em http://localhost:8080  
Frontend disponível em http://localhost:4200

---

# Pre requisitos

- Java 21+
- Node.js 20+
