/*
implement a trie.
*/

class Trie {
  constructor(strings) {
    let temp;
    strings.forEach(str=>{
      this.addLeaf(str)
    })
  }
  addLeaf(str) {
    let temp = this;
    str.split('').forEach((char, i)=>{
      if (!temp[char]) temp[char] = {};
      if (i === str.length - 1) temp[char].leaf = true
      temp = temp[char]
    })
  }
  hasLeaf(str) {
    return !!this.containsString(this, str).leaf
  }
  getLeaves(prefix) {
    if (!prefix) prefix = '';
    return this.getLeavesFrom(this.containsString(this, prefix), prefix, [])
  }
  // utility helpers:
  getLeavesFrom(node,str,results) {
    Object.keys(node).forEach(key=>{
      if (node[key].leaf) results.push(str+key)
      this.getLeavesFrom(node[key], str+key, results)
    })
    return results
  }
  containsString(node, str) {
    let temp = node;
    return str.split('').every(char => temp = temp[char])
      ? temp
      : false
  }
}



const strings = ['test','taste','taster','tester','on','one','only']
let stringTrie = new Trie(strings)
console.log(JSON.stringify(stringTrie))
console.log(stringTrie.getLeaves())
stringTrie.addLeaf('YO MAMA')
console.log(stringTrie.getLeaves())
console.log(stringTrie.hasLeaf('test'))
console.log(stringTrie.hasLeaf('tes'))
console.log(stringTrie.getLeaves('t'))
console.log(stringTrie.getLeaves('tx'))

/*{
  "t":{
    "e":{
      "s":{
        "t":{
          "leaf":true,
          "e":{
            "r":{
              "leaf":true
    }}}}},
    "a":{
      "s":{
        "t":{
          "e":{
            "leaf":true,
            "r":{
              "leaf":true
  }}}}}},
  "o":{
    "n":{
      "leaf":true,
      "e":{
        "leaf":true
      },
      "l":{
        "y":{
          "leaf":true
  }}}}}​​​​​
*/