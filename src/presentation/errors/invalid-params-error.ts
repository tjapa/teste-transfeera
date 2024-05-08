export class InvalidParamsError extends Error {
  constructor(paramsInfo: string) {
    super(`Invalid param: ${paramsInfo}`)
    this.name = 'InvalidParamError'
  }
}
