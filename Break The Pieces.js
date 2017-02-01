/**
 from https://www.codewars.com/kata/527fde8d24b9309d9b000c4e/train/javascript

 You are given a ASCII diagram , comprised of minus signs -, plus signs +, 
 vertical bars | and whitespaces . Your task is to write a function which 
 breaks the diagram in the minimal pieces it is made of.

For example, if the input for your function is this diagram:
      +------------+
      |            |
      |            |
      |            |
      +------+-----+
      |      |     |
      |      |     |
      +------+-----+
the returned value should be the list of:
      +------------+
      |            |
      |            |
      |            |
      +------------+
(note how it lost a + sign in the extraction)
as well as
      +------+
      |      |
      |      |
      +------+
and
      +-----+
      |     |
      |     |
      +-----+
The diagram is given as an ordinary Javascript multiline string. 
The pieces should not have trailing spaces at the end of the lines. 
However, it could have leading spaces if the figure is not a rectangle. 
For instance:
          +---+
          |   |
      +---+   |
      |       |
      +-------+
However, it is not allowed to use more leading spaces than necessary. 
It is to say, the first character of some of the lines should be different 
than a space.

Finally, note that only the explicitly closed pieces are considered. Spaces 
"outside" of the shape are part of the background . Therefore the diagram 
above has a single piece.

EXAMPLE TEST:

var shape = 
 ["+------------+",
  "|            |",
  "|            |",
  "|            |",
  "+------+-----+",
  "|      |     |",
  "|      |     |",
  "+------+-----+"].join("\n");

var solution = [
  ["+------------+",
   "|            |",
   "|            |",
   "|            |",
   "+------------+"].join("\n"),
  ["+------+",
   "|      |",
   "|      |",
   "+------+"].join("\n"),
  ["+-----+",
   "|     |",
   "|     |",
   "+-----+"].join("\n")
];

Test.assertSimilar(solution.sort(), breakPieces(shape).sort());
 */

