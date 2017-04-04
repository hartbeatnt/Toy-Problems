/*
Write a function to ﬁnd the rectangular 
intersection of two given rectangles. The rectangles 
will always be "straight" and never "diagonal." More 
rigorously: each side is parallel with either the 
x-axis or the y-axis.

They are defined as hash maps like this:
myRectangle = {
    'x': 1,
    'y': 5,
    'width': 10,
    'height': 4,
    }
Your output rectangle should use this format as well.

Gotchas
What if there is no intersection?

What if one rectangle is entirely contained in the other? 

What if the rectangles don't really intersect but share 
an edge? 
*/
class Rectangle {
  // creates a rectangle with the NE
  // corner at [x,y]
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  getCorners() {
    return [
      [this.x, this.y],
      [this.x + this.width, this.y],
      [this.x, this.y + this.height],
      [this.x + this.width, this.y + this.height]
    ]
  }

  getEdges() {
    return {
      N: this.y,
      E: this.x,
      S: this.y + this.height,
      W: this.x + this.width
    }
  }

  containsPoint(tuple) {
    let x = tuple[0];
    let y = tuple[1];
    return ( x >= this.x
          && x <= this.x + this.width
          && y >= this.y 
          && y <= this.y + this.height
    )
  }

  static getIntersect(rec1, rec2) {
    let intersect = [];
    rec1.getCorners().forEach(corner=>{
      if (rec2.containsPoint(corner)) {
        intersect.push(corner)
      }
    })
    rec2.getCorners().forEach(corner=>{
      if (rec1.containsPoint(corner)) {
        intersect.push(corner)
      }
    })
    if (!intersect.length) return 'No Intersect'
    
    return intersect
  }
}

let rec1 = new Rectangle (0,0,2,3)
let rec2 = new Rectangle (1,1,2,3)

console.log(Rectangle.getIntersect(rec1,rec2))