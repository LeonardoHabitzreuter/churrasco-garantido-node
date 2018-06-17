const _ = require('lodash')

const allStringCharactersAreEqual = string => _.uniq(string).length === 1

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
  
module.exports = {
  cnpjIsValid: cnpj => {
    if (!cnpj) return false
  
    if (cnpj.length !== 14) return false
  
    if (allStringCharactersAreEqual(cnpj)) return false
  
    return isValid(cnpj)
  }
} 

