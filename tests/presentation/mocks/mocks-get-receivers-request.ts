import { faker } from '@faker-js/faker'
import { randexp } from 'randexp'
import { GetReceiversRequest } from '@/presentation/models/get-receivers-request'

export const mockGetReceiversRequest = (): GetReceiversRequest => ({
  pix_key_type: 'CPF',
  pix_key: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
  name: faker.person.fullName(),
  status: 'RASCUNHO',
  offset: 10,
})

export const mockGetReceiversRequestInvalidPixKeyType =
  (): GetReceiversRequest => ({
    // @ts-ignore
    pix_key_type: 'wrong_pix_key_type',
    pix_key: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
    name: faker.person.fullName(),
    status: 'RASCUNHO',
    offset: 10,
  })

export const mockGetReceiversRequestInvalidPixKey =
  (): GetReceiversRequest => ({
    pix_key_type: 'CPF',
    pix_key: 'invalid_pix_key',
    name: faker.person.fullName(),
    status: 'RASCUNHO',
    offset: 10,
  })

export const mockGetReceiversRequestInvalidStatus =
  (): GetReceiversRequest => ({
    pix_key_type: 'CPF',
    pix_key: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
    name: faker.person.fullName(),
    // @ts-ignore
    status: 'oi',
    offset: 10,
  })

export const mockGetReceiversRequestInvalidOffset =
  (): GetReceiversRequest => ({
    pix_key_type: 'CPF',
    pix_key: randexp(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/),
    name: faker.person.fullName(),
    status: 'RASCUNHO',
    offset: -2,
  })
