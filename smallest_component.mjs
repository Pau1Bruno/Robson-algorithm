export var findSmallestConnectedComponent = (G) => {
    const vertices = new Set (Object.keys(G));
    const allConnectedComponents = [];

    for (let vertex of vertices) {
        const connectedComponent = [];

        if (vertices.has(vertex)) dfs(vertex, G, connectedComponent, vertices);
        allConnectedComponents.push(connectedComponent);
    }

    return allConnectedComponents.sort((a,b) => a.length - b.length)[0];
}

export var dfs = (vertex, G, component, vertices) => {
    if (component.includes(vertex)) return;
    component.push(vertex);
    vertices.delete(vertex);

    G[vertex].forEach((value, index) => {
        if (value === 1) dfs(String(index), G, component, vertices);
    })
}