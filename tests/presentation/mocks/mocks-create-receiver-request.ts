import { faker } from '@faker-js/faker'
import { randexp } from 'randexp'
import { CreateReceiverRequest } from '@/presentation/models/create-receiver-request'

export const mockCreateReceiverRequestCPF = (): CreateReceiverRequest => ({
  pix_key_type: 'CPF',
  pix_key: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  email: faker.internet.email().toUpperCase(),
  name: faker.person.fullName(),
  register_id: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
})

export const mockCreateReceiverRequestPixEmail = (): CreateReceiverRequest => ({
  pix_key_type: 'EMAIL',
  pix_key: randexp(/^[a-z0-9+_.-]+@[a-z0-9.-]+$/),
  email: faker.internet.email().toUpperCase(),
  name: faker.person.fullName(),
  register_id: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
})

export const mockCreateReceiverRequestCNPJ = (): CreateReceiverRequest => ({
  pix_key_type: 'CNPJ',
  pix_key: randexp(
    /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
  ),
  email: faker.internet.email().toUpperCase(),
  name: faker.person.fullName(),
  register_id: randexp(
    /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
  ),
})

export const mockCreateReceiverRequestChaveAleatoria =
  (): CreateReceiverRequest => ({
    pix_key_type: 'CHAVE_ALEATORIA',
    pix_key: randexp(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    ),
    email: faker.internet.email().toUpperCase(),
    name: faker.person.fullName(),
    register_id: randexp(
      /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
    ),
  })

export const mockCreateReceiverRequestTelefone = (): CreateReceiverRequest => ({
  pix_key_type: 'TELEFONE',
  pix_key: randexp(/^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/),
  email: faker.internet.email().toUpperCase(),
  name: faker.person.fullName(),
  register_id: randexp(
    /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
  ),
})

export const mockCreateReceiverRequestInvalidCPF = (): CreateReceiverRequest => ({
  pix_key_type: 'CPF',
  pix_key: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{3}$/),
  email: faker.internet.email().toUpperCase(),
  name: faker.person.fullName(),
  register_id: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
})

export const mockCreateReceiverRequestInvalidPixEmail =
  (): CreateReceiverRequest => ({
    pix_key_type: 'EMAIL',
    pix_key: randexp(/^[A-Z0-9+_.-]+@[a-z0-9.-]+$/),
    email: faker.internet.email().toUpperCase(),
    name: faker.person.fullName(),
    register_id: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  })

export const mockCreateReceiverRequestInvalidCNPJ =
  (): CreateReceiverRequest => ({
    pix_key_type: 'CNPJ',
    pix_key: randexp(
      /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{3}$/,
    ),
    email: faker.internet.email().toUpperCase(),
    name: faker.person.fullName(),
    register_id: randexp(
      /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
    ),
  })

export const mockCreateReceiverRequestInvalidChaveAleatoria =
  (): CreateReceiverRequest => ({
    pix_key_type: 'CHAVE_ALEATORIA',
    pix_key: randexp(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{13}$/i,
    ),
    email: faker.internet.email().toUpperCase(),
    name: faker.person.fullName(),
    register_id: randexp(
      /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
    ),
  })

export const mockCreateReceiverRequestInvalidTelefone =
  (): CreateReceiverRequest => ({
    pix_key_type: 'TELEFONE',
    pix_key: randexp(/^((?:\+?55)?)([1-9][0-9])(9[0-9]{10})$/),
    // pix_key: '55249161699868',
    email: faker.internet.email().toUpperCase(),
    name: faker.person.fullName(),
    register_id: randexp(
      /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
    ),
  })

export const mockCreateReceiverRequestInvalidEmail =
  (): CreateReceiverRequest => ({
    pix_key_type: 'TELEFONE',
    pix_key: randexp(/^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/),
    email: faker.internet.email().toLowerCase(),
    name: faker.person.fullName(),
    register_id: randexp(
      /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
    ),
  })

export const mockCreateReceiverRequestInvalidRegisterId =
  (): CreateReceiverRequest => ({
    pix_key_type: 'TELEFONE',
    pix_key: randexp(/^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/),
    email: faker.internet.email().toUpperCase(),
    name: faker.person.fullName(),
    register_id: randexp(
      /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{3}$/,
    ),
  })

export const mockCreateReceiverRequestInvalidPixType =
  (): CreateReceiverRequest => ({
    // @ts-ignore
    pix_key_type: 'invalid_pix_type',
    pix_key: randexp(/^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/),
    email: faker.internet.email().toUpperCase(),
    name: faker.person.fullName(),
    register_id: randexp(
      /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{3}$/,
    ),
  })
