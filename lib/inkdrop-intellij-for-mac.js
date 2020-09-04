'use basel';

const CodeMirrorClient = require("./code-mirror-client");
const commands = [
    "toggle-comment",
    "toggle-block-comment",
    "delete-line",
];

module.exports = {
    activate() {
        commands.forEach(commandName => {
            inkdrop.commands.add(document.body, `intellij:${commandName}`, () => {
                const { cm } = inkdrop.getActiveEditor();
                const cmc = new CodeMirrorClient(cm);

                const command = require(`./command/${commandName}`);
                command.execute(cmc);
            })
        })
    },
    deactivate() {}
};
