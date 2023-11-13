import {Graph} from "./types";

interface connectedComponents {
    [key: string]: string[]
}

export var findSmallestConnectedComponent = (G: Graph) => {
    var size = Object.keys(G).length;
    var components: number[] = new Array(size).fill(0);
    var num = 0;

    for (let v in G) {
        if (!components[Number(v)]) dfs(v, ++num, G, components);
    }


    var smallestObj: connectedComponents  = {}
    for (let [key, value] of Object.entries(components)) {
        if (!smallestObj[value]) smallestObj[value] = [];
        smallestObj[value].push(key);
    }

    var min = 9;
    var smallestComponentVertices: string[] = [];
    for (const [_, value] of Object.entries(smallestObj)) {
        if (value.length < min) {
            min = value.length;
            smallestComponentVertices = value;
        }
    }

    var smallestComponentGraph: Graph = {};
    for (const vertex of smallestComponentVertices) {
        smallestComponentGraph[vertex] = G[vertex];
    }

    return smallestComponentGraph;
}

export var dfs = (v: string, num: number, G: Graph, components: number[]) => {
    components[Number(v)] = num;
    console.log("components", components)
    // console.log("graph", G)
    for (let [key, value] of Object?.entries(G[v])) {
        if (value === 1 && !components[Number(key)]) dfs(key, num, G, components)
    }
}