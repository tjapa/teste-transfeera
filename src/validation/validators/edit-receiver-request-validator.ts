import { EditReceiverRequest } from '@/presentation/models/edit-receiver-request'
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

const editReceiverRequestSchema = Type.Composite([
  Type.Object({
    name: Type.Optional(Type.String()),
    email: Type.Optional(emailSchema),
    register_id: Type.Optional(Type.Union([cpfSchema, cnpjSchema])),
  }),
  Type.Optional(
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
  ),
])

export class EditReceiverRequestValidator
  implements Validator<EditReceiverRequest>
{
  constructor() {}

  validate(input: any): EditReceiverRequest {
    try {
      const output = Value.Encode(editReceiverRequestSchema, input)
      return output
    } catch {
      throw new InvalidParamsError(
        getInvalidParamsFromTypeBox(
          Value.Errors(editReceiverRequestSchema, input),
        ),
      )
    }
  }
}
