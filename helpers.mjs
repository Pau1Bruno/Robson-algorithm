import {findSmallestConnectedComponent} from "./smallest_component.mjs";

export var createGraph = (matrix) => {
    var graph = {}
    for (let key in matrix) {
        graph[key] = matrix[key];
    }

    return graph;
}

export var powerGraph = (G) => {
    return Object.keys(G).length;
}

export var isConnected = (G) => {
   return findSmallestConnectedComponent(G).length === Object.keys(G).length;
}

export var getNeighbors = (G, vertex) => {
    return G[vertex].map((_, index) => _
        ? index
        : 0
    ).filter(_ => _ !== 0);
}

export var get2Neighbors = (G, vertex) => {
    var neigboirs = getNeighbors(G, vertex);

    var neigboirs2 = [];
    for (const vertex of neigboirs) {
        neigboirs2.push(...G[vertex].map((_, index) => _
            ? String(index)
            : 0
        ).filter(_ => _))
    }
    neigboirs2 = new Array(...new Set(neigboirs2))
        .filter(el => el !== vertex);

    return neigboirs2;
}

export var getAB = (G) => {
    var dObj = {};
    for (let vertex in G) {
        dObj[vertex] = (G[vertex].filter(el => el).length);
    }

    var dA = 10;
    var A = "0";
    for (let vertex in dObj) {
        if (dA >= dObj[vertex]) {
            dA = dObj[vertex];
            A = vertex;
        }
    }

    var neighbors = {}
    for (let i = 0; i < G[A].length; i++) {
        if (G[A][i]) neighbors[i] = G[i].filter(el => el).length;
    }

    var B = "0";
    var dB = 0;
    for (let neighbor in neighbors) {
        if (neighbors[neighbor] > dB) {
            B = neighbor;
            dB = neighbors[neighbor];
        }
    }

    return [{vertex: A, d: dA}, {vertex: B, d: dB}, neighbors];
}

export function deleteVertex(G, vertex) {
    for (const i_vertex of Object.keys(G)) {
        G[i_vertex][vertex] = 0;
    }
    delete G[vertex];

    return G;
}

export function sortVertexSet(G, vertexSet) {
    vertexSet.sort((a,b) => {
        return G[a].filter(el => el).length - G[b].filter(el => el).length;
    })
}