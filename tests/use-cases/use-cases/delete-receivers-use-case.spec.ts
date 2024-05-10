import {
  DeleteReceiversUseCase,
  DeleteReceiversUseCaseResponse,
} from '@/use-cases/protocols/delete-receivers-use-case'
import { mockDeleteReceiversRepository } from '@/tests/repository/mocks/mock-delete-receivers-repository'
import { DeleteReceivers } from '@/use-cases/use-cases/delete-receivers-use-case'
import {
  mockReceiverRascunhoCNPJ,
  mockReceiverRascunhoCPF,
  mockReceiverValidadoCPF,
} from '../mocks/mock-receiver'
import { DeleteReceiversRepository } from '@/repository/protocols/delete-receivers-repository'

interface SutType {
  sut: DeleteReceiversUseCase
  deleteReceiversRepositoryStub: DeleteReceiversRepository
}

const makeSut = (): SutType => {
  const deleteReceiversRepositoryStub = mockDeleteReceiversRepository()
  const sut = new DeleteReceivers(deleteReceiversRepositoryStub)

  return {
    sut,
    deleteReceiversRepositoryStub,
  }
}

describe('Delete Receivers Use Case', () => {
  describe('delete()', () => {
    test('Should return the deleteReceiversId and notFoundReceiversId found by repository', async () => {
      const { sut, deleteReceiversRepositoryStub } = makeSut()

      const receivers = [mockReceiverRascunhoCPF(), mockReceiverRascunhoCPF()]
      const shouldBeDeletedReceiversId = [
        receivers[0].id,
        receivers[1].id,
        'invalid_id1',
        'invalid_id2',
      ]

      const mockReturnValueDeleteReceiversRepository = [
        { deletedReceiverId: receivers[1].id },
        { deletedReceiverId: receivers[0].id },
      ]
      jest
        .spyOn(deleteReceiversRepositoryStub, 'delete')
        .mockReturnValueOnce(
          Promise.resolve(mockReturnValueDeleteReceiversRepository),
        )

      const receiversDeletedResponse = await sut.deleteReceivers(
        shouldBeDeletedReceiversId,
      )

      const expectedReturn: DeleteReceiversUseCaseResponse = {
        deletedReceiverIds: [receivers[0].id, receivers[1].id],
        notFoundReceiverIds: ['invalid_id1', 'invalid_id2'],
      }

      expect(receiversDeletedResponse.deletedReceiverIds).toHaveLength(2)
      expect(receiversDeletedResponse.deletedReceiverIds).toEqual(
        expect.arrayContaining(expectedReturn.deletedReceiverIds),
      )
      expect(receiversDeletedResponse.notFoundReceiverIds).toHaveLength(2)
      expect(receiversDeletedResponse.notFoundReceiverIds).toEqual(
        expect.arrayContaining(expectedReturn.notFoundReceiverIds),
      )
    })

    test('Should call DeleteReceiversRepository with correct param', async () => {
      const { sut, deleteReceiversRepositoryStub } = makeSut()
      const correctParam = [
        mockReceiverRascunhoCPF().id,
        mockReceiverRascunhoCNPJ().id,
        mockReceiverValidadoCPF().id,
      ]
      const deleteReceiversSpy = jest.spyOn(
        deleteReceiversRepositoryStub,
        'delete',
      )
      await sut.deleteReceivers(correctParam)
      expect(deleteReceiversSpy).toHaveBeenCalledWith(correctParam)
    })
  })
})
