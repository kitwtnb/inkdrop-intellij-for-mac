module.exports.execute = (cm) => {
    const from = cm.getCursor("from");
    const to = cm.getCursor("to");
    const cursor = cm.getCursor();
    const beginLineNo = from.line
    let endLineNo = to.line
    if (to.ch === 0) {
        endLineNo--;
    }

    const values = cm.getValue().split("\n");
    values.splice(beginLineNo, endLineNo - beginLineNo + 1)
    cm.setValue(values.join("\n"));
    cm.setCursor({ line: Math.min(from.line, to.line), ch: cursor.ch });
};
