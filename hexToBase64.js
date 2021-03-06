/**
 Convert hex to base64

The string:
'49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d'

Should produce:
'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t'
 */

let hex = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d';
let base64 = 'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t'

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

const binaryToBase64 = bin => {
  let encodeTable =
    ['A','B','C','D','E','F','G','H','I','J','K','L','M',
     'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
     'a','b','c','d','e','f','g','h','i','j','k','l','m',
     'n','o','p','q','r','s','t','u','v','w','x','y','z',
     '0','1','2','3','4','5','6','7','8','9','+','/']
  // one base64 value contains six bits
  let sixBits = [];
  for(var i=0; i < bin.length-5; i+=6) {
    sixBits.push(bin.substring(i, i+6))
  }
  // convert six-bit binary values to decimal index
  sixBits = sixBits.map(v=>parseInt(v,2))
  // convert decimal index to base64 value
  return sixBits.map(v=>encodeTable[v]).join('')
}

const hexToBase64 = hex => binaryToBase64(hexToBinary(hex))

const assert = (expected, actual, description) => {
  return console.log(expected === actual ? 
    `passed: ${description}` :
    `failed: ${description}
     expected: ${expected}
     got: ${actual}`)
}

assert (base64, hexToBase64(hex), "should convert hex to base64")