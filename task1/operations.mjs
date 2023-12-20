import {bitScale} from "./bitScale.mjs";

const X = [1, 22, 3, 41, 5, 7, 21];
const A = [1, 7, 3, 4, 6, 22];

function getUnion(grand_list, first_list, second_list) {
    const firstScale = bitScale(X, first_list);
    const secondScale = bitScale(X, second_list);
    const set = [];

    for (let i = 0; i < grand_list.length; i++) {
        if (firstScale[i] === 1 || secondScale[i] === 1) set.push(1);
        else set.push(0);
    }

    return(set);
}

const A1 = [41,3,23,44,5,100]
const A2 = [3,22,123,3123,5,1,0]
// console.log(getUnion(X, A1, A2));

function getIntersection(grand_list, first_list, second_list) {
    const firstScale = bitScale(grand_list, first_list)
    const secondScale = bitScale(grand_list, second_list)
    const set = [];

    for (let i = 0; i < grand_list.length; i++) {
        if (firstScale[i] === 1 && secondScale[i] === 1) set.push(1);
        else set.push(0);
    }

    return (set);
}

// console.log(getIntersection(X, A1, A2));

function getComplement(grand_list, complemented_list) {
    const scale = bitScale(X, complemented_list)
    return scale.map(el => Number(!el))
}

// console.log(getComplement(X, A1));

function getDifference(grand_list, first_list, second_list) {
    const firstScale = bitScale(X, first_list);
    const secondScale = bitScale(X, second_list);

    return firstScale
        .map((firstEl, i) => firstEl - secondScale[i] > 0 ? firstEl : 0);
}

// console.log(getDifference(X, A1, A2));

function generateSubsets(pow) {
    if (pow < 0) return [];

    const sets = [];
    for (let i = 0; i < 2**pow; i++) {
        let cur = i.toString(2);
        sets.push("0".repeat(pow - cur.length) + cur);
    }

    return (sets);
}

// console.log(generateSubsets(X.length))

function generateGrayCode(pow) {
    if (pow < 0) return [];

    const grayCode = [];

    for (let i = 0; i < 2**pow; i++) {
        let cur = (i ^ (i >> 1)).toString(2);
        grayCode.push('0'.repeat(pow - cur.length) + cur);
    }

    return grayCode;
}

// console.log(generateGrayCode(X.length));