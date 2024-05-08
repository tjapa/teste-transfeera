import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { ok } from '@/presentation/helpers/http/http-helper'

export class HelloWorldController implements Controller {
  constructor() {}

  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    return ok({ message: 'Hello World!' })
  }
}
