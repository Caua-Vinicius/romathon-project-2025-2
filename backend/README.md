# LUMICA API

API para suporte a chat vocacional, registro de usuários, perfil e gerenciamento de sessões de chat.

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="postgres://root:1234@localhost:5432/postgres?schema=public"
JWT_SECRET=açsldjfh3842hr98237
GOOGLE_API_KEY=SUA-API-KEY
```

- `DATABASE_URL`: string de conexão com o PostgreSQL.
- `JWT_SECRET`: chave secreta para gerar tokens JWT.
- `GOOGLE_API_KEY`: chave da API do Google Gemini.

---

## Rodando o PostgreSQL com Docker

Você pode criar e rodar um container PostgreSQL usando:

```bash
docker run -d   --name postgres-root   -e POSTGRES_USER=root   -e POSTGRES_PASSWORD=1234   -e POSTGRES_DB=postgres   -v pgdata:/var/lib/postgresql/data   -p 5432:5432   postgres:15
```

Isso cria o banco `postgres` com usuário `root` e senha `1234`, mapeando a porta local `5432`.

---

## Iniciando o Projeto

1. Clone o repositório e instale as dependências:
   ```bash
   npm install
   ```

2. Configure o `.env` conforme indicado acima.

3. Execute as migrações:
   ```bash
   npx prisma migrate deploy
   ```

4. Inicie o servidor:
   ```bash
   npm run dev
   ```

O backend estará disponível em `http://localhost:3000`.

---

## Rotas da API

### 🔐 Auth

#### **POST /auth**
Registra um novo usuário.

**Body:**
```json
{
  "name": "Cauã Silva",
  "email": "caua@example.com",
  "password": "123456"
}
```

---

#### **POST /auth/login**
Autentica um usuário e retorna o token JWT.

**Body:**
```json
{
  "email": "caua@example.com",
  "password": "123456"
}
```

---

#### **GET /auth/me**
Retorna os dados do usuário autenticado.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

---

### 💬 Chat Sessions

#### **GET /chat/sessions**
Lista todas as sessões de chat do usuário autenticado.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

---

#### **POST /chat/sessions**
Cria uma nova sessão de chat.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

---

#### **GET /chat/sessions/{sessionId}**
Obtém o histórico completo de uma sessão.

**Path Params:**
```
sessionId
```

**Headers:**
```
Authorization: Bearer <TOKEN>
```

---

#### **POST /chat/sessions/{sessionId}/message**
Envia uma nova mensagem para uma sessão e processa XP e conquistas.

**Path Params:**
```
sessionId
```

**Body:**
```json
{
  "content": "Olá, quero explorar minha carreira."
}
```

**Headers:**
```
Authorization: Bearer <TOKEN>
```

---

#### **DELETE /chat/sessions/{sessionId}**
Deleta uma sessão de chat específica.

**Path Params:**
```
sessionId
```

**Headers:**
```
Authorization: Bearer <TOKEN>
```

---

### 👤 Profile

#### **GET /profile/me**
Retorna o perfil completo do usuário autenticado.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

---

## 🧪 Testando a API

1. Verifique se o container do PostgreSQL está em execução.
2. Confirme que o `.env` contém `DATABASE_URL`, `JWT_SECRET` e `GOOGLE_API_KEY`.
3. Execute:
   ```bash
   npm run dev
   ```
4. Use **Postman**, **Insomnia** ou **curl** para testar as rotas.
5. Para rotas protegidas, envie o header:
   ```bash
   Authorization: Bearer <TOKEN>
   ```

---

## ⚙️ Observações

- Todas as rotas protegidas exigem autenticação JWT.
- O **Prisma** é utilizado como ORM para comunicação com o PostgreSQL.
- O **Google Gemini** é usado para gerar respostas no chat vocacional.
- O sistema aplica XP e conquistas conforme o usuário interage com o chatbot.