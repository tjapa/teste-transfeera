import { EditReceiver } from '@/use-cases/use-cases/edit-receiver-use-case'
import { ReceiverRepository } from '@/infra/db/drizzle/receiver-repository'
import { EditReceiverController } from '@/presentation/controllers/receiver/edit-receiver-controller'
import { Controller } from '@/presentation/protocols'
import { EditReceiverRequestValidator } from '@/validation/validators/edit-receiver-request-validator'

export const makeEditReceiverController = (): Controller => {
  const receiverRepository = new ReceiverRepository()
  const editReceiver = new EditReceiver(receiverRepository, receiverRepository)
  const validator = new EditReceiverRequestValidator()
  return new EditReceiverController(editReceiver, validator)
}
