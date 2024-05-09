import { ReceiverModel } from '@/use-cases/models/receiver'
import { faker } from '@faker-js/faker'
import { CreateReceiverParams } from '@/use-cases/protocols/create-receiver-use-case'
import { randexp } from 'randexp'

export const mockReceiverRascunhoCPF = (): ReceiverModel => ({
  id: faker.string.uuid(),
  pixKeyType: 'CPF',
  pixKey: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  registerId: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  status: 'RASCUNHO',
})

export const mockReceiverRascunhoEmail = (): ReceiverModel => ({
  id: faker.string.uuid(),
  pixKeyType: 'CPF',
  pixKey: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  registerId: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  status: 'RASCUNHO',
})

export const mockReceiverRascunhoCNPJ = (): ReceiverModel => ({
  id: faker.string.uuid(),
  pixKeyType: 'CNPJ',
  pixKey: randexp(
    /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
  ),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  registerId: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  status: 'RASCUNHO',
})

export const mockReceiverRascunhoTelefone = (): ReceiverModel => ({
  id: faker.string.uuid(),
  pixKeyType: 'TELEFONE',
  pixKey: randexp(/^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  registerId: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  status: 'RASCUNHO',
})

export const mockReceiverRascunhoChaveAleatoria = (): ReceiverModel => ({
  id: faker.string.uuid(),
  pixKeyType: 'CHAVE_ALEATORIA',
  pixKey: randexp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  ),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  registerId: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  status: 'RASCUNHO',
})

export const mockReceiverValidadoCPF = (): ReceiverModel => ({
  id: faker.string.uuid(),
  pixKeyType: 'CPF',
  pixKey: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  registerId: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  status: 'VALIDADO',
})

export const mockCreateReceiverParams = (): CreateReceiverParams => ({
  pixKeyType: 'CPF',
  pixKey: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  registerId: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
})
