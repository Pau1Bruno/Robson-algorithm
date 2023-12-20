import {dVerticesObject, Graph} from "./types";
import {dfs} from "./smallest_component";

export var createGraph = (matrix: number[][]): Graph => {
    var graph: Graph = {}
    for (let key in matrix) {
        graph[key] = matrix[key];
    }

    return graph;
}

export var powerGraph = (G: Graph): number => {
    return Object.keys(G).length;
}
export var isConnected = (G: Graph): boolean => {
    var size = Object.keys(G).length
    var components: number[] = new Array(size).fill(0);
    var num = 0;

    for (let v in G) {
        if (!components[Number(v)]) dfs(v, ++num, G, components);
    }

    return num <= 1;
}

export var getNeighbors = (G: Graph, vertex: string): any[] => {
    return G[vertex].map((_, index) => _
        ? String(index)
        : 0
    ).filter(_ => _ !== 0);
}

export var get2Neighbors = (G: Graph, vertex: string): any[] => {
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

export var getAB = (G: Graph) => {
    var dObj: dVerticesObject = {};
    for (let vertex in G) {
        dObj[vertex] = (G[vertex].filter(el => el).length);
    }

    var dA = 10;
    var A: string = "0";
    for (let vertex in dObj) {
        if (dA >= dObj[vertex]) {
            dA = dObj[vertex];
            A = vertex;
        }
    }

    var neighbors: any = {}
    for (let i = 0; i < G[A].length; i++) {
        var row = G[A];
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

export function deleteVertex(G: Graph, vertex: string) {
    console.log(G);

    delete G[vertex];
    for (let i = 0; i < Object.keys(G).length; i++) {
        G[i][Number(vertex)] = 0;
    }
    console.log(G);

    return G;
}

// function sortByEdges() {
//
// }