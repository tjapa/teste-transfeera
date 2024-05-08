import { CreateReceiver } from '@/domain/use-cases/create-receiver-use-case'
import { ReceiverRepository } from '@/infra/drizzle/receiver-repository'
import { UuidAdapter } from '@/infra/drizzle/uuid/uuid-adapter'
import { CreateReceiverController } from '@/presentation/controllers/receiver/create-receiver-controller'
import { Controller } from '@/presentation/protocols'
import { ValidationCreateReceiverRequest } from '@/validation/validators/create-receiver-request-validator'

export const makeCreateReceiverController = (): Controller => {
  const receiverRepository = new ReceiverRepository()
  const idGenerator = new UuidAdapter()
  const createReceiver = new CreateReceiver(receiverRepository, idGenerator)
  const validator = new ValidationCreateReceiverRequest()
  return new CreateReceiverController(createReceiver, validator)
}
