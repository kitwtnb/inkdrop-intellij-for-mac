const expect = chai.expect;

describe('toggle-comment', () => {
    it("codemirror getValue", () => {
        // setup
        const cm = CodemirrorFactory.instance();
        const cmc = CodemirrorClientFactory.instance(cm);
        cm.setValue("");
        cm.setCursor(0, 0);

        // exercise
        toggleComment(cmc);

        // verify
        expect("// ").equal(cm.getValue());
    });
});
