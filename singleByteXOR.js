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

const charCount = str => {
  let output = {};
  str.split('').forEach(char=>{
    ouput[char] ? output[char]++ : output[char] = 0;
  })
  return output;
}