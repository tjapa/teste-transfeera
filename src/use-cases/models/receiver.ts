export type ReceiverModel = {
  id: string
  pixKeyType: 'CPF' | 'CNPJ' | 'EMAIL' | 'TELEFONE' | 'CHAVE_ALEATORIA'
  pixKey: string
  email: string
  name: string
  registerId: string
  status: 'RASCUNHO' | 'VALIDADO'
}

export enum ReceiverStatus {
  RASCUNHO = 'RASCUNHO',
  VALIDADO = 'VALIDADO',
}
