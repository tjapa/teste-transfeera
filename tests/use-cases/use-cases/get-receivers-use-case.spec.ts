import {
  FiltersGetReceivers,
  GetReceiversUseCase,
} from '@/use-cases/protocols/get-receivers-use-case'
import { mockGetReceiversRepository } from '@/tests/repository/mocks/mock-get-receivers-repository'
import { GetReceivers } from '@/use-cases/use-cases/get-receivers-use-case'
import { mockReceiverRascunhoCPF } from '../mocks/mock-receiver'
import { GetReceiversRepository } from '@/repository/protocols/get-receivers-repository'

interface SutType {
  sut: GetReceiversUseCase
  getReceiversRepositoryStub: GetReceiversRepository
}

const makeSut = (): SutType => {
  const getReceiversRepositoryStub = mockGetReceiversRepository()
  const sut = new GetReceivers(getReceiversRepositoryStub)

  return {
    sut,
    getReceiversRepositoryStub,
  }
}

describe('Get Receivers Use Case', () => {
  describe('getReceivers()', () => {
    test('Should return the receivers found by repository', async () => {
      const { sut, getReceiversRepositoryStub } = makeSut()
      const correctParam: FiltersGetReceivers = {
        status: 'RASCUNHO',
        pixKey: 'any_pix_key',
        pixKeyType: 'CPF',
        name: 'any_name',
      }
      const mockReturnValueGetReceiversRepository = [
        mockReceiverRascunhoCPF(),
        mockReceiverRascunhoCPF(),
        mockReceiverRascunhoCPF(),
      ]
      jest
        .spyOn(getReceiversRepositoryStub, 'getReceivers')
        .mockReturnValueOnce(
          Promise.resolve(mockReturnValueGetReceiversRepository),
        )
      const receiversGetted = await sut.getReceivers(correctParam)
      expect(receiversGetted).toEqual(mockReturnValueGetReceiversRepository)
    })

    test('Should call GetReceiversRepository with correct param', async () => {
      const { sut, getReceiversRepositoryStub } = makeSut()
      const correctParam: FiltersGetReceivers = {
        status: 'RASCUNHO',
        pixKey: 'any_pix_key',
        pixKeyType: 'CPF',
        name: 'any_name',
      }
      const getReceiversSpy = jest.spyOn(
        getReceiversRepositoryStub,
        'getReceivers',
      )
      await sut.getReceivers(correctParam)
      expect(getReceiversSpy).toHaveBeenCalledWith(correctParam)
    })
  })
})
