function generateRandomGraph(verCount, edgeDensity) {
    if (edgeDensity < 0 || edgeDensity > 1) {
        throw ("Рёберная плотность неправильно задана");
    }
    let alreadyExist = 0;
    const graph = {};
    for (let i = 0; i < verCount; i++) {
        graph[i] = [];
    }

    const maxEdges = ((verCount * (verCount - 1)) / 2);
    const wantedEdges = maxEdges * edgeDensity;

    let addedEdges = 0;
    while (addedEdges < wantedEdges) {
        let vertex1 = Math.floor(Math.random() * verCount);
        let vertex2 = Math.floor(Math.random() * verCount);

        if (vertex1 !== vertex2 && !graph[vertex1].includes(vertex2)) {
            graph[vertex1].push(vertex2);
            graph[vertex2].push(vertex1);
            addedEdges += 1;
        } else alreadyExist += 1
    }

    console.log(alreadyExist)
    return graph;
}

console.log("Произвольный граф: ", generateRandomGraph(100, 0.5));
