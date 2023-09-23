# Projeto Minhas Viagens 🚀

Este é o projeto Fullstack de um página de relatório viagens, onde os usuários podem fazer **cadastro e login**, bem como **criar**, **ler**, **atualizar** e **excluir** (**CRUD**) seus próprios relatórios de viagem.

O projeto foi desenvolvido como um **monorepo**, onde todos os componentes estão contidos em um único repositório, incluindo o back-end, front-end e os containers de desenvolvimento da aplicação.

## Conteúdo

- [Containers 🐳](https://github.com/Kevinbtv/my-trips#containers)
- [Back-end 🌐](https://github.com/Kevinbtv/my-trips#back-end)
- [Front-end 💻](https://github.com/Kevinbtv/my-trips#front-end)
- [Deploy ⚙️](https://github.com/Kevinbtv/my-trips#deploy)
- [Executando o Projeto ▶️](https://github.com/Kevinbtv/my-trips#executando-o-projeto)

## Containers

O projeto utiliza o Docker Compose para orquestrar múltiplos containers de desenvolvimento.

Ao todo, foram criados 3 containers:

- `db`: serviço do banco de dados da aplicação.
- `backend`: serviço da API da aplicação.
- `frontend`: serviço da interface do usuário.

Você pode encontrar mais detalhes e dependências de cada container no arquivo [docker-compose.yml](https://github.com/Kevinbtv/my-trips/blob/main/docker-compose.yaml).

## Back-end 🌐

O back-end do projeto é composto pelo banco de dados, que armazena os dados dos usuários e suas viagens, e pela API, que controla o acesso aos dados por meio de requisições do front-end.

### Banco de Dados

Para armazenar os dados das pessoas usuárias e suas viagens, foi utilizado o banco de dados `Postgres`, um sistema de gerenciamento de banco de dados relacional. Essa escolha foi feita devido ao relacionamento entre usuários e suas respectivas viagens.

Aqui estão as tabelas do banco de dados:

### Tabela de Usuários

| Coluna | Tipo | Descrição |
| --- | --- | --- |
| `id` | `String` | Identificador único do usuário. (Padrão: UUID) |
| `name` | `String` | Nome do usuário. |
| `email` | `String` | Email único do usuário. |
| `password` | `String` | Senha do usuário (armazenada de forma segura). |

### Tabela de Viagens

| Coluna | Tipo | Descrição |
| --- | --- | --- |
| `id` | `String` | Identificador único da viagem. (Padrão: UUID) |
| `local` | `String` | Local da viagem. |
| `country` | `String` | País da viagem. |
| `description` | `String` | Descrição da viagem (Opcional). |
| `favorita` | `Boolean` | Indica se a viagem é favorita ou não (Padrão: `false`). |
| `user_id` | `String` | Identificador único do usuário que fez a viagem. |

### API

A API segue a arquitetura RESTful e foi desenvolvida em `Node.js`, usando a arquitetura MSC (Model, Service, Controller) para uma clara separação de responsabilidades.

### Tecnologias Utilizadas

Para desenvolver a API, utilizamos as seguintes tecnologias:

- `Fastify`: para construir o servidor da API.
- `Zod`: para validação de dados enviados à API.
- `Cors`: para permitir o acesso à API de diferentes origens.
- `Json Web Token`: para geração e validação de tokens de acesso usados nos endpoints da API.
- `Prisma`: um ORM que mapeia objetos para tabelas SQL.
- `bcrypt`: para a segurança das senhas dos usuários, que são armazenadas de forma criptografada no banco de dados.

## Front-end 💻

O front-end da aplicação é a interface do usuário, e foi desenvolvido com a técnica de **hidratação parcial**, onde apenas os componentes interativos são renderizados no lado do cliente, enquanto o restante é processado no lado do servidor. Isso proporciona uma experiência de usuário mais eficiente.

### Tecnologias Utilizadas

Para desenvolver a interface do usuário, utilizamos as seguintes tecnologias:

- `Astro`: para gerenciar a aplicação no lado do servidor.
- `Svelte`: para gerenciar a aplicação no lado do cliente.
- `Axios`: para realizar requisições à API.
- `js-cookie`: para armazenar o token de acesso do usuário.
- `jsonwebtoken`: para decodificar e validar os tokens JWT.
- `sass`: para estilizar a interface do usuário.

### Páginas

Ao acessar qualquer uma das páginas, se um token válido estiver presente, o usuário será redirecionado automaticamente para a página de viagens.

#### Página inicial
Esta é a página de inicial, onde o usuário poderá ver informações sobre a aplicação. Assim como, botões para registrar ou efetuar um login.

![pagina-inicial](https://github.com/Kevinbtv/my-trips/assets/86861379/b3435739-f42b-43ed-94e7-e5cc5fefcdd9)


#### Login

Esta é a página de login, onde o usuário pode fazer login na aplicação. Se dados de login inválidos forem fornecidos, uma mensagem de erro será exibida. Após um login bem-sucedido, o usuário será redirecionado para a página de adição de novas viagens.

![login](https://github.com/Kevinbtv/my-trips/assets/86861379/f86483ec-1df6-4eb4-b8b9-f7e8ae15e308)

#### Cadastro

Nesta página, o usuário pode se cadastrar para usar a aplicação. Se os dados de cadastro forem inválidos, uma mensagem de erro será exibida. Após um cadastro bem-sucedido, o usuário será redirecionado para a página de adição de novas viagens.

![cadastro](https://github.com/Kevinbtv/my-trips/assets/86861379/1b088029-ed01-4f4f-8cf5-69e692acc5d1)

#### Nova Viagem

Aqui, o usuário pode adicionar informações sobre suas viagens.

![Novo lugar](https://github.com/Kevinbtv/my-trips/assets/86861379/3b058c01-abc0-4b09-aaed-e808fa295b01)

#### Minhas Viagens

Nesta página, o usuário pode visualizar todas as suas viagens, além de favoritá-las, editá-las e excluí-las.

![minhas-viagens](https://github.com/Kevinbtv/my-trips/assets/86861379/ea4a9d60-f860-4652-9b5f-da944f25ad78)

#### Minhas Viagens Favoritas

Esta página exibe todas as viagens favoritas do usuário, e ele pode removê-las se desejar.

![favoritos](https://github.com/Kevinbtv/my-trips/assets/86861379/7796003a-512c-4136-9bc7-6f68dd329993)

## Deploy

⚙️ O deploy da aplicação estará disponível em breve.

## Executando o Projeto

### Pré-requisitos

⚠️ Para executar o projeto, você precisará:

- Ter o [Docker](https://docs.docker.com/get-docker/) e o [Docker Compose](https://docs.docker.com/compose/) instalados em sua máquina.
- Clonar este repositório.
- Criar um arquivo `.env` na pasta `server`, com base no [.env.example](https://github.com/Kevinbtv/my-trips/blob/main/server/.env.sample), definindo os valores de cada variável de ambiente utilizada.

### Passo a Passo

Com os pré-requisitos atendidos, siga os seguintes passos para executar o projeto:

1. Na raiz do projeto, execute o seguinte comando para iniciar os containers da aplicação:

```bash
make start
```

Se desejar iniciar os containers com logs, use o seguinte comando:

```bash
make start logs
```

Para parar os containers, use o seguinte comando:

```bash
make stop
```

2. Com os containers em execução, acesse o seguinte endereço em seu navegador para visualizar a aplicação:

```bash
localhost:4321
```

## Próximos Passos

- Adicionar funcionalidade de filtro para as viagens.
- Melhorar a validação dos formulários.
- Implementar um sistema de refresh token JWT para maior segurança.
- Implementar um sistema de Administrador para ter permissões exclusivas.
