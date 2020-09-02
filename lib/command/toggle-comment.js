module.exports.execute = (cmc) => {
    const commentString = "// ";
    if (cmc.somethingSelected()) {
        const [beginLineNo, endLineNo] = cmc.selectedLineNo();
        const lines = cmc.getValue().split("\n");
        if (lines.slice(beginLineNo, endLineNo + 1).some(line => !line.match(/^\s*\/\//))) {
            for (let lineNo = beginLineNo; lineNo <= endLineNo; lineNo++) {
                cmc.replaceRange(commentString, {line: lineNo, ch: 0});
            }
        } else {
            for (let lineNo = beginLineNo; lineNo <= endLineNo; lineNo++) {
                const newLine = lines[lineNo].slice(commentString.length);
                cmc.replaceRange(newLine, {line: lineNo, ch: 0}, {line: lineNo, ch: lines[lineNo].length});
            }
        }
    } else {
        const lineNo = cmc.getCursor().line;
        const line = cmc.getLine(lineNo);

        if (line.slice(0, commentString.length) === commentString) {
            const newLine = line.slice(commentString.length);
            cmc.replaceRange(newLine, {line: lineNo, ch: 0}, {line: lineNo, ch: line.length});
        } else {
            cmc.replaceRange(commentString, {line: lineNo, ch: 0});
        }
    }
};
