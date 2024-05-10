export class InvalidReceiverEditDataFieldsError extends Error {
  constructor(invalidFields: string[]) {
    super(`Invalid receiver edit data fields: ${invalidFields.join(', ')}`)
    this.name = 'InvalidReceiverEditDataFieldsError'
  }
}
