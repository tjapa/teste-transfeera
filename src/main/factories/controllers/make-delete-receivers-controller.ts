import { DeleteReceivers } from '@/use-cases/use-cases/delete-receivers-use-case'
import { ReceiverRepository } from '@/infra/db/drizzle/receiver-repository'
import { DeleteReceiversController } from '@/presentation/controllers/receiver/delete-receivers-controller'
import { Controller } from '@/presentation/protocols'
import { DeleteReceiversRequestValidator } from '@/validation/validators/delete-receivers-request-validator'

export const makeDeleteReceiversController = (): Controller => {
  const receiverRepository = new ReceiverRepository()
  const deleteReceivers = new DeleteReceivers(receiverRepository)
  const validator = new DeleteReceiversRequestValidator()
  return new DeleteReceiversController(deleteReceivers, validator)
}
