describe("toggle-block-comment", () => {
  const command = toggleBlockComment;

  describe("add comment block", () => {
    context("value is empty", () => {
      its(command, [
        param("", selection(cursor(0, 0)), "/**/", selection(cursor(0, 2))),
      ]);
    });

    context("value is a character", () => {
      const initValue = "a\n";

      its(command, [
        param(
          initValue,
          selection(cursor(0, 0)),
          "/**/a\n",
          selection(cursor(0, 2))
        ),
        param(
          initValue,
          selection(cursor(0, 1)),
          "a/**/\n",
          selection(cursor(0, 3))
        ),
        param(
          initValue,
          selection(cursor(0, 0), cursor(0, 1)),
          "/*a*/\n",
          selection(cursor(0, 0), cursor(0, 5))
        ),
        param(
          initValue,
          selection(cursor(0, 0), cursor(1, 0)),
          "/*\na\n*/\n",
          selection(cursor(0, 0), cursor(3, 0))
        ),
        param(
          initValue,
          selection(cursor(1, 0), cursor(0, 0)),
          "/*\na\n*/\n",
          selection(cursor(3, 0), cursor(0, 0))
        ),
      ]);
    });

    context("value is string", () => {
      const initValue = "aa\n";

      its(command, [
        param(
          initValue,
          selection(cursor(0, 1)),
          "a/**/a\n",
          selection(cursor(0, 3))
        ),
        param(
          initValue,
          selection(cursor(0, 0), cursor(0, 1)),
          "/*a*/a\n",
          selection(cursor(0, 0), cursor(0, 5))
        ),
        param(
          initValue,
          selection(cursor(0, 1), cursor(0, 2)),
          "a/*a*/\n",
          selection(cursor(0, 1), cursor(0, 6))
        ),
      ]);
    });

    context("value is multi lines", () => {
      its(command, [
        param(
          "aaa\nbbb",
          selection(cursor(0, 1), cursor(1, 2)),
          "a/*aa\nbb*/b",
          selection(cursor(0, 1), cursor(1, 4))
        ),
        param(
          "aaa\nbbb",
          selection(cursor(1, 1), cursor(0, 2)),
          "aa/*a\nb*/bb",
          selection(cursor(1, 3), cursor(0, 2))
        ),
        param(
          "/*a*/\nb\n/*c*/",
          selection(cursor(0, 5)),
          "/*a*//**/\nb\n/*c*/",
          selection(cursor(0, 7))
        ),
        param(
          "/*a*/\nb\n/*c*/",
          selection(cursor(1, 0)),
          "/*a*/\n/**/b\n/*c*/",
          selection(cursor(1, 2))
        ),
        param(
          "/*a*/\nb\n/*c*/",
          selection(cursor(1, 1)),
          "/*a*/\nb/**/\n/*c*/",
          selection(cursor(1, 3))
        ),
        param(
          "/*a*/\nb\n/*c*/",
          selection(cursor(1, 0), cursor(1, 1)),
          "/*a*/\n/*b*/\n/*c*/",
          selection(cursor(1, 0), cursor(1, 5))
        ),
      ]);
    });
  });

  describe("remove comment block", () => {
    context("value is a comment block", () => {
      const initValue = "/**/";
      const expectValue = "";
      const expectSelection = selection(cursor(0, 0));

      its(command, [
        param(initValue, selection(cursor(0, 0)), expectValue, expectSelection),
        param(initValue, selection(cursor(0, 1)), expectValue, expectSelection),
        param(initValue, selection(cursor(0, 2)), expectValue, expectSelection),
        param(initValue, selection(cursor(0, 3)), expectValue, expectSelection),
      ]);
    });

    context("value is comment block and character", () => {
      const initValue = "/*a*/";
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
          selection(cursor(0, 1)),
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
          selection(cursor(0, 4)),
          expectValue,
          selection(cursor(0, 1))
        ),
      ]);
    });

    context("value is multi lines", () => {
      its(command, [
        param(
          "/*\na\n*/",
          selection(cursor(0, 0)),
          "a",
          selection(cursor(0, 0))
        ),
        param(
          "/*\na\n*/",
          selection(cursor(0, 2)),
          "a",
          selection(cursor(0, 0))
        ),
        param(
          "/*\na\n*/",
          selection(cursor(1, 0)),
          "a",
          selection(cursor(0, 0))
        ),
        param(
          "/*\na\n*/",
          selection(cursor(1, 1)),
          "a",
          selection(cursor(0, 1))
        ),
        param(
          "/*\na\n*/",
          selection(cursor(2, 0)),
          "a",
          selection(cursor(0, 1))
        ),
      ]);
    });
  });
});
