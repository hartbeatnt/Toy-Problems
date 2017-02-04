const stringToHex = str => str
  .split('')
  .map(char=>char.charCodeAt())
  .map(char=>char.toString(16))
  .join(' ')

stringToHex('hello')