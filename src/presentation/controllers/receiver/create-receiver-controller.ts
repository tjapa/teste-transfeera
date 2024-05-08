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
  Validation,
} from '@/presentation/protocols'
import {
  CreateReceiverUseCase,
  CreateReceiverParams,
} from '@/domain/protocols/create-receiver-use-case'

export class CreateReceiverController implements Controller {
  constructor(
    private readonly createReceiver: CreateReceiverUseCase,
    private readonly validation: Validation<CreateReceiverRequest>,
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    let createReceiverRequest: CreateReceiverRequest

    try {
      createReceiverRequest = this.validation.validate(httpRequest.body)
    } catch (error) {
      console.log(error)
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
        name: receiver.email,
        register_id: receiver.registerId,
      })
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
