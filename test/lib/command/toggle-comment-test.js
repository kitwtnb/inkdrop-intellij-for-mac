const expect = chai.expect;

describe('toggle-comment', () => {
    it("codemirror getValue", () => {
        const cm = getCodeMirrorInstance();
        cm.setValue("foo")
        expect(cm.getValue()).equal("foo");
    });
});
