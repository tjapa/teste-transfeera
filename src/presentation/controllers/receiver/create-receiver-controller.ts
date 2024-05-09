import { CreateReceiverRequest } from '@/presentation/models/create-receiver-request'
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
  CreateReceiverUseCase,
  CreateReceiverParams,
} from '@/use-cases/protocols/create-receiver-use-case'

export class CreateReceiverController implements Controller {
  constructor(
    private readonly createReceiver: CreateReceiverUseCase,
    private readonly validator: Validator<CreateReceiverRequest>,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    let createReceiverRequest: CreateReceiverRequest

    try {
      createReceiverRequest = this.validator.validate(httpRequest.body)
    } catch (error) {
      return forbidden(error as Error)
    }

    try {
      const createReceiverParams: CreateReceiverParams = {
        pixKeyType: createReceiverRequest.pix_key_type,
        pixKey: createReceiverRequest.pix_key,
        email: createReceiverRequest.email,
        name: createReceiverRequest.name,
        registerId: createReceiverRequest.register_id,
      }
      const receiver = await this.createReceiver.create(createReceiverParams)

      return ok({
        id: receiver.id,
        pix_key_type: receiver.pixKeyType,
        pix_key: receiver.pixKey,
        email: receiver.email,
        name: receiver.name,
        register_id: receiver.registerId,
        status: receiver.status,
      })
    } catch (error) {
      return serverError()
    }
  }
}
