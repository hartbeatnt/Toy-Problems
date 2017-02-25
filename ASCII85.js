/*
https://www.codewars.com/kata/5277dc3ff4bfbd9a36000c1c/train/javascript

ASCII85 is a binary-to-ASCII encoding scheme that's used within PDF and Postscript, 
and which provides data-size savings over base 64. Your task is to extend the String 
object with two new methods, toAscii85 and fromAscii85, which handle encoding and 
decoding ASCII85 strings.

The toAscii85 method should take no arguments and must encode the value of the string 
to ASCII85, without any line breaks or other whitespace added to the native 
ASCII85-encoded value.

Example:

'easy'.toAscii85() should return <~ARTY*~>
'moderate'.toAscii85() should return <~D/WrrEaa'$~>
'somewhat difficult'.toAscii85() should return <~F)Po,GA(E,+Co1uAnbatCif~>
The fromAscii85 method should take no arguments and must decode the value of the string 
(which is presumed to be ASCII85-encoded text).

Example:

'<~ARTY*~>'.fromAscii85() should return easy
'<~D/WrrEaa\'$~>'.fromAscii85() should return moderate
'<~F)Po,GA(E,+Co1uAnbatCif~>'.fromAscii85() should return somewhat difficult

You can learn all about ASCII85 here -- https://en.wikipedia.org/wiki/Ascii85. And remember, 
this is a binary-to-ASCII encoding scheme, so the input isn't necessarily always a readable 
string! A brief summary of the salient points, however, is as follows:

In general, four binary bytes are encoded into five ASCII85 characters.
The character set that ASCII85 encodes into is the 85 characters between ASCII 33 (!) 
and ASCII 117 (u), as well as ASCII 122 (z), which is used for data compression (see below).
In order to encode, four binary bytes are taken together as a single 32-bit number (you can 
envision concatenating their binary representations, which creates a 32-bit binary number). 
You then serially perform division by 85, and add 33 to the remainder of each division to 
get the ASCII character value for the encoded value; the first division and addition of 33 
is the rightmost character in the encoded five-character block, etc. (This is all represented
well is the visualization in the Wikipedia page's example.)

If the last block to be encoded contains less than four bytes, it's padded with nulls to a 
total length of four bytes, and then after encoding, the same number of characters are 
removed as were added in the padding step.

If a block to be encoded contains all nulls, then that block is encoded as a simple z 
(ASCII 122) rather than the fully-encoded value of !!!!!.

The final encoded value is surrounded by <~ at the start and ~> at the end. In the wild, 
whitespace can be inserted as needed (e.g., line breaks for mail transport agents); in 
this kata, whitespace shouldn't be added to the final encoded value for the sake of checking 
the fidelity of the encoding.

Decoding applies the above in reverse; each block of five encoded characters is taken as its 
ASCII character codes, multiplied by powers of 85 according to the position in the block of five 
characters (again, see the Wikipedia example visualization), and then broken into four separate 
bytes to determine the corresponding binary values.

If a block to be decoded contains less than five characters, it is padded with u characters 
(ASCII 117), decoded appropriately, and then the same number of characters are removed from 
the end of the decoded block as us were added.

All whitespace in encoded values is ignored (as in, it's removed from the encoded data before 
the data is broken up into the five-character blocks to be decoded).

To make your testing easier, two functions are preloaded for your use if you wish:

generateRandomReadableStrings(num, len): 
  generates an array of num strings of length len containing only readable ASCII characters
generateRandomBinaryData(num, len): 
  generates an array of num strings of length len containing binary data (ASCII code 0—255)

*/

String.prototype.toAscii85 = function() {
  let result = ''
  let blocks = [];
  let int;
  let padding = 0;
  let bin = this
    .split('')
    .map(char=>char.charCodeAt())
    .map(char=>char.toString(2))
    .map(byte=>{
      while(byte.length<8) byte = '0'.concat(byte)
      return byte
    })
    .join('')
  for (let i = 0; i < bin.length; i+=32) {
    blocks.push(bin.substring(i,i+32))
  }
  blocks.reverse().forEach(block=>{
    while(block.length < 32) {
      block = block+'0'
      padding++
    }
    int = parseInt(block, 2)
    // if (int === 0) result = '!!!!!'+result
    while (int > 85) {
      result = String.fromCharCode(int % 85 + 33)+result
      int /= 85
    }
    result = String.fromCharCode(Math.floor(int)+33)+result
    while(block.startsWith('00000000')) {
      block=block.slice(8);
      result = "!"+result
    }
    result = result.replace(/!!!!!/g,'z')
  })
  if (padding) result = result.slice(0, -Math.ceil(padding/8))
  return '<~'+result+'~>'
}

String.prototype.fromAscii85 = function() {
  let ascii85 = this.slice(2,-2).replace(/\s/g,'')
  let blocks = [];
  let padding = 0
  while (ascii85.length % 5) {
    ascii85+="u"
    padding++
  }
  for (var i = 0; i <= ascii85.length-5; i += 5) {
    blocks.push(
      ascii85.substring(i, i+5)
      .split('')
      .reverse()
      .map(char=>char.charCodeAt())
      .map((num, i)=>(num-33)*Math.pow(85,i))
      .reduce((a,b)=>a+b)
      .toString(2)
    )
  }
  blocks = blocks.map((byte,i)=>{
    let temp = []
    while (byte.length < 32) {
      byte = '0'+byte
    }
    blocks[i] = byte;
    for(let i = 0; i < byte.length; i+=8) {
      temp.push(byte.substring(i,i+8))
    }
    return temp
      .map(byte=>parseInt(byte,2))
      .map(num=>String.fromCharCode(num))
      .join('');
  })
  return padding? 
    blocks.join('').slice(0,-padding) : 
    blocks.join('')
}
