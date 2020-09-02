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
        if (this.somethingSelected() && to.ch === 0) {
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

    getValues() {
        return this.cm.getValue().split("\n");
    }

    setValue(content) {
        this.cm.setValue(content);
    }

    replaceRange(replacement, from, to) {
        return this.cm.replaceRange(replacement, from, to);
    }

    getLine(n) {
        return this.cm.getLine(n);
    }
};
