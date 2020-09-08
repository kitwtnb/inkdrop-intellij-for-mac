describe("toggle-comment", () => {
    const command = toggleComment;

    describe("add comment", () => {
        context("value is empty", () => {
            const value = "";

            its(command, [
                param(
                    value,
                    selection(cursor(0, 0), cursor(0, 0)),
                    "// ",
                    selection(cursor(0, 0), cursor(0, 0))
                ),
            ]);
        });
    });
});
