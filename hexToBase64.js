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
  for(var i=0; i< hex.length-1; i+=2){
    let hexByte = hex[i]+hex[i+1]
    let binByte = parseInt(hexByte, 16).toString(2)
    while (binByte.length < 8) binByte = '0'+binByte
    bytes.push(binByte);
  }
}

const binaryToBase64 = bin => {

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