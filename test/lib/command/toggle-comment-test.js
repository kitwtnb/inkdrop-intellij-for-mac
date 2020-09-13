describe("toggle-comment", () => {
  const command = toggleComment;

  describe("add comment", () => {
    context("value is empty", () => {
      const initValue = "";
      const initSelection = selection(cursor(0, 0));

      its(command, [param(initValue, initSelection, initValue, initSelection)]);
    });

    context("value is a character", () => {
      const initValue = "a";
      const expectValue = "// a";

      its(command, [
        param(
          initValue,
          selection(cursor(0, 0)),
          expectValue,
          selection(cursor(0, 0))
        ),
        param(
          initValue,
          selection(cursor(0, 1)),
          expectValue,
          selection(cursor(0, 4))
        ),
        param(
          initValue,
          selection(cursor(0, 0), cursor(0, 1)),
          expectValue,
          selection(cursor(0, 3), cursor(0, 4))
        ),
        param(
          initValue,
          selection(cursor(0, 1), cursor(0, 0)),
          expectValue,
          selection(cursor(0, 4), cursor(0, 3))
        ),
      ]);
    });

    context("value is 2 lines", () => {
      const initValue = "a\nbbbbb";

      its(command, [
        param(
          initValue,
          selection(cursor(0, 0)),
          "// a\nbbbbb",
          selection(cursor(1, 0))
        ),
        param(
          initValue,
          selection(cursor(0, 1)),
          "// a\nbbbbb",
          selection(cursor(1, 4))
        ),
        param(
          initValue,
          selection(cursor(0, 0), cursor(1, 0)),
          "// a\nbbbbb",
          selection(cursor(0, 0), cursor(1, 0))
        ),
        param(
          initValue,
          selection(cursor(0, 0), cursor(1, 1)),
          "// a\n// bbbbb",
          selection(cursor(0, 3), cursor(1, 4))
        ),
        param(
          initValue,
          selection(cursor(1, 1), cursor(0, 1)),
          "// a\n// bbbbb",
          selection(cursor(1, 4), cursor(0, 4))
        ),
      ]);
    });

    context("value is 3 lines", () => {
      its(command, [
        param(
          "// a\nb\nc",
          selection(cursor(0, 0), cursor(2, 0)),
          "// // a\n// b\nc",
          selection(cursor(0, 0), cursor(2, 0))
        ),
        param(
          "a\n// b\nc",
          selection(cursor(0, 0), cursor(2, 0)),
          "// a\n// // b\nc",
          selection(cursor(0, 0), cursor(2, 0))
        ),
      ]);
    });
  });

  describe("remove comment", () => {
    context("value is a comment", () => {
      its(command, [
        param(
          "//",
          selection(cursor(0, 0)),
          "",
          selection(cursor(0, 0))
        ),
      ]);
    });

    context("value is comment and character", () => {
      const initValue = "//a";
      const expectValue = "a";

      its(command, [
        param(
          initValue,
          selection(cursor(0, 0)),
          expectValue,
          selection(cursor(0, 0))
        ),
        param(
          initValue,
          selection(cursor(0, 2)),
          expectValue,
          selection(cursor(0, 0))
        ),
        param(
          initValue,
          selection(cursor(0, 3)),
          expectValue,
          selection(cursor(0, 1))
        ),
        param(
          initValue,
          selection(cursor(0, 2), cursor(0, 3)),
          expectValue,
          selection(cursor(0, 0), cursor(0, 1))
        ),
        param(
          initValue,
          selection(cursor(0, 3), cursor(0, 2)),
          expectValue,
          selection(cursor(0, 1), cursor(0, 0))
        ),
      ]);
    });

    context("value is 2 lines", () => {
      const initValue = "// aaa\n// bbb";

      its(command, [
        param(
          initValue,
          selection(cursor(0, 0)),
          "aaa\n// bbb",
          selection(cursor(1, 0))
        ),
        param(
          initValue,
          selection(cursor(0, 4)),
          "aaa\n// bbb",
          selection(cursor(1, 1))
        ),
        param(
          initValue,
          selection(cursor(0, 0), cursor(1, 0)),
          "aaa\n// bbb",
          selection(cursor(1, 0))
        ),
        param(
          initValue,
          selection(cursor(0, 0), cursor(1, 1)),
          "aaa\nbbb",
          selection(cursor(0, 0), cursor(1, 0))
        ),
        param(
          initValue,
          selection(cursor(0, 0), cursor(1, 4)),
          "aaa\nbbb",
          selection(cursor(0, 0), cursor(1, 1))
        ),
        param(
          initValue,
          selection(cursor(0, 4), cursor(1, 5)),
          "aaa\nbbb",
          selection(cursor(0, 1), cursor(1, 2))
        ),
        param(
          initValue,
          selection(cursor(1, 4), cursor(0, 5)),
          "aaa\nbbb",
          selection(cursor(1, 1), cursor(0, 2))
        ),
      ]);
    });
  });
});
