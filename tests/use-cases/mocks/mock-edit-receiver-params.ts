import { faker } from '@faker-js/faker'
import { randexp } from 'randexp'
import { EditReceiverParams } from '@/use-cases/protocols/edit-receiver-use-case'

export const mockEditReceiverParams = (): EditReceiverParams => ({
  pixKeyType: 'CPF',
  pixKey: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  registerId: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
})
