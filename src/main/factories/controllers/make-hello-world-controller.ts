import { HelloWorldController } from '@/presentation/controllers/hello-world-controller'
import { Controller } from '@/presentation/protocols'

export const makeHelloWorldController = (): Controller => {
  return new HelloWorldController()
}
