module.exports = (begin, end) => {
    return [...Array(end - begin + 1).keys()].map(v => v + begin);
};
