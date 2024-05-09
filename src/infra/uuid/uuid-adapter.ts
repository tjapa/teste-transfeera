import { IdGenerator } from '@/use-cases/protocols/id-generator'
import { v4 as uuidv4 } from 'uuid'

export class UuidAdapter implements IdGenerator {
  constructor() {}

  generate(): string {
    return uuidv4()
  }
}
