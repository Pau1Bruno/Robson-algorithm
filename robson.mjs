import {
    createGraph,
    deleteVertex,
    get2Neighbors,
    getAB,
    getNeighbors,
    isConnected,
    powerGraph, sortVertexSet
} from "./helpers.mjs";
import {findSmallestConnectedComponent} from "./smallest_component.mjs";

const matrix = [
    [0, 0, 0, 1, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0]
];

var instructions = [];

var graph = createGraph(matrix);

var ms = (G) => {
    if (Object.keys(G).length && !isConnected(G)) {
        // INSTRUCTION 1
        instructions.push(1);

        var C = findSmallestConnectedComponent(G);
        for (const vertex of C) deleteVertex(G, vertex);

        return powerGraph(C) <= 2
            ? ms(G) + 1
            : ms(G) + ms(C);
    }

    if (powerGraph(G) <= 1) {
        // INSTRUCTION 2
        instructions.push(2);

        return powerGraph(G);
    }

    var [A, B, neigborsA] = getAB(G);

    const vertexSet2N = get2Neighbors(G, A.vertex);

    if (A.d === 1) {
        // INSTRUCTION 3
        instructions.push(3);

        for (const vertex of Object.keys(neigborsA)) {
            deleteVertex(G, vertex);
        }
        deleteVertex(G, A.vertex);

        return 1 + ms(G);
    }

    if (A.d === 2) {
        var B1 = Object.keys(neigborsA)[1];
        if (G[B.vertex][B1]) {
            // INSTRUCTION 4
            instructions.push(4);

            for (const vertex of Object.keys(neigborsA)) {
                deleteVertex(G, vertex);
            }

            deleteVertex(G, A.vertex);
            return 1 + ms(G);
        }

        var first = JSON.parse(JSON.stringify(G));
        for (const vertex of getNeighbors(first, B.vertex)) deleteVertex(first, vertex);
        deleteVertex(first, B.vertex);
        for (const vertex of getNeighbors(first, B1)) deleteVertex(first, vertex);
        deleteVertex(first, B1);

        var second = JSON.parse(JSON.stringify(G));
        for (const vertex of getNeighbors(second, A.vertex)) deleteVertex(second, vertex);
        deleteVertex(second, A.vertex);

        // INSTRUCTION 5
        instructions.push(5);
        return Math.max(
            2 + ms(first),
            1 + ms2(second, vertexSet2N)
        )
    }
}


function ms2(G, vertexSet) {
    sortVertexSet(G, vertexSet);

    if (vertexSet.length === 3) {
        if (G[vertexSet[0]].filter(el => el).length === 0) {
            // INSTRUCTION 20
            instructions.push(20);

            deleteVertex(G, vertexSet[0]);
            vertexSet.shift();
            return 1 + ms1(G, vertexSet);
        }
    }
    return 0;
}

function ms1(G, vertexSet) {
    sortVertexSet(G, vertexSet);
    if (G[vertexSet[0]].filter(el => el).length <= 1) {
        // INSTRUCTION 9
        instructions.push(9);
        return ms(G);
    }

    const intersection = getNeighbors(G, vertexSet[0]).filter(neighbor => getNeighbors(G, vertexSet[1]).includes(neighbor));
    if (intersection.length) {
        // INSTRUCTION 12
        instructions.push(12);

        for (const vertex of intersection) deleteVertex(G, vertex);

        return ms1(G, vertexSet)
    }
    return 0;
}

console.log(ms(graph))
console.log(instructions)