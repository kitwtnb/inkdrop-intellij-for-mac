function param(initValue, initSelection, expectValue, expectSelection) {
  return {
    initValue: initValue,
    initSelection: initSelection,
    expectValue: expectValue,
    expectSelection: expectSelection,
  };
}

function selection(from, to) {
  const t = to === undefined || to === null ? from : to;

  return {
    from: from,
    to: t,
  };
}

function cursor(line, ch) {
  return {
    line: line,
    ch: ch,
  };
}
