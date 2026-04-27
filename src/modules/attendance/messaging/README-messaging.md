# Messaging — attendance

Este módulo é responsável por toda a integração RabbitMQ do microserviço `attendance`. No startup, ele cria suas exchanges publicadoras, declara suas filas consumidoras e vincula-as às exchanges dos outros microserviços. Nada é feito via HTTP aqui — o bootstrap é automático.

## Subir um RabbitMQ local para testes

```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

- `5672` — porta AMQP (usada pela aplicação).
- `15672` — management UI (`http://localhost:15672`, usuário `guest`, senha `guest`).

Depois, configure no `.env`:

```env
RABBITMQ_URL=amqp://guest:guest@localhost:5672
```

## Testando manualmente pela UI

1. Acesse `http://localhost:15672` e faça login com `guest` / `guest`.
2. Suba o `attendance` (`npm run start:dev`). Os logs devem mostrar:
   - `RabbitMQ connection established`
   - `Topology bootstrap complete: 1 exchange publicada, 8 filas vinculadas`
   - Uma linha de `Consumer registrado na fila "..."` para cada uma das 8 filas.
3. Na UI, abra a aba **Exchanges** — as exchanges externas (`academic.students.*`, `class-offering.*`, `enrollment.*`) devem estar listadas porque o attendance as declarou (assertExchange é idempotente).
4. Clique na exchange que quer testar (ex.: `academic.students.created.exchange`) → seção **Publish message**:
   - **Routing key**: a routing key correspondente (ex.: `student.created`).
   - **Payload**: JSON mínimo esperado pelo consumer — veja os exemplos abaixo.
   - Clique em **Publish message**.
5. Olhe a aba **Queues**: a fila vinculada (`attendance.academic-students.created.queue`, etc.) deve ter recebido e processado a mensagem. Veja os logs da aplicação pra confirmar o ack e a persistência no banco.

### Exemplos de payload por routing key

```json
// student.created / student.updated
{ "id": "00000000-0000-0000-0000-000000000001", "name": "Fulano" }

// student.deleted
{ "id": "00000000-0000-0000-0000-000000000001" }

// class-offering.created / class-offering.updated
{ "id": "00000000-0000-0000-0000-000000000002", "status": "active" }

// class-offering.canceled
{ "id": "00000000-0000-0000-0000-000000000002" }

// enrollment.created
{
  "id": "00000000-0000-0000-0000-000000000003",
  "studentId": "00000000-0000-0000-0000-000000000001",
  "classOfferingId": "00000000-0000-0000-0000-000000000002",
  "status": "active"
}

// enrollment.canceled
{ "id": "00000000-0000-0000-0000-000000000003" }
```

Para testar o publisher do attendance, basta chamar `POST /v1/attendances` com um body válido — depois do insert, o evento `attendance.registered` é publicado em `attendance.registered.exchange`. Você pode criar uma fila temporária na UI (`Queues` → `Add a new queue`) e vinculá-la à exchange com routing key `attendance.registered` para ver a mensagem chegando.

## Topologia gerenciada pelo attendance

### 1 exchange publicadora

| Exchange | Type | Routing key |
|---|---|---|
| `attendance.registered.exchange` | direct | `attendance.registered` |

### 8 filas consumidoras

| Fila | Exchange externa | Routing key |
|---|---|---|
| `attendance.academic-students.created.queue` | `academic.students.created.exchange` | `student.created` |
| `attendance.academic-students.updated.queue` | `academic.students.updated.exchange` | `student.updated` |
| `attendance.academic-students.deleted.queue` | `academic.students.deleted.exchange` | `student.deleted` |
| `attendance.class-offering.created.queue` | `class-offering.created.exchange` | `class-offering.created` |
| `attendance.class-offering.updated.queue` | `class-offering.updated.exchange` | `class-offering.updated` |
| `attendance.class-offering.canceled.queue` | `class-offering.canceled.exchange` | `class-offering.canceled` |
| `attendance.enrollment.created.queue` | `enrollment.created.exchange` | `enrollment.created` |
| `attendance.enrollment.canceled.queue` | `enrollment.canceled.exchange` | `enrollment.canceled` |

Todas as exchanges são `direct` e `durable: true`. Todas as filas são `durable: true`. `assertExchange` é idempotente, por isso o attendance pode subir sozinho, sem depender dos outros microserviços estarem no ar.
