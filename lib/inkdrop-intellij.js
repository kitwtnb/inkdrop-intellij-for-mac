'use basel';

module.exports = {
    activate() {
        inkdrop.commands.add(document.body, 'editor:toggle-comment', () => {
            const { cm } = inkdrop.getActiveEditor()
            const line = cm.getCursor().line;
            const addPosition = {line: line, ch: 0}
            cm.replaceRange("// ", addPosition, addPosition)
        })
    },
    deactivate() {}
};
