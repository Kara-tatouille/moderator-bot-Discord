module.exports = {
    name: 'makeRules',
    aliases: ['rules', 'rule'],
    description: 'Make a message into a rule message',
    usage: '<message ID>',
    args: 1,
    cooldown: 5,
    execute(message, args) {
        console.log(args);
        message.delete();
        const rulesMessage = message.channel.messages.fetch(args[0]).then(message => {
            const filter = (reaction, user) => {
                return ['✅', '❎'].includes(reaction.emoji.name)
            };

            const collector = message.createReactionCollector(filter);

            collector.on('collect', (reaction) => {
                message.channel.send('Roger that!');
                reaction.message.reactions.removeAll();
            });
        }).catch(reason => console.log(reason.messages));
    },
};