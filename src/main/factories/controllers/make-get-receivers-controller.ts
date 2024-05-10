import { GetReceivers } from '@/use-cases/use-cases/get-receivers-use-case'
import { ReceiverRepository } from '@/infra/db/drizzle/receiver-repository'
import { GetReceiversController } from '@/presentation/controllers/receiver/get-receivers-controller'
import { Controller } from '@/presentation/protocols'
import { GetReceiversRequestValidator } from '@/validation/validators/get-receivers-request-validator'

export const makeGetReceiversController = (): Controller => {
  const receiverRepository = new ReceiverRepository()
  const getReceivers = new GetReceivers(receiverRepository)
  const validator = new GetReceiversRequestValidator()
  return new GetReceiversController(getReceivers, validator)
}
