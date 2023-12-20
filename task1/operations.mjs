import {bitScale} from "./bitScale.mjs";

function getUnion(first, second) {
    const firstScale = bitScale(first);
    const secondScale = bitScale(second);
    const set = [];

    for (let i = 0; i < Math.max(firstScale.length, secondScale.length); i++) {
        (firstScale[i] === 1 || secondScale[i] === 1)
            ? set.push(1)
            : set.push(0);
    }

    return (set);
}

const A1 = [1, 2, 4, 3, 7];
const A2 = [4, 6];
console.log(getUnion(A1, A2));

function getIntersection(first, second) {
    const firstScale = bitScale(first);
    const secondScale = bitScale(second);
    const set = [];

    for (let i = 0; i < Math.max(firstScale.length, secondScale.length); i++) {
        if (firstScale[i] === 1 && secondScale[i] === 1) set.push(1);
        else set.push(0);
    }

    return (set);
}

console.log(getIntersection(A1, A2));

function getComplement(complemented) {
    const scale = bitScale(complemented);
    return scale.map(el => Number(!el));
}

console.log(getComplement(A1));

function getDifference(first, second) {
    const firstScale = bitScale(first);
    const secondScale = bitScale(second);

    return firstScale
        .map((firstEl, i) => firstEl - secondScale[i] > 0 ? firstEl : 0);
}

console.log(getDifference(A1, A2));

// function generateSubsets(pow) {
//     if (pow < 0) return [];
//
//     const sets = [];
//     for (let i = 0; i < 2 ** pow; i++) {
//         let cur = i.toString(2);
//         sets.push("0".repeat(pow - cur.length) + cur);
//     }
//
//     return (sets);
// }
//
// console.log(generateSubsets(3))
//
// function generateGrayCode(pow) {
//     if (pow < 0) return [];
//
//     const grayCode = [];
//
//     for (let i = 0; i < 2 ** pow; i++) {
//         let cur = (i ^ (i >> 1)).toString(2);
//         grayCode.push('0'.repeat(pow - cur.length) + cur);
//     }
//
//     return grayCode;
// }
//
// console.log(generateGrayCode(3));