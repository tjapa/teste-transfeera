import request from 'supertest'
import app from '@/main/config/app'
import { disconnect, drizzleClient } from '@/infra/db/drizzle/dizzleClient'
import { receivers } from '@/infra/db/drizzle/schemas'
import {
  mockCreateReceiverRequestCPF,
  mockCreateReceiverRequestWrongCPF,
} from '@/tests/presentation/mocks/create-receiver-request-mocks'

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
      const createReceiverRequest = mockCreateReceiverRequestWrongCPF()
      await request(app)
        .post('/api/receivers')
        .send(createReceiverRequest)
        .expect(403)
    })
  })
})
