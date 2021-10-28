class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex, nodes = this.nodes) {
    for (const v of nodes) {
      if (v.adjacent.length > 0) {
        for (const a of v.adjacent) {
          if (a.value === vertex.value) {
            this.removeEdge(a, vertex);
          }
        }
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start, visited = new Set([start]), values = [start.value]) {
    for (const node of start.adjacent) {
      if (!visited.has(node)) {
        values.push(node.value);
        visited.add(node);
        this.depthFirstSearch(node, visited, values);
      }
    }
    return values;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const toVisitQueue = [start];
    const visited = new Set([start]);
    const values = [start.value];
    while (toVisitQueue.length) {
      let curNode = toVisitQueue.shift();
      for (let adj of curNode.adjacent) {
        if (!visited.has(adj)) {
          visited.add(adj);
          toVisitQueue.push(adj);
          values.push(adj.value);
        }
      }
    }
    return values;
  }
}

module.exports = { Graph, Node };
