import { disconnect, drizzleClient } from '@/infra/db/drizzle/dizzleClient'
import { ReceiverRepository } from '@/infra/db/drizzle/receiver-repository'
import { receivers } from '@/infra/db/drizzle/schemas'
import {
  mockReceiverRascunhoCNPJ,
  mockReceiverRascunhoCPF,
  mockReceiverValidadoCPF,
} from '@/tests/use-cases/mocks/mock-receiver'

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
      const receiver = mockReceiverRascunhoCPF()
      const receiverCreated = await sut.create(receiver)
      expect(receiverCreated).toEqual(receiver)
    })

    test('Should persists the receiver in db on create success', async () => {
      const sut = makeSut()
      const receiver = mockReceiverRascunhoCPF()
      await sut.create(receiver)
      const receiversInDb = await drizzleClient.query.receivers.findMany({
        columns: { createdAt: false, modifiedAt: false },
      })
      expect(receiversInDb).toHaveLength(1)
      expect(receiversInDb[0]).toEqual(receiver)
    })
  })

  describe('getReceivers()', () => {
    test('Should return a maximum of 10 receivers', async () => {
      const sut = makeSut()
      const receiversCreated = []
      for (let i = 0; i < 13; i++) {
        receiversCreated.push(mockReceiverRascunhoCPF())
      }
      await drizzleClient.insert(receivers).values(receiversCreated)

      const receiversGetted = await sut.getReceivers()
      expect(receiversGetted.length).toEqual(10)
      for (const [i, receiverGetted] of receiversGetted.entries()) {
        expect(receiverGetted).toEqual(receiversCreated[i])
      }

      const receiversGettedOffset = await sut.getReceivers({ offset: 10 })
      expect(receiversGettedOffset.length).toEqual(3)
      for (const [i, receiverGetted] of receiversGettedOffset.entries()) {
        expect(receiverGetted).toEqual(receiversCreated[i + 10])
      }
    })

    test('Should filter by status', async () => {
      const sut = makeSut()
      const receiversCreated = []
      const receiversValidados = []
      const receiversRascunho = []
      for (let i = 0; i < 10; i++) {
        let receiver
        if (i % 2 == 0) {
          receiver = mockReceiverRascunhoCPF()
          receiversRascunho.push(receiver)
        } else {
          receiver = mockReceiverValidadoCPF()
          receiversValidados.push(receiver)
        }
        receiversCreated.push(receiver)
      }
      await drizzleClient.insert(receivers).values(receiversCreated)

      const receiversValidadosGetted = await sut.getReceivers({
        status: 'VALIDADO',
      })
      expect(receiversValidadosGetted.length).toEqual(5)
      for (const [i, receiverGetted] of receiversValidadosGetted.entries()) {
        expect(receiverGetted).toEqual(receiversValidados[i])
      }

      const receiversRascunhoGetted = await sut.getReceivers({
        status: 'RASCUNHO',
      })
      expect(receiversRascunhoGetted.length).toEqual(5)
      for (const [i, receiverGetted] of receiversRascunhoGetted.entries()) {
        expect(receiverGetted).toEqual(receiversRascunho[i])
      }
    })

    test('Should filter by pix key type', async () => {
      const sut = makeSut()
      const receiversCreated = []
      const receiversCpf = []
      const receiversCnpj = []
      for (let i = 0; i < 10; i++) {
        let receiver
        if (i % 2 == 0) {
          receiver = mockReceiverRascunhoCNPJ()
          receiversCnpj.push(receiver)
        } else {
          receiver = mockReceiverRascunhoCPF()
          receiversCpf.push(receiver)
        }
        receiversCreated.push(receiver)
      }
      await drizzleClient.insert(receivers).values(receiversCreated)

      const receiversCpfGetted = await sut.getReceivers({
        pixKeyType: 'CPF',
      })
      expect(receiversCpfGetted.length).toEqual(5)
      for (const [i, receiverGetted] of receiversCpfGetted.entries()) {
        expect(receiverGetted).toEqual(receiversCpf[i])
      }

      const receiversCnpjGetted = await sut.getReceivers({
        pixKeyType: 'CNPJ',
      })
      expect(receiversCnpjGetted.length).toEqual(5)
      for (const [i, receiverGetted] of receiversCnpjGetted.entries()) {
        expect(receiverGetted).toEqual(receiversCnpj[i])
      }
    })

    test('Should filter by pix key', async () => {
      const sut = makeSut()
      const receiversCreated = []
      for (let i = 0; i < 10; i++) {
        receiversCreated.push(mockReceiverRascunhoCPF())
      }
      await drizzleClient.insert(receivers).values(receiversCreated)

      const receiversGetted = await sut.getReceivers({
        pixKey: receiversCreated[3].pixKey,
      })
      expect(receiversGetted[0].pixKey).toEqual(receiversCreated[3].pixKey)
    })

    test('Should filter by name', async () => {
      const sut = makeSut()
      const receiversCreated = []
      for (let i = 0; i < 10; i++) {
        receiversCreated.push(mockReceiverRascunhoCPF())
      }
      await drizzleClient.insert(receivers).values(receiversCreated)

      const receiversGetted = await sut.getReceivers({
        name: receiversCreated[3].name,
      })
      expect(receiversGetted[0].name).toEqual(receiversCreated[3].name)
    })
  })

  describe('delete()', () => {
    test('Should delete the receivers from db and return a list with deleted receivers', async () => {
      const sut = makeSut()
      const receiversCreated = []
      for (let i = 0; i < 10; i++) {
        receiversCreated.push(mockReceiverRascunhoCPF())
      }
      await drizzleClient.insert(receivers).values(receiversCreated)
      const receiversShouldDeleted = [
        receiversCreated[0].id,
        receiversCreated[5].id,
        receiversCreated[7].id,
      ]
      const receiversDeleted = await sut.delete(receiversShouldDeleted)
      const expectedResponse = receiversShouldDeleted.map((id) => ({
        deletedReceiverId: id,
      }))

      expect(receiversDeleted).toHaveLength(3)
      expect(receiversDeleted).toEqual(expect.arrayContaining(expectedResponse))

      const receiversInDb = await drizzleClient.query.receivers.findMany()
      expect(receiversInDb).toHaveLength(7)
    })

    test('Should delete nothing is empty array is provided', async () => {
      const sut = makeSut()
      const receiversCreated = []
      for (let i = 0; i < 10; i++) {
        receiversCreated.push(mockReceiverRascunhoCPF())
      }
      await drizzleClient.insert(receivers).values(receiversCreated)

      const receiversDeleted = await sut.delete([])
      expect(receiversDeleted).toHaveLength(0)
      expect(receiversDeleted).toEqual([])

      const receiversInDb = await drizzleClient.query.receivers.findMany()
      expect(receiversInDb).toHaveLength(10)
    })

    test('Should ignore non valid ids', async () => {
      const sut = makeSut()
      const receiversCreated = []
      for (let i = 0; i < 10; i++) {
        receiversCreated.push(mockReceiverRascunhoCPF())
      }
      await drizzleClient.insert(receivers).values(receiversCreated)
      const receiversShouldDeleted = ['invalidId']
      const receiversDeleted = await sut.delete(receiversShouldDeleted)
      expect(receiversDeleted).toHaveLength(0)
      expect(receiversDeleted).toEqual([])

      const receiversInDb = await drizzleClient.query.receivers.findMany()
      expect(receiversInDb).toHaveLength(10)
    })
  })
})
