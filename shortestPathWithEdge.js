/*
You are given an undirected weighted graph, which is represented as 
an adjacency matrix. Find the shortest path between a start node and 
a finish node in the graph. You are allowed to add at most one edge 
of a given weight between any two nodes that are not directly 
connected to each other.

Example

For start = 1, finish = 4, weight = 2 and

   graph = [[0, 2, 0, 4, 0],
            [2, 0, 1, 0, 0], 
            [0, 1, 0, 3, 0], 
            [4, 0, 3, 0, 1], 
            [0, 0, 0, 1, 0]]

the output should be
shortestPathWithEdge(start, finish, weight, graph) = 3.

In the original graph, the shortest distance between nodes 1 and 4 is 
equal to 4. But you can add an edge of weight 2 between nodes 1 and 5, 
making the resulting distance 3.
*/

function shortestPathWithEdge(start, finish, weight, graph) {

}

let start = 1
let finish = 4
let weight = 2
let graph = [[0, 2, 0, 4, 0],
             [2, 0, 1, 0, 0], 
             [0, 1, 0, 3, 0], 
             [4, 0, 3, 0, 1], 
             [0, 0, 0, 1, 0]]
console.log(shortestPathWithEdge(start, finish, weight, graph) === 3)