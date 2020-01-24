const {baseRoleId} = require('../config/config');


module.exports = {
    name: 'makeRules',
    aliases: ['rules', 'rule'],
    description: 'Make a message into a rule message',
    usage: '<message ID>',
    args: 1,
    cooldown: 5,
    execute(message, args) {
        message.delete();
        const rulesMessage = message.channel.messages.fetch(args[0]).then(message => {
            const filter = () => true;

            const collector = message.createReactionCollector(filter);

            collector.on('collect', (reaction) => {
                const baseRole = message.guild.roles.get(baseRoleId);
                const reactingMember = message.guild.members.get(reaction.users.first().id);

                reactingMember.roles.add(baseRole);

                reaction.message.reactions.removeAll();
            });
        }).catch(reason => console.log(reason.messages));
    },
};