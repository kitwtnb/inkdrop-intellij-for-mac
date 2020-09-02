module.exports.execute = (cmc) => {
    const commentString = "// ";
    const [beginLineNo, endLineNo] = cmc.selectedLineNumbers();
    const lines = cmc.getValues();
    if (lines.slice(beginLineNo, endLineNo + 1).some(line => !line.match(/^\s*\/\//))) {
        for (let lineNo = beginLineNo; lineNo <= endLineNo; lineNo++) {
            cmc.setLine(lineNo, commentString + lines[lineNo]);
        }
    } else {
        for (let lineNo = beginLineNo; lineNo <= endLineNo; lineNo++) {
            cmc.setLine(lineNo, lines[lineNo].slice(commentString.length));
        }
    }
};
