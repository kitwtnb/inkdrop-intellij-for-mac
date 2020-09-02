module.exports.execute = (cmc) => {
    const cursor = cmc.getCursor();
    const [beginLineNo, endLineNo] = cmc.selectedLineNo();
    const values = cmc.getValues();
    values.splice(beginLineNo, endLineNo - beginLineNo + 1)
    cmc.setValue(values.join("\n"));
    cmc.setCursor(Math.min(beginLineNo, endLineNo), cursor.ch);
};
