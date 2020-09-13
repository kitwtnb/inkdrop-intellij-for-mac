describe("delete-line", () => {
  const command = deleteLine;

  context("value is a line", () => {
    const initSelection = selection(cursor(0, 0));

    its(command, [param("a", initSelection, "", initSelection)]);
  });

  context("value is multi lines", () => {
    const initValue = "aa\nbb\ncc";

    its(command, [
      param(
        "aa\nbb\ncc",
        selection(cursor(0, 0)),
        "bb\ncc",
        selection(cursor(0, 0))
      ),
      param(
        "aa\nbb\ncc",
        selection(cursor(0, 1)),
        "bb\ncc",
        selection(cursor(0, 1))
      ),
      param(
        "aa\nbb\ncc",
        selection(cursor(1, 1)),
        "aa\ncc",
        selection(cursor(1, 1))
      ),
      param(
        "aa\nbb\ncc",
        selection(cursor(0, 0), cursor(1, 0)),
        "bb\ncc",
        selection(cursor(0, 0))
      ),
      param(
        "aa\nbb\ncc",
        selection(cursor(1, 1), cursor(1, 2)),
        "aa\ncc",
        selection(cursor(1, 2))
      ),
      param(
        "aa\nbb\ncc",
        selection(cursor(1, 2), cursor(1, 1)),
        "aa\ncc",
        selection(cursor(1, 1))
      ),
      param(
        "aa\nbb\ncc",
        selection(cursor(0, 1), cursor(1, 2)),
        "cc",
        selection(cursor(0, 2))
      ),
      param(
        "aa\nbb\ncc",
        selection(cursor(1, 2), cursor(0, 1)),
        "cc",
        selection(cursor(0, 1))
      ),
    ]);
  });
});
