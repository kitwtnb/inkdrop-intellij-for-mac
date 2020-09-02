module.exports = class CodeMirrorClient {
    constructor(cm) {
        this.cm = cm;
    }

    somethingSelected() {
        return this.cm.somethingSelected();
    }

    selectedLineNo() {
        const from = this.cm.getCursor("from");
        const to = this.cm.getCursor("to");
        const beginLineNo = from.line;
        let endLineNo = to.line;
        if (this.cm.somethingSelected() && to.ch === 0) {
            endLineNo--;
        }

        return [beginLineNo, endLineNo];
    }

    getCursor() {
        return this.cm.getCursor();
    }

    setCursor(line, ch) {
        this.cm.setCursor({ line: line, ch: ch });
    }

    getLine(n) {
        return this.cm.getLine(n);
    }

    setLine(n, value) {
        const line = this.cm.getLine(n);
        this.cm.replaceRange(value, { line: n, ch: 0 }, { line: n, ch: line.length });
    }

    getValues() {
        return this.cm.getValue().split("\n");
    }

    deleteLines(begin, end) {
        const values = this.cm.getValue().split("\n");
        values.splice(begin, end - begin + 1)
        this.cm.setValue(values.join("\n"));
    }
};
