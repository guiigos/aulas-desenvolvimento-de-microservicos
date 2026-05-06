# Autenticacao e autorizacao entre microservicos

## Objetivo

Centralizar a autenticacao no servico `user-auth` e permitir que os demais microservicos validem localmente o mesmo token JWT enviado pelo cliente.

## Como funciona

1. O cliente autentica em `POST /v1/auth/login` no servico `services/user-auth`.
2. O `user-auth` valida as credenciais e gera um `accessToken`.
3. O cliente envia esse token no header `Authorization: Bearer <token>` para os demais servicos.
4. Cada microservico valida a assinatura do token localmente usando o mesmo `JWT_SECRET`.
5. Depois da autenticacao, os guards de permissao verificam o claim `permissions` para autorizar a operacao.

## O que foi implementado neste projeto

- Um modulo compartilhado em `shared/src/infra/auth/shared-auth.module.ts`.
- Um `JwtAuthGuard` global em `shared/src/infra/auth/guards/jwt-auth.guard.ts`.
- Um `PermissionsGuard` global em `shared/src/infra/auth/guards/permissions.guard.ts`.
- Reaproveitamento dos decorators `@Public()`, `@RequirePermissions()` e `@CurrentUser()`.
- Integracao do modulo compartilhado no `SharedModule`, que ja e importado por todos os servicos.

Com isso, o comportamento ficou assim:

- `services/user-auth` continua responsavel por login e emissao do token.
- `services/academic`, `services/attendance`, `services/enrollment` e `services/class-offering` agora validam o token recebido.
- Endpoints marcados com `@Public()` continuam acessiveis sem token.
- Endpoints sem `@Public()` exigem token valido.
- Endpoints com `@RequirePermissions(...)` exigem token valido e as permissoes corretas.

## Claims do token

Hoje o token emitido pelo `user-auth` contem:

- `sub`: identificador do usuario
- `email`: email do usuario
- `permissions`: permissoes usadas pelos outros servicos

Exemplo de payload:

```json
{
  "sub": "user-id",
  "email": "usuario@email.com",
  "permissions": [
    "students:read",
    "students:write"
  ]
}
```

## Configuracao necessaria

Todos os microservicos HTTP precisam ter o mesmo valor para a variavel `JWT_SECRET`.

Exemplo:

```env
JWT_SECRET=super-secret-shared-key
```

Sem esse valor igual entre os servicos:

- o `user-auth` vai assinar com uma chave
- os outros servicos vao tentar validar com outra
- o token sera rejeitado como invalido

## Fluxo de uso

### 1. Login no `user-auth`

```http
POST /v1/auth/login
Content-Type: application/json

{
  "email": "admin@school.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "accessToken": "eyJ..."
}
```

### 2. Chamada em outro microservico

```http
GET /v1/students
Authorization: Bearer eyJ...
```

## Regras aplicadas nos endpoints

Os endpoints dos microservicos passaram a seguir este padrao:

- `students`: leitura, criacao, edicao e remocao exigem permissao correspondente
- `teachers`: leitura, criacao, edicao e remocao exigem permissao correspondente
- `subjects`: leitura, criacao, edicao e remocao exigem permissao correspondente
- `classOfferings`: leitura, criacao e mudanca de status exigem permissao correspondente
- `enrollments`: leitura, criacao e cancelamento exigem permissao correspondente
- `attendances`: leitura e registro exigem permissao correspondente
- `auth/login`: continua publico

## Decisao arquitetural atual

Neste projeto, a validacao foi implementada com chave simetrica compartilhada via `JWT_SECRET` porque ela combina com a estrutura atual e reduz a complexidade inicial.

## Evolucao recomendada

Se quiser aumentar a seguranca no futuro, a proxima evolucao natural e migrar para assinatura assimetrica:

- `user-auth` assina com chave privada
- os demais servicos validam com chave publica
- apenas o servico autenticador pode emitir tokens validos

Essa mudanca costuma usar `RS256` e evita distribuir a chave de assinatura completa para todos os servicos.
