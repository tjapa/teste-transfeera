import { faker } from '@faker-js/faker'
import { randexp } from 'randexp'
import { DeleteReceiversRequest } from '@/presentation/models/delete-receivers-request'

export const mockDeleteReceiversRequest = (): DeleteReceiversRequest => [
  faker.string.uuid(),
  faker.string.uuid(),
  faker.string.uuid(),
]
