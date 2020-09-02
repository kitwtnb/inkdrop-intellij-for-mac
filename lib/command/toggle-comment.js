const range = require("./utility/range");
const zip = require("./utility/zip");

module.exports.execute = (cmc) => {
    const commentString = "// ";
    const [begin, end] = cmc.selectedLineNumbers();
    const indexes = range(begin, end);
    const lines = indexes.map(n => cmc.getLine(n));

    const isComment = lines.some(line => !line.match(/^\s*\/\//))
    zip(indexes, lines).forEach(tuple => {
        const [index, line] = tuple;
        let newLine;
        if (isComment) {
            newLine = commentString + line
        } else {
            newLine = line.slice(commentString.length);
        }
        cmc.setLine(index, newLine);
    });
};
