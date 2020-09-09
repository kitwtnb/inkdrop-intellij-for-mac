const expect = chai.expect;

function its(command, params) {
  params.forEach((p) => {
    context(
      `value: "${p.initValue.replace("\n", "'\\n'")}", from: "${JSON.stringify(
        p.initSelection.from
      )}", to: "${JSON.stringify(p.initSelection.to)}"`,
      () => {
        it(`value "${p.initValue.replace(
          "\n",
          "'\\n'"
        )}" should be converted to "${p.expectValue.replace(
          "\n",
          "'\\n'"
        )}"`, () => {
          // setup
          const cm = CodeMirror.fromTextArea(cm_text);
          cm.setValue(p.initValue);
          cm.setSelection(p.initSelection.from, p.initSelection.to);
          const cmc = new CodeMirrorClient(cm);

          // exercise
          command(cmc);

          // verify
          cm.toTextArea();
          expect(p.expectValue).equal(cm.getValue(), "`value` was wrong");
        });

        it(`from "${JSON.stringify(
          p.initSelection.from
        )}" should be converted to "${JSON.stringify(
          p.expectSelection.from
        )}"`, () => {
          // setup
          const cm = CodeMirror.fromTextArea(cm_text);
          cm.setValue(p.initValue);
          cm.setSelection(p.initSelection.from, p.initSelection.to);
          const cmc = new CodeMirrorClient(cm);

          // exercise
          command(cmc);

          // verify
          const area = cmc.selectedArea();
          cm.toTextArea();
          expect(p.expectSelection.from).to.deep.equal(
            area.from,
            "`from` of the cursor was wrong"
          );
        });

        it(`to "${JSON.stringify(
          p.initSelection.to
        )}" should be converted to "${JSON.stringify(
          p.expectSelection.to
        )}"`, () => {
          // setup
          const cm = CodeMirror.fromTextArea(cm_text);
          cm.setValue(p.initValue);
          cm.setSelection(p.initSelection.from, p.initSelection.to);
          const cmc = new CodeMirrorClient(cm);

          // exercise
          command(cmc);

          // verify
          const area = cmc.selectedArea();
          cm.toTextArea();
          expect(p.expectSelection.to).to.deep.equal(
            area.to,
            "`to` of the cursor was wrong"
          );
        });
      }
    );
  });
}
