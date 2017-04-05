/*
write a function that takes an array of strings and stores them to a trie.
*/

const strings = [
  'test',
  'taste',
  'taster',
  'tester',
  'on',
  'one',
  'only'
]

const saveToTrie = stringArray => {
  let trie = {};
  let temp;
  stringArray.forEach(str=>{
    temp = trie;
    str.split('').forEach((char, i)=>{
      if (!temp[char]) temp[char] = {};
      if (i === str.length - 1) temp[char].leaf = true
      temp = temp[char]
    })
  })
  return trie;
}

let stringTrie = saveToTrie(strings)
console.log(JSON.stringify(stringTrie))

const getLeavesFromTrie = trie => {
  let leaves = [];
  let recurse = (node,str) => {
    Object.keys(node).forEach(key=>{
      if (node[key].leaf) leaves.push(str+key)
      recurse(node[key], str+key)
    })
  }
  recurse(trie, '')
  return leaves
}

console.log(getLeavesFromTrie(stringTrie))

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