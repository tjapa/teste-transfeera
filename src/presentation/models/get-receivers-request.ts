export type GetReceiversRequest =
  | {
      pix_key_type?: 'CPF' | 'CNPJ' | 'EMAIL' | 'TELEFONE' | 'CHAVE_ALEATORIA'
      pix_key?: string
      name?: string
      status?: 'RASCUNHO' | 'VALIDADO'
      offset?: number
    }
  | undefined
