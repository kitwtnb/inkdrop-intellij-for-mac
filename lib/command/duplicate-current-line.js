function duplicateCurrentLine(cmc) {
  function insertString(original, index, str) {
    return (
      original.slice(0, index) + str + original.slice(index, original.length)
    );
  }

  const isSelected = cmc.somethingSelected();
  const selectedArea = cmc.selectedArea();
  const selectedValue = cmc.getSelectedValue();
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

  const lineOffset = (isSelected && selectedArea.from.line === selectedArea.to.line) ? 0 : 1;
  cmc.setSelection(
    selectedArea.from.line + lineOffset,
    selectedArea.to.ch,
    selectedArea.to.line + lineOffset,
    selectedArea.to.ch + selectedValue.length
  );
}

module.exports.execute = duplicateCurrentLine;
