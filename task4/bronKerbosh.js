// const graph = [
//     [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
// ];
const graph = [[0,0,0,1,1,1,1,1,1,1,1,1],[0,0,0,1,1,1,1,1,1,1,1,1],[0,0,0,1,1,1,1,1,1,1,1,1],[1,1,1,0,0,0,1,1,1,1,1,1],[1,1,1,0,0,0,1,1,1,1,1,1],[1,1,1,0,0,0,1,1,1,1,1,1],[1,1,1,1,1,1,0,0,0,1,1,1],[1,1,1,1,1,1,0,0,0,1,1,1],[1,1,1,1,1,1,0,0,0,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,0],[1,1,1,1,1,1,1,1,1,0,0,0],[1,1,1,1,1,1,1,1,1,0,0,0]]

function getNeighbors(vertex) {
    const neighbors = [];
    for (let i = 0; i < graph[vertex].length; i++) {
        if (graph[vertex][i] === 1) {
            neighbors.push(i);
        }
    }

    return neighbors;
}

function bronKerboshMethod(currCLick, candidates, excluded) {
    if (candidates.length === 0 && excluded.length === 0) {
        console.log(currCLick);
        return;
    }

    for (const vertex of [...candidates]) {
        const rNew = [...currCLick, vertex];
        const pNew = candidates.filter(val => val !== vertex && getNeighbors(vertex).includes(val));
        const xNew = excluded.filter(val => val !== vertex && getNeighbors(vertex).includes(val));

        bronKerboshMethod(rNew, pNew, xNew);
        excluded.push(vertex);
    }
}

for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
        graph[i][j] = Number(!graph[i][j]);
    }
}

bronKerboshMethod([], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [])