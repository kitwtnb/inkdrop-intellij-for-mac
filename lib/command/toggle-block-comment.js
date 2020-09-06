const insertString = require("./utility/insert-string");

module.exports.execute = (cmc) => {
    const commentBegin = "/*";
    const commentEnd = "*/";

    const selectedArea = cmc.selectedArea();
    const lines = cmc.getLines();

    if (selectedArea.from.line !== selectedArea.to.line && selectedArea.from.ch === 0 && selectedArea.to.ch === 0) {
        const begin = selectedArea.from.line < selectedArea.to.line ? selectedArea.from : selectedArea.to;
        const end = selectedArea.from.line < selectedArea.to.line ? selectedArea.to : selectedArea.from;

        lines.splice(begin.line, 0, commentBegin);
        lines.splice(end.line + 1, 0, commentEnd);
        cmc.setLines(lines);
    } else {
        let begin, end;
        if (selectedArea.from.line === selectedArea.to.line) {
            begin = selectedArea.from.ch < selectedArea.to.ch ? selectedArea.from : selectedArea.to;
            const e = selectedArea.from.ch < selectedArea.to.ch ? selectedArea.to : selectedArea.from;
            end = { line: e.line, ch: e.ch + commentBegin.length };
        } else {
            begin = selectedArea.from.line < selectedArea.to.line ? selectedArea.from : selectedArea.to;
            end = selectedArea.from.line < selectedArea.to.line ? selectedArea.to : selectedArea.from;
        }

        lines[begin.line] = insertString(lines[begin.line], begin.ch, commentBegin);
        lines[end.line] = insertString(lines[end.line], end.ch, commentEnd);
        cmc.setLines(lines);
    }
};
