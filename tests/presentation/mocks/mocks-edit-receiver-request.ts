import { faker } from '@faker-js/faker'
import { randexp } from 'randexp'
import { EditReceiverRequest } from '@/presentation/models/edit-receiver-request'

export const mockEditReceiverRequestWithoutSomeFields =
  (): EditReceiverRequest => ({
    email: faker.internet.email().toUpperCase(),
    register_id: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  })

export const mockEditReceiverRequestCPF = (): EditReceiverRequest => ({
  pix_key_type: 'CPF',
  pix_key: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  email: faker.internet.email().toUpperCase(),
  name: faker.person.fullName(),
  register_id: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
})

export const mockEditReceiverRequestPixEmail = (): EditReceiverRequest => ({
  pix_key_type: 'EMAIL',
  pix_key: randexp(/^[a-z0-9+_.-]+@[a-z0-9.-]+$/),
  email: faker.internet.email().toUpperCase(),
  name: faker.person.fullName(),
  register_id: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
})

export const mockEditReceiverRequestCNPJ = (): EditReceiverRequest => ({
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

export const mockEditReceiverRequestChaveAleatoria =
  (): EditReceiverRequest => ({
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

export const mockEditReceiverRequestTelefone = (): EditReceiverRequest => ({
  pix_key_type: 'TELEFONE',
  pix_key: randexp(/^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/),
  email: faker.internet.email().toUpperCase(),
  name: faker.person.fullName(),
  register_id: randexp(
    /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
  ),
})

export const mockEditReceiverRequestInvalidCPF = (): EditReceiverRequest => ({
  pix_key_type: 'CPF',
  pix_key: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{3}$/),
  email: faker.internet.email().toUpperCase(),
  name: faker.person.fullName(),
  register_id: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
})

export const mockEditReceiverRequestInvalidPixEmail =
  (): EditReceiverRequest => ({
    pix_key_type: 'EMAIL',
    pix_key: randexp(/^[A-Z0-9+_.-]+@[a-z0-9.-]+$/),
    email: faker.internet.email().toUpperCase(),
    name: faker.person.fullName(),
    register_id: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  })

export const mockEditReceiverRequestInvalidCNPJ = (): EditReceiverRequest => ({
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

export const mockEditReceiverRequestInvalidChaveAleatoria =
  (): EditReceiverRequest => ({
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

export const mockEditReceiverRequestInvalidTelefone =
  (): EditReceiverRequest => ({
    pix_key_type: 'TELEFONE',
    pix_key: randexp(/^((?:\+?55)?)([1-9][0-9])(9[0-9]{10})$/),
    // pix_key: '55249161699868',
    email: faker.internet.email().toUpperCase(),
    name: faker.person.fullName(),
    register_id: randexp(
      /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
    ),
  })

export const mockEditReceiverRequestInvalidEmail = (): EditReceiverRequest => ({
  pix_key_type: 'TELEFONE',
  pix_key: randexp(/^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/),
  email: faker.internet.email().toLowerCase(),
  name: faker.person.fullName(),
  register_id: randexp(
    /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
  ),
})

export const mockEditReceiverRequestInvalidRegisterId =
  (): EditReceiverRequest => ({
    pix_key_type: 'TELEFONE',
    pix_key: randexp(/^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/),
    email: faker.internet.email().toUpperCase(),
    name: faker.person.fullName(),
    register_id: randexp(
      /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{3}$/,
    ),
  })

export const mockEditReceiverRequestInvalidPixType =
  (): EditReceiverRequest => ({
    // @ts-ignore
    pix_key_type: 'invalid_pix_type',
    pix_key: randexp(/^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/),
    email: faker.internet.email().toUpperCase(),
    name: faker.person.fullName(),
    register_id: randexp(
      /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{3}$/,
    ),
  })

export const mockEditReceiverRequestInvalidPixKeyWithoutPixKeyType =
  (): EditReceiverRequest => ({
    pix_key_type: 'CPF',
    email: faker.internet.email().toUpperCase(),
    name: faker.person.fullName(),
    register_id: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  })

export const mockEditReceiverRequestInvalidPixKeyTypeWithoutPixKey =
  (): EditReceiverRequest => ({
    pix_key_type: 'CPF',
    email: faker.internet.email().toUpperCase(),
    name: faker.person.fullName(),
    register_id: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  })
