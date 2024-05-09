export type ReceiverModel = {
  id: string
  pixKeyType: PixKeyType
  pixKey: string
  email: string
  name: string
  registerId: string
  status: ReceiverStatus
}

export type PixKeyType =
  | 'CPF'
  | 'CNPJ'
  | 'EMAIL'
  | 'TELEFONE'
  | 'CHAVE_ALEATORIA'

export type ReceiverStatus = 'RASCUNHO' | 'VALIDADO'
