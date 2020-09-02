module.exports = (a, b) => {
    const result = [];
    const length = Math.min(a.length, b.length);
    for (let i = 0; i < length; i++) {
        result.push([a[i], b[i]]);
    }

    return result;
};
