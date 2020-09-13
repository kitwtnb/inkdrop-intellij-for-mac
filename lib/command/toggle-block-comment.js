function toggleBlockComment(cmc) {
  const commentBegin = "/*";
  const commentEnd = "*/";

  function insertString(original, index, str) {
    return (
      original.slice(0, index) + str + original.slice(index, original.length)
    );
  }

  function isInComment(selectedArea, lines) {
    const begin =
      selectedArea.from.line < selectedArea.to.line
        ? selectedArea.from
        : selectedArea.to;
    const end =
      selectedArea.from.line < selectedArea.to.line
        ? selectedArea.to
        : selectedArea.from;

    return hasBeginComment(lines, begin) && hasEndComment(lines, end);
  }

  function hasBeginComment(lines, cursor) {
    for (let i = cursor.line; 0 <= i; i--) {
      let line;
      if (i === cursor.line) {
        const s1 = lines[i].substring(
          cursor.ch,
          cursor.ch + commentBegin.length
        );
        const s2 = lines[i].substring(
          cursor.ch - 1,
          cursor.ch + commentBegin.length - 1
        );
        const offset =
          s1 === commentBegin || s2 === commentBegin ? commentBegin.length : 0;
        line = lines[i].substring(0, cursor.ch + offset);
      } else {
        line = lines[i];
      }

      if (line.lastIndexOf(commentBegin) < line.lastIndexOf(commentEnd)) {
        return false;
      } else if (line.includes(commentBegin)) {
        return true;
      }
    }

    return false;
  }

  function hasEndComment(lines, cursor) {
    for (let i = cursor.line; i < lines.length; i++) {
      let line;
      if (i === cursor.line) {
        line = lines[i].substring(cursor.ch - 1);
      } else {
        line = lines[i];
      }

      if (line.includes(commentEnd)) {
        return true;
      }
    }

    return false;
  }

  const selectedArea = cmc.selectedArea();
  const lines = cmc.getLines();

  if (isInComment(selectedArea, lines)) {
    const begin =
      selectedArea.from.line < selectedArea.to.line
        ? selectedArea.from
        : selectedArea.to;
    const end =
      selectedArea.from.line < selectedArea.to.line
        ? selectedArea.to
        : selectedArea.from;

    let start;
    for (let i = begin.line; 0 <= i; i--) {
      if (lines[i].includes(commentBegin)) {
        start = { line: i, ch: lines[i].lastIndexOf(commentBegin) };
        break;
      }
    }

    let last;
    for (let i = end.line; i < lines.length; i++) {
      if (lines[i].includes(commentEnd)) {
        last = { line: i, ch: lines[i].indexOf(commentEnd) };
        break;
      }
    }

    let isDeleteLine = false;
    if (start.line === last.line) {
      const line = lines[start.line];
      lines[start.line] =
        line.slice(0, start.ch) +
        line.slice(start.ch + commentBegin.length, last.ch) +
        line.slice(last.ch + commentEnd.length);
    } else {
      if (lines[last.line] === commentEnd) {
        lines.splice(last.line, 1);
      } else {
        const line = lines[last.line];
        lines[last.line] =
          line.slice(0, last.ch) + line.slice(last.ch + commentEnd.length);
      }
      if (lines[start.line] === commentBegin) {
        lines.splice(start.line, 1);
        isDeleteLine = true;
      } else {
        const line = lines[start.line];
        lines[start.line] =
          line.slice(0, start.ch) + line.slice(start.ch + commentBegin.length);
      }
    }
    cmc.setLines(lines);

    const lineOffset = isDeleteLine ? -1 : 0;
    const chOffset = start.line === last.line ? -commentBegin.length : 0;
    cmc.setSelection(
      begin.line + lineOffset,
      begin.ch + chOffset,
      end.line + lineOffset,
      end.ch + chOffset
    );
  } else {
    if (
      selectedArea.from.line !== selectedArea.to.line &&
      selectedArea.from.ch === 0 &&
      selectedArea.to.ch === 0
    ) {
      const begin =
        selectedArea.from.line < selectedArea.to.line
          ? selectedArea.from
          : selectedArea.to;
      const end =
        selectedArea.from.line < selectedArea.to.line
          ? selectedArea.to
          : selectedArea.from;

      lines.splice(begin.line, 0, commentBegin);
      lines.splice(end.line + 1, 0, commentEnd);
      cmc.setLines(lines);

      cmc.setSelection(begin.line, 0, end.line + 1, commentEnd.length);
    } else {
      const isSelected = cmc.somethingSelected();
      let begin, end;
      if (selectedArea.from.line === selectedArea.to.line) {
        begin =
          selectedArea.from.ch < selectedArea.to.ch
            ? selectedArea.from
            : selectedArea.to;
        const e =
          selectedArea.from.ch < selectedArea.to.ch
            ? selectedArea.to
            : selectedArea.from;
        end = { line: e.line, ch: e.ch + commentBegin.length };
      } else {
        begin =
          selectedArea.from.line < selectedArea.to.line
            ? selectedArea.from
            : selectedArea.to;
        end =
          selectedArea.from.line < selectedArea.to.line
            ? selectedArea.to
            : selectedArea.from;
      }

      lines[begin.line] = insertString(
        lines[begin.line],
        begin.ch,
        commentBegin
      );
      lines[end.line] = insertString(lines[end.line], end.ch, commentEnd);
      cmc.setLines(lines);

      let ch1 = selectedArea.from.ch + commentBegin.length;
      let ch2 =
        selectedArea.to.ch +
        (selectedArea.from.line === selectedArea.to.line
          ? commentBegin.length
          : 0);
      if (isSelected) {
        ch1 -= commentBegin.length;
        ch2 += commentEnd.length;
      }
      cmc.setSelection(selectedArea.from.line, ch1, selectedArea.to.line, ch2);
    }
  }
}

module.exports.execute = toggleBlockComment;
