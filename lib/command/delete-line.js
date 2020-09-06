module.exports.execute = (cmc) => {
    const cursor = cmc.getCursor();
    const selectedLineNumber = cmc.selectedLineNumber();
    cmc.deleteLines(selectedLineNumber.begin, selectedLineNumber.end);
    cmc.setCursor(Math.min(selectedLineNumber.begin, selectedLineNumber.end), cursor.ch);
};
