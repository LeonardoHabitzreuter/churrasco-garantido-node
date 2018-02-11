import { uniq } from 'lodash'

const cutcnpjMask = cnpj => cnpj.replace(/[^\d]+/g,'')

const allStringCharactersAreEqual = string => uniq(string).length === 1

export default cnpj => {
  if (!cnpj) return false

  const cnpjWithoutMask = cutcnpjMask(cnpj)

  if (cnpjWithoutMask === '') return false

  if (cnpjWithoutMask.length !== 14) return false

  if (allStringCharactersAreEqual(cnpjWithoutMask)) return false

  return isValid(cnpjWithoutMask)
}

const isValid = cnpj => {
  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho)
  let digitos = cnpj.substring(tamanho)
  let soma = 0
  let pos = tamanho - 7

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado != digitos.charAt(0)) return false

  tamanho = tamanho + 1
  numeros = cnpj.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  return !(resultado != digitos.charAt(1))
}
