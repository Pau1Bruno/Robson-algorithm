function createSubgraph(graph, vertices) {
    const subgraph = {};

    for (const vertex of vertices) {
        if (vertex in graph) {
            subgraph[vertex] = graph[vertex].filter(neighbor => vertices.includes(neighbor));
        }
    }

    return subgraph;
}

// const graph = {'A': ['B', 'C', 'E'], 'B': ['A', 'C', 'D'], 'C': ['A', 'B', 'D', 'E'], 'D': ['B', 'C'], 'E': ['D']};
// const chosen = ['A', 'B', 'D', 'E'];
//
// const subgraph = createSubgraph(graph, chosen);
// console.log(subgraph);

function unionGraphs(graph1, graph2) {
    const unionGraph = {};

    for (const vertex in graph1) {
        unionGraph[vertex] = graph1[vertex];
    }

    for (const vertex in graph2) {
        if (vertex in unionGraph) {
            // Если вершина уже существует, добавляем рёбра к уже существующим
            graph2[vertex].forEach((neighbor) => unionGraph[vertex].includes(neighbor)
                ? 0
                : unionGraph[vertex].push(neighbor));
        } else {
            // Если вершина не существует, создаем новую вершину
            unionGraph[vertex] = graph2[vertex];
        }
    }

    return unionGraph;
}

// const graph1 = { 'A': ['B', 'C'], 'B': ['A', 'C'], 'C': ['A', 'B']};
// const graph2 = {'B': ['A', 'C', 'D'], 'D': ['E'], 'E': ['D'] };
//
// const resultGraph = unionGraphs(graph1, graph2);
// console.log(resultGraph);

function connectGraphs(graph1, graph2) {
    const connectedGraph = {};

    for (const vertex in graph1) {
        connectedGraph[vertex] = graph1[vertex];
    }

    for (const vertex in graph2) {
        if (!(vertex in connectedGraph)) {
            connectedGraph[vertex] = [];
        }
    }

    for (const vertex1 in graph1) {
        for (const vertex2 in graph2) {
            // Добавляем ребро между вершинами из разных графов
            if (!connectedGraph[vertex1].includes(vertex2)) {
                connectedGraph[vertex1].push(vertex2);
            }
            if (!connectedGraph[vertex2].includes(vertex1)) {
                connectedGraph[vertex2].push(vertex1);
            }
        }
    }

    return connectedGraph;
}

// const graph1 = {'A': ['B', 'C'], 'B': ['A'], 'C': ['A']};
// const graph2 = {'D': ['E'], 'E': ['D']};
//
// const resultConnectedGraph = connectGraphs(graph1, graph2);
// console.log(resultConnectedGraph);

function intersectGraphs(graph1, graph2) {
    const intersectedGraph = {};

    const commonVertices = Object.keys(graph1).filter(vertex => graph2.hasOwnProperty(vertex));

    for (const vertex of commonVertices) {
        intersectedGraph[vertex] = graph1[vertex].filter(neighbor => graph2[vertex].includes(neighbor));
    }

    return intersectedGraph;
}

// const graph1 = { 'A': ['B', 'C'], 'B': ['A', 'C', 'D'], 'C': ['A', 'B', 'D'], 'D': ['B', 'C'] };
// const graph2 = { 'C': ['D', 'E'], 'D': ['C'], 'E': ['C'] };
//
// const resultIntersectedGraph = intersectGraphs(graph1, graph2);
// console.log(resultIntersectedGraph);

function complementGraph(graph) {
    const complementedGraph = {};

    // Создаем новый граф с теми же вершинами
    for (const vertex in graph) {
        complementedGraph[vertex] = [];
    }

    // Для каждой вершины добавляем рёбра, которые отсутствуют в исходном графе
    for (const vertex in graph) {
        // Находим вершины, с которыми нет рёбер в исходном графе
        const nonNeighbors = Object.keys(graph).filter(v => v !== vertex && !graph[vertex].includes(v));

        // Добавляем рёбра в новый граф
        complementedGraph[vertex] = complementedGraph[vertex].concat(nonNeighbors);
    }

    return complementedGraph;
}

// const graph = { 'A': ['B'], 'B': ['A', 'C'], 'C': ['B'] };
//
// const resultComplementedGraph = complementGraph(graph);
// console.log(resultComplementedGraph);

function removeVertex(graph, vertex) {
    if (vertex in graph) {
        delete graph[vertex];

        for (const vertex in graph) {
            graph[vertex] = graph[vertex].filter(neighbor => neighbor !== vertex);
        }
    }
}

// const graph = {'A': ['B', 'C'], 'B': ['A', 'C'], 'C': ['A', 'B']};
// const remove = 'B';
// removeVertex(graph, remove);
// console.log(graph);

function depthFirstSearch(graph) {
    var visited = {};
    var components = [];

    function dfsRecursive(vertex) {
        var currentComponent = [];
        var stack = [vertex];

        while (stack.length > 0) {
            var currentVertex = stack.pop();

            if (!visited[currentVertex]) {
                visited[currentVertex] = true;
                currentComponent.push(currentVertex);

                // Добавляем соседние вершины в стек для обработки
                for (var i = 0; i < graph[currentVertex].length; i++) {
                    var neighbor = graph[currentVertex][i];
                    if (!visited[neighbor]) {
                        stack.push(neighbor);
                    }
                }
            }
        }

        return currentComponent;
    }

    for (var vertex in graph) {
        if (!visited[vertex]) {
            components.push(dfsRecursive(vertex));
        }
    }

    return components;
}

// var graph = {
//     'A': ['B', 'C'],
//     'B': ['A', 'D', 'E'],
//     'C': ['A'],
//     'D': ['B'],
//     'E': ['B'],
//     'F': [],
//     'G': []
// };
//
// console.log(depthFirstSearch(graph));
