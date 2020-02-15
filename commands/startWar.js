const {grades} = require('../config/config.json');


module.exports = {
    name: 'start-war',
    description: 'Create a war',
    cooldown: 5,
    usage: '',
    args: 0,
    aliases: ['pong'],
    async execute(message, args)
    {
        const warMessage = await message.channel.send('Chose your side!');

        const filter = () => true;

        const collector = warMessage.createReactionCollector(filter);

        collector.on('collect', (reaction) => {
            const bontaRole = message.guild.roles.fetch(grades.bonta);
            const brakmarRole = message.guild.roles.fetch(grades.brakmar);
            const reactingMember = message.guild.members.fetch(reaction.users.last().id);

            switch (reaction.emoji.name) {
                case ':bonta:':
                    reactingMember.roles.add(bontaRole);
                    break;
                case ':brakmar:':
                    reactingMember.roles.add(brakmarRole);
                    break;
                default:
                    reaction.remove();
                    break;
            }
        });
    },
};