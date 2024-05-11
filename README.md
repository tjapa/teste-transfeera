# Teste Transfeera

Teste de backend da Transfeera feito em NodeJS.

## Requisitos

- NodeJS v20
- Docker
- PostgreSQL

## Executando a API

### Via Terminal

```sh
npm install
npm build
docker compose -f docker-compose-test.yml up
npm run db:generate-migrations
npm run db:migrate
```

### Via Docker

```sh
docker compose -f docker-compose.yml up
npm install
npm run db:generate-migrations
npm run db:migrate
```

## Executando os Testes

### Todos os testes

```sh
docker compose -f docker-compose-test.yml up
npm install
npm run db:generate-migrations
npm run db:migrate
npm run test
```

### Apenas testes unitários no modo watch

```sh
docker compose -f docker-compose-test.yml
npm install
npm run db:generate-migrations
npm run db:migrate
npm run test:unit
```

### Apenas testes de integração no modo watch

```sh
docker compose -f docker-compose-test.yml up
npm install
npm run db:generate-migrations
npm run db:migrate
npm run test:integration
```

## Endpoints

Há um arquivo com a coleção do Postman no diretório utils.

### Exemplos

#### GET /api/receivers

URL:

```
http://localhost:3000/api/receivers?offset=10&pix_key_type=CPF&status=VALIDADO
```

Resposta:

```json
[
  {
    "id": "0a0aa45e-daed-4bbf-895c-57f3042bcbfb",
    "register_id": "014.777.044-06",
    "email": "Lucius.Stamm@yahoo.com",
    "name": "Jon Zemlak",
    "pix_key": "904835218-80",
    "pix_key_type": "CPF",
    "status": "VALIDADO"
  },
  {
    "id": "cccad33b-62a5-4241-9383-0af846210224",
    "register_id": "438.726.78774",
    "email": "Mike95@yahoo.com",
    "name": "Lauren Ebert-Murray",
    "pix_key": "939777.68205",
    "pix_key_type": "CPF",
    "status": "VALIDADO"
  }
]
```

#### POST /api/receivers

Body:

```json
{
  "name": "oi",
  "email": "NICOTAMALU@GMAIL.COM",
  "register_id": "123456789-00",
  "pix_key_type": "CPF",
  "pix_key": "123456789-00"
}
```

Resposta:

```json
{
  "id": "2c78fd03-5db1-4f47-9806-7b4d82073867",
  "pix_key_type": "CPF",
  "pix_key": "123456789-00",
  "email": "NICOTAMALU@GMAIL.COM",
  "name": "oi",
  "register_id": "123456789-00",
  "status": "RASCUNHO"
}
```

#### DELETE /api/receivers

Body:

```json
["cccad33b-62a5-4241-9383-0af846210224", "invalid_id"]
```

Resposta:

```json
{
  "deleted_receiver_ids": ["cccad33b-62a5-4241-9383-0af846210224"],
  "not_found_receiver_ids": ["invalid_id"]
}
```

#### PATCH /api/receivers/:id

URL:

```
http://localhost:3000/api/receivers/0a0aa45e-daed-4bbf-895c-57f3042bcbfb
```

Resposta:

```json
{
  "id": "0a0aa45e-daed-4bbf-895c-57f3042bcbfb",
  "pix_key_type": "CPF",
  "pix_key": "904835218-80",
  "email": "NICOTAMALU@GMAIL.COM",
  "name": "Jon Zemlak",
  "register_id": "014.777.044-06",
  "status": "VALIDADO"
}
```

## Observações

- O pré-cadastro dos 30 favorecidos é feito na migração SQL. Ao rodar os testes, a tabela é zerada.
- Na criação dos favorecidos, optei por também deixar como obrigatório os campos de nome e CPF/CNPJ, sendo necessário que esse último atenda a Regex da validação;
- No caso da edição de informações relacionadas ao PIX, ambos os campos (chave PIX e tipo da chave) devem ser passados;
- Faltou adicionar logs e melhorar as respostas de erro.
- Acabei implementando a validação da camada de apresentação, mas no decorrer do desenvolvimento, percebi que deveria ter criado uma camada de entidades com os recebedores, CPF, PIX, etc, e essas entidades deveriam conter as regras de negócio, porém estava ficando sem tempo para fazer essa alteração.
  Deixo aqui pseudo-códigos com exemplos de como o código ficaria:

// src/entities/cpf.ts

```ts
class CPF {
  private readonly cpf: string

  private constructor(cpf: string) {
    this.cpf = cpf
  }

  static create(cpf: string): CPF {
    if (!CPF.validate(cpf)) {
      new InvalidCPFError(cpf)
    }
    return new CPF(cpf)
  }

  get value(): string {
    return this.cpf
  }

  static validate(cpf: string): boolean {
    ...
  }
}
```

// src/entities/receiver.ts

```ts
class Receiver {
  private readonly cpf: CPF
  // demais campos como pix, nome, email, etc

  private constructor(cpf: CPF, ...) {
    this.cpf = cpf
  }

  static create({cpf: string, ...}): Receiver {
    const validCpf = CPF.create(cpf)
    return new Receiver(validCpf, ...)
  }

  get value(): ReceiverModel {
    ...
  }

  // algo assim que lançasse um erro ou retornasse algo tipo de erro, caso não pudesse ser editado
  canBeEdited(editReceiverData): Bool {
    ...
  }
}
```

// src/use-cases/implementations/edit-receiver-use-case.ts

```ts
export class EditReceiver implements EditReceiverUseCase {
  async edit(
    id: string,
    editReceiverData: EditReceiverParams,
  ): Promise<ReceiverModel> {
    const receiverData =
      await this.getReceiverByIdRepository.getReceiverById(id)

    const receiver = Receiver.create(receiverData)

    receiver.canBeEdited(editReceiverData)

    const receiverEdited = await this.editReceiverByIdRepository.edit(
      id,
      editReceiverData,
    )

    return receiverEdited
  }
}
```

Algo semelhante deveria ser feito no use-case de criação de um favorecido.
