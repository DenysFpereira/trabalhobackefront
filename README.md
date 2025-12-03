# 🎓 Prisma Acadêmico - Sistema de Gestão Escolar

> Um sistema Full-Stack completo para gerenciamento de alunos, professores, disciplinas, notas e frequências.

![Status do Projeto](https://img.shields.io/badge/STATUS-CONCLUÍDO-brightgreen)
![Java](https://img.shields.io/badge/Java-21%2B-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)
![Angular](https://img.shields.io/badge/Angular-17-red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)

## 📖 Sobre o Projeto

O **Prisma Acadêmico** é uma aplicação web desenvolvida para facilitar a rotina acadêmica. Ele permite que a secretaria gerencie cadastros, que professores lancem notas e presenças de forma automatizada, e que alunos consultem seus boletins em tempo real.

O diferencial do sistema é sua regra de negócio automática: a situação do aluno (Aprovado/Reprovado) é calculada dinamicamente baseada na média das notas **e** no total de presenças lançadas aula a aula.

## 🚀 Funcionalidades Principais

### 👨‍🏫 Módulo do Professor / Administrativo
* **Portal de Acesso:** Seleção de perfil (Professor ou Aluno).
* **CRUD Completo:**
    * **Alunos:** Cadastro, Edição, Listagem com Busca e Exclusão Lógica (Inativar/Reativar).
    * **Professores:** Gestão completa do corpo docente.
    * **Disciplinas:** Cadastro de matérias vinculadas a professores.
* **Matrícula:** Interface para vincular alunos às disciplinas.
* **Controle de Frequência:** Lançamento de presença por dia/aula com opção de "Marcar Todos".
* **Diário de Classe:**
    * Lançamento de notas bimestrais.
    * **Cálculo Automático:** O sistema soma as faltas do banco de dados e calcula a média final para definir a situação (`APROVADO`, `REPROVADO`, `EM_CURSO`).

### 👨‍🎓 Módulo do Aluno
* **Consulta de Boletim:** Acesso via RA (Registro Acadêmico).
* **Visualização:** Notas, total de faltas atualizado e situação final por disciplina.

### ⚙️ Diferenciais Técnicos (Backend)
* **Backup Automatizado:** Serviço agendado (`@Scheduled`) que realiza backup automático do banco PostgreSQL diariamente.
* **Soft Delete:** Implementação de exclusão lógica (campo `ativo`) para manter histórico de dados.
* **API RESTful:** Arquitetura limpa com Controllers, Services, Repositories e DTOs.

---

## 🛠️ Tecnologias Utilizadas

### Backend
* **Java 21+**
* **Spring Boot 3.2** (Web, Data JPA)
* **PostgreSQL** (Banco de dados)
* **SpringDoc OpenAPI** (Swagger UI para documentação)
* **Lombok** (Produtividade)
* **Maven** (Gerenciamento de dependências)

### Frontend
* **Angular 17+** (Standalone Components)
* **TypeScript**
* **HTML5 & CSS3** (Design responsivo com CSS Variables e tema personalizado "Prisma")
* **Reactive Forms** (Validações robustas)

---



## 📦 Como Rodar o Projeto

### Pré-requisitos
* Java JDK 17 ou superior.
* Node.js (v18+) e Angular CLI.
* PostgreSQL instalado e rodando.

### 1. Configuração do Banco de Dados
Crie um banco de dados no PostgreSQL chamado `escola_db`.

### 2. Rodando o Backend (Spring Boot)
1.  Acesse a pasta `trabalhobackefront`.
2.  Abra o arquivo `src/main/resources/application.properties`.
3.  Configure seu usuário e senha do Postgres:
    ```properties
    spring.datasource.username=seu_usuario
    spring.datasource.password=sua_senha
    ```
4.  Configure o caminho do `pg_dump` para o backup funcionar (opcional para rodar, obrigatório para backup):
    ```properties
    backup.pgdump.path=C:\\Program Files\\PostgreSQL\\16\\bin\\pg_dump.exe
    ```
5.  Execute o projeto via IDE (IntelliJ/Eclipse) ou terminal:
    ```bash
    mvn spring-boot:run
    ```

### 3. Rodando o Frontend (Angular)
1.  Acesse a pasta `escola-front`.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    ng serve
    ```
4.  Acesse `http://localhost:4200` no seu navegador.

---

## 🗂️ Estrutura do Repositório

Este é um **Monorepo** contendo:
* `/trabalhobackefront`: Código fonte do Backend (API).
* `/escola-front`: Código fonte do Frontend (Interface).

---

## 👨‍💻 Autor

Desenvolvido por **Denys Pereira** (RA: 60005023) 
Projeto acadêmico.
