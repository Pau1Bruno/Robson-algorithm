import {createGraph, deleteVertex, getAB, getNeighbors, isConnected, powerGraph} from "./helpers";
import {Graph} from "./types";
import {findSmallestConnectedComponent} from "./smallest_component";

const matrix: number[][] = [
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

var instructions: number[] = [];
var MIS: number[] = [];

var graph = createGraph(matrix);

var ms = (G: Graph): any => {

    if (!isConnected(G)) {
        console.log(Object.entries({}))
        console.log("not connected")
        var C = findSmallestConnectedComponent(G);
        console.log("C", C)
        for (const vertex in C) {
            delete G[vertex];
        }

        if (powerGraph(C) <= 2) {
            return ms(G) + 1;
        } else return ms(G) + ms(C);
    }

    if (powerGraph(G) <= 1) return powerGraph(G);

    var [A, B, neigborsA] = getAB(G);


    if (A.d === 1) {
        for (const vertex of Object.keys(neigborsA)) {
            deleteVertex(G, vertex);
        }
        deleteVertex(G, A.vertex);
        return 1 + ms(G);
    }

    if (A.d === 2) {
        var B1: string = Object.keys(neigborsA)[1];
        if (G[B.vertex][Number(B1)]) {
            for (const vertex of Object.keys(neigborsA)) {
                deleteVertex(G, vertex);
            }
            deleteVertex(G, A.vertex);
            return 1 + ms(G);
        }

        var first = {...G};
        for (const vertex of getNeighbors(first, B.vertex)) {
            deleteVertex(first, "0");
        }
        delete first[B.vertex];
        for (const vertex of getNeighbors(first, B1)) {
            delete first[vertex];
        }
        delete first[B1];
        console.log("first", first)
        var second = {...G};
        console.log(getNeighbors(second, A.vertex))
        for (const vertex of getNeighbors(second, A.vertex)) {
            delete second[vertex];
        }
        delete second[A.vertex];
        console.log("second", second)
        console.log("before return -------------------------------")
        return Math.max(
            2 + ms(first),
            // 1 + ms2(second, get2Neighbors(G, A.vertex))
        )
    }

    if (A.d === 3) {
        for (const vertex of Object.keys(neigborsA)) {
            delete G[vertex];
        }
        delete G[A.vertex];
        return 1 + ms(G);

        // return Math.max(
        //     ms2(),
        //     1 + ms()
        // )
    }
}
console.log(getNeighbors(graph, "8"))
// ms(graph)
// console.log(get2Neighbors(graph, "8"))

function ms2(G: Graph,) {
    return 0;
}


// const matrix2: number[][] = [
//     [0,0,0,1],
//     [0,0,0,1],
//     [0,0,0,0],
//     [1,1,0,0],
// ];
// const graph2 = createGraph(matrix2);
// ms(graph2)
