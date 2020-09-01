'use basel';

module.exports = {
    activate() {
        inkdrop.commands.add(document.body, 'editor:toggle-comment', () => {
            const { cm } = inkdrop.getActiveEditor()

            const commentString = "// ";
            if (cm.somethingSelected()) {
                const from = cm.getCursor("from");
                const to = cm.getCursor("to");

                const beginLineNo = from.line
                let endLineNo = to.line
                if (to.ch === 0) {
                    endLineNo--;
                }

                const lines = cm.getValue().split("\n");
                if (lines.slice(beginLineNo, endLineNo + 1).some(line => !line.match(/^\s*\/\//))) {
                    for (let lineNo = beginLineNo; lineNo <= endLineNo; lineNo++) {
                        cm.replaceRange(commentString, {line: lineNo, ch: 0});
                    }
                } else {
                    for (let lineNo = beginLineNo; lineNo <= endLineNo; lineNo++) {
                        const newLine = lines[lineNo].slice(commentString.length);
                        cm.replaceRange(newLine, {line: lineNo, ch: 0}, {line: lineNo, ch: lines[lineNo].length});
                    }
                }
            } else {
                const lineNo = cm.getCursor().line;
                const line = cm.getLine(lineNo);
    
                if (line.slice(0, commentString.length) === commentString) {
                    const newLine = line.slice(commentString.length);
                    cm.replaceRange(newLine, {line: lineNo, ch: 0}, {line: lineNo, ch: line.length});
                } else {
                    cm.replaceRange(commentString, {line: lineNo, ch: 0});
                }
            }
        })
    },
    deactivate() {}
};
