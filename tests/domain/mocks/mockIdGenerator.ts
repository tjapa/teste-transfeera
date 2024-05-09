import { IdGenerator } from '@/domain/protocols/id-generator'
import { faker } from '@faker-js/faker'

export const mockIdGenerator = (): IdGenerator => {
  class IdGeneneratorStub implements IdGenerator {
    generate(): string {
      return faker.string.uuid()
    }
  }
  return new IdGeneneratorStub()
}
