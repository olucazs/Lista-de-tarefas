# 📝 Lista de Tarefas

Aplicação full stack para gerenciar tarefas: criar, editar, excluir e alterar o status, com dados salvos em MySQL.


## 🚀 Tecnologias

- **Front-end:** HTML, CSS e JavaScript
- **Back-end:** Node.js, Express e MySQL

## 🔌 Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/tasks` | Lista as tarefas |
| POST | `/tasks` | Cria uma tarefa |
| PUT | `/tasks/:id` | Atualiza título e status |
| DELETE | `/tasks/:id` | Remove uma tarefa |

## ⚙️ Como rodar

1. Clone o repositório e entre na pasta `backend`:
   ```bash
   git clone https://github.com/olucazs/NOME-DO-REPOSITORIO.git
   cd Lista de tarefas/backend
   npm install
   ```
2. Crie o banco no MySQL:
   ```sql
   CREATE DATABASE todo_list;
   USE todo_list;
   CREATE TABLE tasks (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       status VARCHAR(50) NOT NULL
   );
   ```
3. Copie `.env.example` para `.env` e preencha com seus dados do MySQL.
4. Inicie o servidor com `npm run dev` (porta 3333).
5. Abra `frontend/index.html` no navegador.

## 👤 Autor

**Lucas Silva de Lima** · [LinkedIn]([https://www.linkedin.com/in/](https://www.linkedin.com/in/lucas-silva-de-lima-56a21b3b5/)) · [GitHub](https://github.com/olucazs)
