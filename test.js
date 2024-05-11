import { faker } from '@faker-js/faker'
import { CreateReceiverParams } from '@/use-cases/protocols/create-receiver-use-case'
import { randexp } from 'randexp'

export const mockReceiverRascunhoCPF = () => ({
  id: faker.string.uuid(),
  pixKeyType: 'CPF',
  pixKey: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  registerId: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  status: 'RASCUNHO',
})

export const mockReceiverRascunhoEmail = () => ({
  id: faker.string.uuid(),
  pixKeyType: 'EMAIL',
  pixKey: randexp(/^[a-z0-9+_.-]+@[a-z0-9.-]+$/),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  registerId: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  status: 'RASCUNHO',
})

export const mockReceiverRascunhoCNPJ = () => ({
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

export const mockReceiverRascunhoTelefone = () => ({
  id: faker.string.uuid(),
  pixKeyType: 'TELEFONE',
  pixKey: randexp(/^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  registerId: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  status: 'RASCUNHO',
})

export const mockReceiverRascunhoChaveAleatoria = () => ({
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

export const mockReceiverValidadoCPF = () => ({
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

const gerados = [
  mockReceiverRascunhoCPF(),
  mockReceiverRascunhoEmail(),
  mockReceiverRascunhoCPF(),
  mockReceiverRascunhoEmail(),
  mockReceiverRascunhoCNPJ(),
  mockReceiverRascunhoTelefone(),
  mockReceiverRascunhoChaveAleatoria(),
  mockReceiverValidadoCPF(),
  mockReceiverValidadoCPF(),
  mockReceiverValidadoCPF(),
  mockReceiverRascunhoCPF(),
  mockReceiverRascunhoEmail(),
  mockReceiverRascunhoCPF(),
  mockReceiverRascunhoEmail(),
  mockReceiverRascunhoCNPJ(),
  mockReceiverRascunhoTelefone(),
  mockReceiverRascunhoChaveAleatoria(),
  mockReceiverValidadoCPF(),
  mockReceiverValidadoCPF(),
  mockReceiverValidadoCPF(),
  mockReceiverRascunhoCPF(),
  mockReceiverRascunhoEmail(),
  mockReceiverRascunhoCPF(),
  mockReceiverRascunhoEmail(),
  mockReceiverRascunhoCNPJ(),
  mockReceiverRascunhoTelefone(),
  mockReceiverRascunhoChaveAleatoria(),
  mockReceiverValidadoCPF(),
  mockReceiverValidadoCPF(),
  mockReceiverValidadoCPF(),
]
console.log(gerados)
