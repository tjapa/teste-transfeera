import { ReceiverModel } from '@/domain/models/receiver'
import { faker } from '@faker-js/faker'
import { CreateReceiverParams } from '@/domain/protocols/create-receiver-use-case'

export const mockReceiver = (): ReceiverModel => ({
  id: faker.string.uuid(),
  pixKeyType: 'CPF',
  pixKey: faker.helpers.fromRegExp(
    /^[0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2}$/, //CPF
  ),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  registerId: faker.helpers.fromRegExp(
    /^[0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2}$/, //CPF
  ),
  status: 'RASCUNHO',
})

export const mockCreateReceiverParams = (): CreateReceiverParams => ({
  pixKeyType: 'CPF',
  pixKey: faker.helpers.fromRegExp(
    /^[0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2}$/, //CPF
  ),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  registerId: faker.helpers.fromRegExp(
    /^[0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2}$/, //CPF
  ),
})
