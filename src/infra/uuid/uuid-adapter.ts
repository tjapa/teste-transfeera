import { IdGenerator } from '@/domain/protocols/id-generator'
import { v4 as uuidv4 } from 'uuid'

export class UuidAdapter implements IdGenerator {
  constructor() {}

  generate(): string {
    return uuidv4()
  }
}
