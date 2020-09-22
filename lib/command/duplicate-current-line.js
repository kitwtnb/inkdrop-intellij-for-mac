function duplicateCurrentLine(cmc) {
  function insertString(original, index, str) {
    return (
      original.slice(0, index) + str + original.slice(index, original.length)
    );
  }

  const isSelected = cmc.somethingSelected();
  const selectedArea = cmc.selectedArea();
  const lines = cmc.getLines();
  if (lines.length === 1 && lines[0].length === 0) {
    return;
  }

  if (isSelected) {
    lines[selectedArea.to.line] = insertString(
      lines[selectedArea.to.line],
      selectedArea.to.ch,
      cmc.getSelectedValue()
    );
  } else {
    const line = selectedArea.from.line;
    lines.splice(line + 1, 0, lines[line]);
  }
  cmc.setLines(lines);
  cmc.setSelection(
    selectedArea.from.line + 1,
    selectedArea.from.ch,
    selectedArea.to.line + 1,
    selectedArea.to.ch
  );
}

module.exports.execute = duplicateCurrentLine;
