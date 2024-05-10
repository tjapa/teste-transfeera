import { GetReceiversRequest } from '@/presentation/models/get-receivers-request'
import { Validator } from '@/presentation/protocols/validation'
import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import {
  chaveAleatoriaSchema,
  cnpjSchema,
  cpfSchema,
  emailPixKeySchema,
  telefoneSchema,
} from '../schemas'
import { InvalidParamsError } from '@/presentation/errors/invalid-params-error'
import { getInvalidParamsFromTypeBox } from '../helpers/get-invalid-params-from-typebox'

const getReceiversRequestSchema = Type.Union([
  Type.Object({
    offset: Type.Optional(Type.Number({ minimum: 1 })),
    name: Type.Optional(Type.String()),
    pix_key_type: Type.Optional(
      Type.Union([
        Type.Literal('CPF'),
        Type.Literal('CNPJ'),
        Type.Literal('EMAIL'),
        Type.Literal('TELEFONE'),
        Type.Literal('CHAVE_ALEATORIA'),
      ]),
    ),
    pix_key: Type.Optional(
      Type.Union([
        cpfSchema,
        cnpjSchema,
        emailPixKeySchema,
        telefoneSchema,
        chaveAleatoriaSchema,
      ]),
    ),
    status: Type.Optional(
      Type.Union([Type.Literal('RASCUNHO'), Type.Literal('VALIDADO')]),
    ),
  }),
  Type.Undefined(),
])

export class GetReceiversRequestValidator
  implements Validator<GetReceiversRequest>
{
  constructor() {}
  validate(input: any): GetReceiversRequest {
    try {
      const convertedInput = Value.Convert(getReceiversRequestSchema, input)
      const output = Value.Encode(getReceiversRequestSchema, convertedInput)
      return output
    } catch {
      throw new InvalidParamsError(
        getInvalidParamsFromTypeBox(
          Value.Errors(getReceiversRequestSchema, input),
        ),
      )
    }
  }
}
