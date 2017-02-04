/**
 Write a function that takes two equal-length 
 buffers and produces their XOR combination.

If your function works properly, then when you
feed it the string:
1c0111001f010100061a024b53535009181c

... after hex decoding, and when XOR'd against:
686974207468652062756c6c277320657965

... should produce:
746865206b696420646f6e277420706c6179
 */
let buffer1 = '1c0111001f010100061a024b53535009181c';
let buffer2 = '686974207468652062756c6c277320657965';
let xor = '746865206b696420646f6e277420706c6179';

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

const fixedXOR = (bin1, bin2) => {
  return bin1.split('').map((bit,i)=> bin1[i]===bin2[i] ? '0':'1').join('')
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

const assert = (expected, actual, description) => {
  return console.log(expected === actual ? 
    `passed: ${description}` :
    `failed: ${description}
     expected: ${expected}
     got: ${actual}`)
}

assert(xor, binaryToHex(fixedXOR(hexToBinary(buffer1),hexToBinary(buffer2))), 
  "should return the XOR combination of 2 fixed-length buffers")