import { DeleteReceiversRequest } from '@/presentation/models/delete-receivers-request'
import {
  forbidden,
  ok,
  serverError,
} from '@/presentation/helpers/http/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validator,
} from '@/presentation/protocols'
import { DeleteReceiversUseCase } from '@/use-cases/protocols/delete-receivers-use-case'

export class DeleteReceiversController implements Controller {
  constructor(
    private readonly deleteReceivers: DeleteReceiversUseCase,
    private readonly validator: Validator<DeleteReceiversRequest>,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    let deleteReceiversRequest: DeleteReceiversRequest

    try {
      deleteReceiversRequest = this.validator.validate(httpRequest.body)
    } catch (error) {
      return forbidden(error as Error)
    }

    try {
      const deletedReceivers = await this.deleteReceivers.deleteReceivers(
        deleteReceiversRequest,
      )

      const deletedReceiversFormatted = {
        deleted_receiver_ids: deletedReceivers.deletedReceiverIds,
        not_found_receiver_ids: deletedReceivers.notFoundReceiverIds,
      }

      return ok(deletedReceiversFormatted)
    } catch (error) {
      return serverError()
    }
  }
}
