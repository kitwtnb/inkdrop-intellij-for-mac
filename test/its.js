const expect = chai.expect;

function its(command, params) {
    params.forEach(p => {
        it(`value "${p.initValue}" should be converted to "${p.expectValue}"`, () => {
            // setup
            const cm = CodeMirror.fromTextArea(cm_text);
            cm.setValue(p.initValue);
            cm.setSelection(p.initSelection.from, p.initSelection.to);
            const cmc = new CodeMirrorClient(cm);

            // exercise
            command(cmc);

            // verify
            expect(p.expectValue).equal(cm.getValue(), '`value` was wrong');

            // teardown
            cm.toTextArea();
        });

        it(`from "${JSON.stringify(p.initSelection.from)}" should be converted to "${JSON.stringify(p.expectSelection.from)}"`, () => {
            // setup
            const cm = CodeMirror.fromTextArea(cm_text);
            cm.setValue(p.initValue);
            cm.setSelection(p.initSelection.from, p.initSelection.to);
            const cmc = new CodeMirrorClient(cm);

            // exercise
            command(cmc);

            // verify
            const area = cmc.selectedArea();
            expect(p.expectSelection.from).to.deep.equal(area.from, "`from` of the cursor was wrong");

            // teardown
            cm.toTextArea();
        });

        it(`to "${JSON.stringify(p.initSelection.to)}" should be converted to "${JSON.stringify(p.expectSelection.to)}"`, () => {
            // setup
            const cm = CodeMirror.fromTextArea(cm_text);
            cm.setValue(p.initValue);
            cm.setSelection(p.initSelection.from, p.initSelection.to);
            const cmc = new CodeMirrorClient(cm);

            // exercise
            command(cmc);

            // verify
            const area = cmc.selectedArea();
            expect(p.expectSelection.to).to.deep.equal(area.to, "`to` of the cursor was wrong");

            // teardown
            cm.toTextArea();
        });
    });
}
