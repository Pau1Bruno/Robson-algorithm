const graph = [
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
];

function bronKerboschMax(graph) {
    const cliques = [];

    function isConnectedToAll(candidates, excluded) {
        for (const e of excluded) {
            let isConnected = false;
            for (const c of candidates) {
                if (graph[e][c]) {
                    isConnected = true;
                    break;
                }
            }
            if (!isConnected) return false;
        }
        return true;
    }

    function exploreClique(sub, candidates, excluded) {
        while (candidates.length > 0 && isConnectedToAll(candidates, excluded)) {
            const v = candidates[0];
            sub.push(v);

            const newCandidates = candidates.filter((i) => !graph[i][v] && i !== v);
            const newExcluded = excluded.filter((i) => !graph[i][v] && i !== v);

            if (newCandidates.length === 0 && newExcluded.length === 0) {
                cliques.push([...sub]);
            } else {
                exploreClique(sub, newCandidates, newExcluded);
            }

            candidates.shift();
            sub.pop();
            excluded.push(v);
        }
    }

    const candidates = Array.from({ length: graph.length }, (_, i) => i);
    exploreClique([], candidates, []);

    return cliques;
}

for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph.length; j++) {
        graph[i][j] = Number(!graph[i][j])
    }
}

console.log(bronKerboschMax(graph));