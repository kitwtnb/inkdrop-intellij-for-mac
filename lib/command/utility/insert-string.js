module.exports = (original, index, str) => {
    return original.slice(0, index) + str + original.slice(index, original.length);
}
