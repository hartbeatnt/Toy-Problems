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


const fixedXOR = (buffer1, buffer2) => {
  // decode buffer 1 hex to binary
  // decode buffer 2 hex to binary
  // xor buff1bin against buff2bin
  // encode the result in hexadecimal

}

const assert = (expected, actual, description) => {
  return console.log(expected === actual ? 
    `passed: ${description}` :
    `failed: ${description}
     expected: ${expected}
     got: ${actual}`)
}

assert(xor, fixedXOR(buffer1,buffer2), 
  "should return the XOR combination of 2 fixed-length buffers")