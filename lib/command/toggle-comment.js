function toggleComment(cmc) {
  const selectedArea = cmc.selectedArea();

  const commentString = "// ";
  const lines = cmc.getSelectedLines();
  if (lines.length === 1 && lines[0].length === 0) {
    return;
  }

  const isComment = lines.some((line) => !line.match(/^\s*\/\//));
  const newLines = lines.map((line) => {
    if (isComment) {
      return commentString + line;
    } else {
      return line.replace(new RegExp(`^${commentString}?`), "");
    }
  });
  cmc.replaceLines(
    Math.min(selectedArea.from.line, selectedArea.to.line),
    newLines
  );

  const length = commentString.length * (isComment ? 1 : -1);
  let fromCh = selectedArea.from.ch === 0 ? 0 : selectedArea.from.ch + length;
  let toCh = selectedArea.to.ch === 0 ? 0 : selectedArea.to.ch + length;
  cmc.setSelection(selectedArea.from.line, fromCh, selectedArea.to.line, toCh);
}

module.exports.execute = toggleComment;
