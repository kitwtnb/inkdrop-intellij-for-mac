'use basel';

const commands = [
    "toggle-comment",
    "delete-line",
];

module.exports = {
    activate() {
        commands.forEach(commandName => {
            inkdrop.commands.add(document.body, `intellij:${commandName}`, () => {
                const { cm } = inkdrop.getActiveEditor()
                const command = require(`./command/${commandName}`);
                command.execute(cm)
            })
        })
    },
    deactivate() {}
};
