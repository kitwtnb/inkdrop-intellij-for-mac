module.exports.execute = (cmc) => {
    const cursor = cmc.getCursor();
    const [begin, end] = cmc.selectedLineNo();
    cmc.deleteLines(begin, end)
    cmc.setCursor(Math.min(begin, end), cursor.ch);
};
