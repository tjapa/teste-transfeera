import { DeleteReceiversRequest } from '@/presentation/models/delete-receivers-request'
import { Validator } from '@/presentation/protocols/validation'
import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { InvalidParamsError } from '@/presentation/errors/invalid-params-error'
import { getInvalidParamsFromTypeBox } from '../helpers/get-invalid-params-from-typebox'

const deleteReceiversRequestSchema = Type.Array(Type.String())

export class DeleteReceiversRequestValidator
  implements Validator<DeleteReceiversRequest> {
  constructor() { }
  validate(input: any): DeleteReceiversRequest {
    try {
      const output = Value.Encode(deleteReceiversRequestSchema, input)
      return output
    } catch {
      throw new InvalidParamsError(
        getInvalidParamsFromTypeBox(
          Value.Errors(deleteReceiversRequestSchema, input),
        ),
      )
    }
  }
}
