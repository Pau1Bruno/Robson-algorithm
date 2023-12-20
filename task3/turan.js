function generateTuranGraph(verCount, partitions) {
    // if (verCount === 3 && partitions === 3)
    let verPerPart1, verPerPart2;

    if (verCount % partitions === 0) {
        verPerPart1 = verPerPart2 = verCount / partitions;
    } else {
        verPerPart1 = Math.floor(verCount / partitions) + 1;
        verPerPart2 = Math.floor(verCount / partitions);
    }

    const rem1 = verCount % partitions;
    const rem2 = partitions - rem1;

    const partitionSizes = Array(rem1).fill(verPerPart1).concat(Array(rem2).fill(verPerPart2));
    console.log(partitionSizes)

    const graph = {};

    for (let vertex = 1; vertex <= verCount; vertex++) {
        graph[vertex] = new Set();
    }

    let cumulative1 = 0;
    let cumulative2 = 0;

    for (const partitionSize of partitionSizes) {
        cumulative1 += partitionSize;

        for (let v1 = cumulative2 + 1; v1 <= partitionSize + cumulative2; v1++) {
            for (let v2 = cumulative1 + 1; v2 <= verCount; v2++) {
                graph[v1].add(v2);
                graph[v2].add(v1);
            }
        }

        cumulative2 += partitionSize;
    }

    return graph;
}

const totalVertices = 3; // общее количество вершин
const partitionsCount = 1; // количество долей
const turanGraph = generateTuranGraph(totalVertices, partitionsCount);
console.log("Граф Турана:");
console.log(turanGraph);