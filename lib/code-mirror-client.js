module.exports = class CodeMirrorClient {
    constructor(cm) {
        this.cm = cm;
    }

    somethingSelected() {
        return this.cm.somethingSelected();
    }

    getCursor(start) {
        return this.cm.getCursor(start);
    }

    setCursor(pos) {
        this.cm.setCursor(pos);
    }

    getValue() {
        return this.cm.getValue();
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
