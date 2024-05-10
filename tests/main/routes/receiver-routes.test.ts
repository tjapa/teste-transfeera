import request from 'supertest'
import app from '@/main/config/app'
import { disconnect, drizzleClient } from '@/infra/db/drizzle/dizzleClient'
import { receivers } from '@/infra/db/drizzle/schemas'
import {
  mockCreateReceiverRequestCPF,
  mockCreateReceiverRequestInvalidCPF,
} from '@/tests/presentation/mocks/mocks-create-receiver-request'
import {
  mockReceiverRascunhoCPF,
  mockReceiverRascunhoEmail,
  mockReceiverValidadoCPF,
} from '@/tests/use-cases/mocks/mock-receiver'
import { mapReceiverModelToReceiverResponse } from '@/presentation/mappers/receiver-model-to-receiver-model-response'
import {
  mockEditReceiverRequestCPF,
  mockEditReceiverRequestValidForStatusValidado,
} from '@/tests/presentation/mocks/mocks-edit-receiver-request'

describe('Receiver Routes', () => {
  afterAll(async () => {
    await disconnect()
  })

  beforeEach(async () => {
    await drizzleClient.delete(receivers)
  })

  describe('POST /receivers', () => {
    test('Should return 200 on valid create receiver request', async () => {
      const createReceiverRequest = mockCreateReceiverRequestCPF()
      await request(app)
        .post('/api/receivers')
        .send(createReceiverRequest)
        .expect(200)
        .then((response) => {
          const { body } = response
          expect(body.id).toBeTruthy()
          expect(body.status).toBe('RASCUNHO')
          expect(body).toEqual(expect.objectContaining(createReceiverRequest))
        })
    })

    test('Should return 403 on invalid create receiver request', async () => {
      const createReceiverRequest = mockCreateReceiverRequestInvalidCPF()
      await request(app)
        .post('/api/receivers')
        .send(createReceiverRequest)
        .expect(403)
    })
  })

  describe('GET /receivers', () => {
    test('Should return 200 on valid get receivers request', async () => {
      const receiversCreated = [
        mockReceiverRascunhoCPF(),
        mockReceiverRascunhoEmail(),
        mockReceiverValidadoCPF(),
      ]
      await drizzleClient.insert(receivers).values(receiversCreated)

      const receiversResponse = receiversCreated.map(
        mapReceiverModelToReceiverResponse,
      )

      await request(app)
        .get('/api/receivers')
        .send()
        .expect(200)
        .then((response) => {
          const { body } = response
          expect(body).toHaveLength(3)
          expect(body).toEqual(expect.arrayContaining(receiversResponse))
        })

      await request(app)
        .get('/api/receivers?pix_key_type=CPF')
        .send()
        .expect(200)
        .then((response) => {
          const { body } = response
          expect(body).toHaveLength(2)
          expect(body).toEqual(
            expect.arrayContaining([
              receiversResponse[0],
              receiversResponse[2],
            ]),
          )
        })
    })

    test('Should return 403 on invalid params', async () => {
      await request(app).get('/api/receivers?offset=-1').send().expect(403)
      await request(app)
        .get('/api/receivers?pix_key_type=SENHA')
        .send()
        .expect(403)
      await request(app).get('/api/receivers?pix_key=93294').send().expect(403)
    })
  })

  describe('DELETE /receivers', () => {
    test('Should return 200 on valid get receivers request', async () => {
      const receiversCreated = [
        mockReceiverRascunhoCPF(),
        mockReceiverRascunhoEmail(),
        mockReceiverValidadoCPF(),
      ]
      await drizzleClient.insert(receivers).values(receiversCreated)

      await request(app)
        .delete('/api/receivers')
        .send([
          receiversCreated[0].id,
          'invalid_id1',
          'invalid_id2',
          receiversCreated[2].id,
        ])
        .expect(200)
        .then((response) => {
          const { body } = response
          expect(body.not_found_receiver_ids).toHaveLength(2)
          expect(body.not_found_receiver_ids).toEqual(
            expect.arrayContaining(['invalid_id1', 'invalid_id2']),
          )
          expect(body.deleted_receiver_ids).toHaveLength(2)
          expect(body.deleted_receiver_ids).toEqual(
            expect.arrayContaining([
              receiversCreated[0].id,
              receiversCreated[0].id,
            ]),
          )
        })
    })

    test('Should return 403 on invalid params', async () => {
      await request(app).delete('/api/receivers').send().expect(403)
      await request(app).delete('/api/receivers').send([1]).expect(403)
      await request(app)
        .delete('/api/receivers')
        .send(['test', 1, 'test'])
        .expect(403)
    })
  })

  describe('PATCH /receivers/:id', () => {
    test('Should return 200 on valid edit receiver request', async () => {
      const receiverRascunhoCreated = mockReceiverRascunhoEmail()
      const receiverValidadoCreated = mockReceiverValidadoCPF()
      await drizzleClient
        .insert(receivers)
        .values([receiverValidadoCreated, receiverRascunhoCreated])

      const editReceiverRascunhoRequest = mockEditReceiverRequestCPF()
      const expectedResponseEditReceiverRascunho =
        mapReceiverModelToReceiverResponse({
          ...receiverRascunhoCreated,
          ...editReceiverRascunhoRequest,
        })
      await request(app)
        .patch(`/api/receivers/${receiverRascunhoCreated.id}`)
        .send(editReceiverRascunhoRequest)
        .expect(200)
        .then((response) => {
          const { body } = response
          expect(body).toEqual(expectedResponseEditReceiverRascunho)
        })

      const editReceiverValidadoRequest =
        mockEditReceiverRequestValidForStatusValidado()
      const expectedResponseEditReceiverValidado =
        mapReceiverModelToReceiverResponse({
          ...receiverValidadoCreated,
          ...editReceiverValidadoRequest,
        })
      await request(app)
        .patch(`/api/receivers/${receiverValidadoCreated.id}`)
        .send(editReceiverValidadoRequest)
        .expect(200)
        .then((response) => {
          const { body } = response
          expect(body).toEqual(expectedResponseEditReceiverValidado)
        })
    })

    test('Should return 404 on not found receiver', async () => {
      const editReceiverRascunhoRequest = mockEditReceiverRequestCPF()
      await request(app)
        .patch('/api/receivers/any_id')
        .send(editReceiverRascunhoRequest)
        .expect(404)
    })

    test('Should return 403 on try edit invalid field of receiver with status VALIDADO', async () => {
      const editReceiverRascunhoRequest = mockEditReceiverRequestCPF()
      const receiverValidadoCreated = mockReceiverValidadoCPF()
      await drizzleClient.insert(receivers).values([receiverValidadoCreated])

      await request(app)
        .patch(`/api/receivers/${receiverValidadoCreated.id}`)
        .send(editReceiverRascunhoRequest)
        .expect(403)
    })
  })
})
