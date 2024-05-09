export interface Validator<T> {
  validate: (input: any) => T
}
