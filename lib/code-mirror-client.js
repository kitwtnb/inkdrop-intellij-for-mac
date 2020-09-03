module.exports = class CodeMirrorClient {
    constructor(cm) {
        this.cm = cm;
    }

    selectedLineNumbers() {
        const from = this.cm.getCursor("from");
        const to = this.cm.getCursor("to");
        const beginLineNo = from.line;
        let endLineNo = to.line;
        if (this.cm.somethingSelected() && to.ch === 0) {
            endLineNo--;
        }

        return [beginLineNo, endLineNo];
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
            from: from,
            to: to
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

    replaceLines(begin, lines) {
        const lastLineNo = begin + lines.length - 1
        const lastLine = this.cm.getLine(lastLineNo);
        this.cm.replaceRange(lines.join("\n"), { line: begin, ch: 0 }, { line: lastLineNo, ch: lastLine.length });
    }

    deleteLines(begin, end) {
        const values = this.cm.getValue().split("\n");
        values.splice(begin, end - begin + 1)
        this.cm.setValue(values.join("\n"));
    }
};
