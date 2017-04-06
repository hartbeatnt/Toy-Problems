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
    let temp = this;
    return str
      .split('')
      .every(char=>temp = temp[char]) && !!temp.leaf 
  }
  getLeavesFrom(node,str,results) {
    Object.keys(node).forEach(key=>{
      if (node[key].leaf) results.push(str+key)
      this.getLeavesFrom(node[key], str+key, results)
    })
    return results
  }
  getLeaves(){
    return this.getLeavesFrom(this,'',[])
  }
  getLeavesWithPrefix(str) {
    let temp = this;
    return str.split('').every(char=> temp = temp[char])
      ? this.getLeavesFrom(temp, str, [])
      : []
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
console.log(stringTrie.getLeavesWithPrefix('tea'))

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