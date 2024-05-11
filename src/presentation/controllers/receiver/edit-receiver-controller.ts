import { EditReceiverRequest } from '@/presentation/models/edit-receiver-request'
import {
  forbidden,
  notFound,
  ok,
  serverError,
} from '@/presentation/helpers/http/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validator,
} from '@/presentation/protocols'
import {
  EditReceiverUseCase,
  EditReceiverParams,
} from '@/use-cases/protocols/edit-receiver-use-case'
import { mapReceiverModelToReceiverResponse } from '@/presentation/mappers/receiver-model-to-receiver-model-response'
import { InvalidParamsError } from '@/presentation/errors/invalid-params-error'
import { InvalidReceiverEditDataFieldsError } from '@/use-cases/errors/invalid-receiver-edit-data-error'
import { ReceiverNotFoundError } from '@/use-cases/errors/receiver-not-found-error'

export class EditReceiverController implements Controller {
  constructor(
    private readonly editReceiver: EditReceiverUseCase,
    private readonly validator: Validator<EditReceiverRequest>,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    let editReceiverRequest: EditReceiverRequest

    if (!httpRequest?.params?.id) {
      return forbidden(new InvalidParamsError('Empty id'))
    }

    const id = httpRequest.params.id

    try {
      editReceiverRequest = this.validator.validate(httpRequest.body)
    } catch (error) {
      return forbidden(error as Error)
    }

    try {
      const editReceiverParams: EditReceiverParams = {
        pixKeyType: editReceiverRequest?.pix_key_type,
        pixKey: editReceiverRequest?.pix_key,
        email: editReceiverRequest?.email,
        name: editReceiverRequest?.name,
        registerId: editReceiverRequest?.register_id,
      }
      const receiver = await this.editReceiver.edit(id, editReceiverParams)
      const receiverFormatted = mapReceiverModelToReceiverResponse(receiver)

      return ok(receiverFormatted)
    } catch (error) {
      if (error instanceof InvalidReceiverEditDataFieldsError) {
        return forbidden(error)
      } else if (error instanceof ReceiverNotFoundError) {
        return notFound(error)
      }
      console.error(error)
      return serverError()
    }
  }
}
