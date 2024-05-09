import { disconnect, drizzleClient } from '@/infra/db/drizzle/dizzleClient'
import { ReceiverRepository } from '@/infra/db/drizzle/receiver-repository'
import { receivers } from '@/infra/db/drizzle/schemas'
import { mockReceiver } from '@/tests/domain/mocks/mock-receiver'

describe('Receiver Repository', () => {
  afterAll(async () => {
    await disconnect()
  })

  beforeEach(async () => {
    await drizzleClient.delete(receivers)
  })

  const makeSut = (): ReceiverRepository => {
    return new ReceiverRepository()
  }

  describe('create()', () => {
    test('Should return an receiver on create success', async () => {
      const sut = makeSut()
      const receiver = mockReceiver()
      const receiverCreated = await sut.create(receiver)
      expect(receiverCreated).toEqual(receiver)
    })

    test('Should persists the receiver in db on create success', async () => {
      const sut = makeSut()
      const receiver = mockReceiver()
      await sut.create(receiver)
      const receiversInDb = await drizzleClient.query.receivers.findMany()
      expect(receiversInDb.length).toBe(1)
      expect(receiversInDb[0]).toEqual(receiver)
    })
  })
})
