'use basel';

module.exports = {
    activate() {
        inkdrop.commands.add(document.body, 'editor:toggle-comment', () => {
            const { cm } = inkdrop.getActiveEditor()

            const lineNo = cm.getCursor().line;
            const line = cm.getLine(lineNo);

            const commentString = "// ";
            if (line.slice(0, commentString.length) === commentString) {
                const newLine = line.slice(commentString.length);
                cm.replaceRange(newLine, {line: lineNo, ch: 0}, {line: lineNo, ch: line.length});
            } else {
                cm.replaceRange(commentString, {line: lineNo, ch: 0});
            }
        })
    },
    deactivate() {}
};
