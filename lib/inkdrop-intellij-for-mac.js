'use basel';

const commands = [
    "toggle-comment",
];

module.exports = {
    activate() {
        commands.forEach(commandName => {
            inkdrop.commands.add(document.body, `editor:${commandName}`, () => {
                const { cm } = inkdrop.getActiveEditor()
                const command = require(`./command/${commandName}`);
                command.execute(cm)
            })
        })
    },
    deactivate() {}
};
