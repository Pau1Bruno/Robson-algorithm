export function bitScale(grand_list, small_list) {
    const scale = [];

    for (let i = 0; i < grand_list.length; i++) {
        if (small_list.includes(grand_list[i])) scale.push(1);
        else
            scale.push(0)
    }

    return scale;
}

const X = [1, 22, 3, 41, 5, 7, 21]
const A = [1, 7, 3, 4, 6, 22]

// console.log(bitScal(X, A));