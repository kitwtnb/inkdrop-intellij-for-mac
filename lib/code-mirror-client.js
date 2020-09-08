class CodeMirrorClient {
    constructor(cm) {
        this.cm = cm;
    }

    somethingSelected() {
        return this.cm.somethingSelected();
    }

    selectedLineNumber() {
        return this._selectedLineNumber();
    }

    selectedArea() {
        const cursor = this.cm.getCursor();
        let from = this.cm.getCursor("from");
        let to = this.cm.getCursor("to");

        if (cursor.line === from.line && cursor.ch === from.ch) {
            const tmp = from;
            from = to;
            to = tmp;
        }

        return {
            from: { line: from.line, ch: from.ch },
            to: { line: to.line, ch: to.ch }
        };
    }

    getCursor() {
        return this.cm.getCursor();
    }

    setCursor(line, ch) {
        this.cm.setCursor({ line: line, ch: ch });
    }

    setSelection(line1, ch1, line2, ch2) {
        this.cm.setSelection(
            { line: line1, ch: ch1 },
            { line: line2, ch: ch2 }
        );
    }

    getLine(n) {
        return this.cm.getLine(n);
    }

    getLines() {
        return this._getValues();
    }

    getSelectedLines() {
        const selectedLineNumber = this._selectedLineNumber();
        return this._getValues().slice(selectedLineNumber.begin, selectedLineNumber.end + 1);
    }

    setLines(lines) {
        this._setValues(lines);
    }

    replaceLines(begin, lines) {
        const lastLineNo = begin + lines.length - 1
        const lastLine = this.cm.getLine(lastLineNo);
        this.cm.replaceRange(lines.join("\n"), { line: begin, ch: 0 }, { line: lastLineNo, ch: lastLine.length });
    }

    deleteLines(begin, end) {
        const values = this.cm.getValue().split("\n");
        values.splice(begin, end - begin + 1)
        this._setValues(values);
    }

    _getValues() {
        return this.cm.getValue().split("\n")
    }

    _setValues(values) {
        this.cm.setValue(values.join("\n"));
    }

    _selectedLineNumber() {
        const from = this.cm.getCursor("from");
        const to = this.cm.getCursor("to");
        const begin = from.line;
        let end = to.line;
        if (this.cm.somethingSelected() && to.ch === 0) {
            end--;
        }

        return { begin: begin, end: end };
    }
}

module.exports = CodeMirrorClient;
