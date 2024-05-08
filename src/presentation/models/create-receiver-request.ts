export type CreateReceiverRequest = {
  pix_key_type: 'CPF' | 'CNPJ' | 'EMAIL' | 'TELEFONE' | 'CHAVE_ALEATORIA'
  pix_key: string
  email: string
  name: string
  register_id: string
}
