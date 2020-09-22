describe("duplicate-current-line", () => {
  const command = duplicateCurrentLine;

  describe("duplicate", () => {
    context("value is empty", () => {
      const initValue = "";
      const initSelection = selection(cursor(0, 0));

      its(command, [param(initValue, initSelection, initValue, initSelection)]);
    });

    context("value is a character", () => {
      const initValue = "a";

      its(command, [
        param(
          initValue,
          selection(cursor(0, 0)),
          "a\na",
          selection(cursor(1, 0))
        ),
        param(
          initValue,
          selection(cursor(0, 1)),
          "a\na",
          selection(cursor(1, 1))
        ),
        param(
          initValue,
          selection(cursor(0, 0), cursor(0, 1)),
          "aa",
          selection(cursor(0, 1), cursor(0, 2))
        ),
      ]);
    });

    context("value is multi lines", () => {
      const initValue = "abc\ndef";

      its(command, [
        param(
          initValue,
          selection(cursor(0, 0)),
          "abc\nabc\ndef",
          selection(cursor(1, 0))
        ),
        param(
          initValue,
          selection(cursor(0, 3)),
          "abc\nabc\ndef",
          selection(cursor(1, 3))
        ),
        param(
          initValue,
          selection(cursor(0, 0), cursor(0, 1)),
          "aabc\ndef",
          selection(cursor(0, 1), cursor(0, 2))
        ),
        param(
          initValue,
          selection(cursor(0, 0), cursor(1, 0)),
          "abc\nabc\ndef",
          selection(cursor(1, 0), cursor(2, 0))
        ),
        param(
          initValue,
          selection(cursor(0, 2), cursor(1, 1)),
          "abc\ndc\ndef",
          selection(cursor(1, 1), cursor(2, 1))
        ),
      ]);
    });
  });
});
