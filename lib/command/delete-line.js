module.exports.execute = (cmc) => {
    const from = cmc.getCursor("from");
    const to = cmc.getCursor("to");
    const cursor = cmc.getCursor();
    const beginLineNo = from.line
    let endLineNo = to.line
    if (to.ch === 0) {
        endLineNo--;
    }

    const values = cmc.getValue().split("\n");
    values.splice(beginLineNo, endLineNo - beginLineNo + 1)
    cmc.setValue(values.join("\n"));
    cmc.setCursor({ line: Math.min(from.line, to.line), ch: cursor.ch });
};
