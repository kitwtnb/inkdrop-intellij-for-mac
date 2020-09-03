const range = require("./utility/range");

module.exports.execute = (cmc) => {
    const selectedArea = cmc.selectedArea();

    const commentString = "// ";
    const [begin, end] = cmc.selectedLineNumbers();
    const lines = range(begin, end).map(n => cmc.getLine(n));
    const isComment = lines.some(line => !line.match(/^\s*\/\//))
    const newLines = lines.map(line => {
        if (isComment) {
            return commentString + line
        } else {
            return line.slice(commentString.length);
        }
    });
    cmc.replaceLines(begin, newLines);

    const length = commentString.length * (isComment ? 1 : -1);
    let fromCh = selectedArea.from.ch === 0 ? 0 : selectedArea.from.ch + length;
    let toCh = selectedArea.to.ch === 0 ? 0 : selectedArea.to.ch + length;
    cmc.setSelection(
        selectedArea.from.line,
        fromCh,
        selectedArea.to.line,
        toCh
    );
};
