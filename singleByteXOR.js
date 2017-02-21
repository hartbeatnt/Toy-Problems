/**
The hex encoded string:
1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736

... has been XOR'd against a single character. Find the key, decrypt the message.

You can do this by hand. But don't: write code to do it for you.

How? Devise some method for "scoring" a piece of English plaintext. Character 
frequency is a good metric. Evaluate each output and choose the one with the best score.

Achievement Unlocked
You now have our permission to make "ETAOIN SHRDLU" jokes on Twitter.
 */

let input = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'
let output = 'Cooking MC\'s like a pound of bacon'

const hexToBinary = hex => {
  let bytes = [];
  for(let i=0; i < hex.length-1; i+=2) {
    // two hexadecimal values = one byte
    let hexByte = hex.substring(i, i+2);
    // convert hexadecimal to decimal
    let binByte = parseInt(hexByte, 16);
    // convert decimal to binary
    binByte = binByte.toString(2);
    // replace leading zeros removed by JS
    while (binByte.length < 8) binByte = '0'+binByte;
    bytes.push(binByte);
  }
  return bytes.join('')
}

const hexToString = hex => {
  let letters = [];
  for(let i=0; i < hex.length-1; i+=2) {
    // two hexadecimal values = one byte
    let hexByte = hex.substring(i, i+2);
    // convert hexadecimal to decimal
    let decByte = parseInt(hexByte, 16);
    // convert decimal to ascii
    let letter = String.fromCharCode(decByte)
    letters.push(letter)
  }
  return letters.join('')
}

const binaryToHex = bin => {
  let nibbles = []
  for (var i=0; i < bin.length-3; i+=4) {
    nibbles.push(bin.substring(i,i+4))
  }
  nibbles = nibbles.map(v=>parseInt(v,2))
  nibbles = nibbles.map(v=>v.toString(16))
  return nibbles.join('')
}

const stringToHex = str => str
  .split('')
  .map(char=>char.charCodeAt())
  .map(char=>char.toString(16))
  .join(' ')

const charCount = str => {
  let output = {};
  str.split('').forEach(char=>{
    output[char] ? output[char]++ : output[char] = 1;
  })
  return output;
}

const stringScore = str => {
  let commonEnglishLetters = 'etaoinshrdlcumwfgypbvkjxqz '.split('')
  let score = 0;
  let chars = charCount(str.toLowerCase());
  for (let char in chars) {
    commonEnglishLetters.includes(char) ?
      score += commonEnglishLetters.length-commonEnglishLetters.indexOf(char) :
      score -= 1 ;
  }
  return score;
}

const repeatCharToStringLength = (char, str) => {
  let result = '';
  while (result.length < str.length) result += char;
  return result
}

const fixedXOR = (bin1, bin2) => {
  return bin1.split('').map((bit,i)=> bin1[i]===bin2[i] ? '0':'1').join('')
}

const singleByteXORCipherDecode = hex => {
  return new Array(255).fill(0).map((v,i)=>i)
      .map(int=>String.fromCharCode(int))
      .map(char=>stringToHex(char))
      .map(char=>repeatCharToStringLength(char, hex))
      .map(hex=>hexToBinary(hex))
      .map(bin=>fixedXOR(bin, hexToBinary(hex)))
      .map(bin=>binaryToHex(bin))
      .map(hex=>hexToString(hex))
      .sort((a,b)=>stringScore(b)-stringScore(a))
}

const assert = (expected, actual, description) => {
  return console.log(expected === actual ? 
    `passed: ${description}` :
    `failed: ${description}
     expected: ${expected}
     got: ${actual}`)
}

assert(true, singleByteXORCipherDecode(input).includes(output), 'singleByteXORCipherDecode should return an array containing the decoded output')

assert(output, singleByteXORCipherDecode(input)[0], 'the decoded output should be at the top of the input array')