export function bitScale(X) {
    const univ = [];
    let max = 0;
    for (let i = 0; i < X.length; i++) {
        if (max < X[i]) max = X[i];
    }

    for (let i = 1; i <= max; i++) {
        univ.push(i);
    }

    const scale = [];

    for (let i = 0; i < univ.length; i++) {
        (X.includes(univ[i]))
            ? scale.push(1)
            : scale.push(0);
    }

    return scale;
}

const X = [1, 22, 3, 41, 5, 7, 21];

console.log(bitScale(X));