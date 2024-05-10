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
})
