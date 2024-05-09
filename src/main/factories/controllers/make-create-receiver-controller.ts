import { CreateReceiver } from '@/use-cases/use-cases/create-receiver-use-case'
import { ReceiverRepository } from '@/infra/db/drizzle/receiver-repository'
import { UuidAdapter } from '@/infra/uuid/uuid-adapter'
import { CreateReceiverController } from '@/presentation/controllers/receiver/create-receiver-controller'
import { Controller } from '@/presentation/protocols'
import { CreateReceiverRequestValidator } from '@/validation/validators/create-receiver-request-validator'

export const makeCreateReceiverController = (): Controller => {
  const receiverRepository = new ReceiverRepository()
  const idGenerator = new UuidAdapter()
  const createReceiver = new CreateReceiver(receiverRepository, idGenerator)
  const validator = new CreateReceiverRequestValidator()
  return new CreateReceiverController(createReceiver, validator)
}
