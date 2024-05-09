import { ReceiverModel } from '@/use-cases/models/receiver'
import { ReceiverResponse } from '../models/receiver-response'
import { decamelizeKeys } from 'fast-case'
import { type SnakeCasedPropertiesDeep } from 'type-fest'

export const mapReceiverModelToReceiverResponse = (
  receiverModel: ReceiverModel,
): ReceiverResponse => {
  return decamelizeKeys(
    receiverModel,
  ) as SnakeCasedPropertiesDeep<ReceiverModel>
}
