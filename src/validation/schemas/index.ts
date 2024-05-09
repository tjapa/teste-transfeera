import { Type } from '@sinclair/typebox'

export const cpfSchema = Type.RegExp(
  /^[0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2}$/,
)

export const cnpjSchema = Type.RegExp(
  /^[0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2}$/,
)

export const emailPixKeySchema = Type.RegExp(/^[a-z0-9+_.-]+@[a-z0-9.-]+$/)

export const emailSchema = Type.RegExp(/^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/)

export const telefoneSchema = Type.RegExp(
  /^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/,
  { maxLength: 250 },
)

export const chaveAleatoriaSchema = Type.RegExp(
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
)
