const {bonta, brakmar} = require('../config/config.json');


module.exports = {
    name: 'start-war',
    description: 'Create a war, only avalible to administrators.',
    cooldown: 5,
    usage: '',
    args: 0,
    guildOnly: true,
    aliases: ['pong'],
    async execute(message)
    {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.react('❌');

        message.delete();
        const warMessage = await message.channel.send('Chose your side!');

        const filter = () => true;

        const collector = warMessage.createReactionCollector(filter);

        collector.on('collect', (reaction) => {
            switch (reaction.emoji.name) {
                case 'bonta':
                    reaction.users.fetch().then(users => {
                        message.guild.members.fetch(users.last()).then(member => {
                            message.guild.roles.fetch(bonta).then(bontaRole => {
                                member.roles.add(bontaRole);
                            })
                        })
                    });
                    break;
                case 'brakmar':
                    reaction.users.fetch().then(users => {
                        message.guild.members.fetch(users.last()).then(member => {
                            message.guild.roles.fetch(brakmar).then(brakmarRole => {
                                member.roles.add(brakmarRole);
                            })
                        })
                    });
                    break;
                default:
                    reaction.remove();
                    break;
            }
        });
    },
};
