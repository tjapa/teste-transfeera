import { GetReceiversRequest } from '@/presentation/models/get-receivers-request'
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
import {
  GetReceiversUseCase,
  FiltersGetReceivers,
} from '@/use-cases/protocols/get-receivers-use-case'
import { mapReceiverModelToReceiverResponse } from '@/presentation/mappers/receiver-model-to-receiver-model-response'

export class GetReceiversController implements Controller {
  constructor(
    private readonly getReceivers: GetReceiversUseCase,
    private readonly validator: Validator<GetReceiversRequest>,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    let getReceiversRequest: GetReceiversRequest

    try {
      getReceiversRequest = this.validator.validate(httpRequest.params)
    } catch (error) {
      return forbidden(error as Error)
    }

    try {
      const filterGetReceiversRequest: FiltersGetReceivers = {
        pixKeyType: getReceiversRequest.pix_key_type,
        pixKey: getReceiversRequest.pix_key,
        name: getReceiversRequest.name,
        offset: getReceiversRequest.offset,
        status: getReceiversRequest.status,
      }
      const receivers = await this.getReceivers.getReceivers(
        filterGetReceiversRequest,
      )
      const receiversFormatted = receivers.map(
        mapReceiverModelToReceiverResponse,
      )

      return ok(receiversFormatted)
    } catch (error) {
      return serverError()
    }
  }
}
