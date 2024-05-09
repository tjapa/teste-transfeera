import { CreateReceiverRequest } from '@/presentation/models/create-receiver-request'
import { Validator } from '@/presentation/protocols/validation'
import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import {
  chaveAleatoriaSchema,
  cnpjSchema,
  cpfSchema,
  emailPixKeySchema,
  emailSchema,
  telefoneSchema,
} from '../schemas'
import { InvalidParamsError } from '@/presentation/errors/invalid-params-error'
import { getInvalidParamsFromTypeBox } from '../helpers/get-invalid-params-from-typebox'

const createReceiverRequestSchema = Type.Composite([
  Type.Object({
    name: Type.String({ minLength: 2, maxLength: 255 }),
    email: emailSchema,
    register_id: Type.Union([cpfSchema, cnpjSchema]),
  }),
  Type.Union([
    Type.Object({
      pix_key_type: Type.Literal('CPF'),
      pix_key: cpfSchema,
    }),
    Type.Object({
      pix_key_type: Type.Literal('CNPJ'),
      pix_key: cnpjSchema,
    }),
    Type.Object({
      pix_key_type: Type.Literal('EMAIL'),
      pix_key: emailPixKeySchema,
    }),
    Type.Object({
      pix_key_type: Type.Literal('TELEFONE'),
      pix_key: telefoneSchema,
    }),
    Type.Object({
      pix_key_type: Type.Literal('CHAVE_ALEATORIA'),
      pix_key: chaveAleatoriaSchema,
    }),
  ]),
])

export class CreateReceiverRequestValidator
  implements Validator<CreateReceiverRequest>
{
  constructor() {}

  validate(input: any): CreateReceiverRequest {
    try {
      const output = Value.Encode(createReceiverRequestSchema, input)
      return output
    } catch {
      // console.log(
      //   JSON.stringify(
      //     JSON.stringify([...Value.Errors(createReceiverRequestSchema, input)]),
      //     null,
      //     2,
      //   ),
      // )
      throw new InvalidParamsError(
        getInvalidParamsFromTypeBox(
          Value.Errors(createReceiverRequestSchema, input),
        ),
      )
    }
  }
}
