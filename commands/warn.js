const handleAddWarning = require('../helper/handleAddWarning');

module.exports = {
    name: 'warn',
    description: 'Warn (or un-warn) an user',
    cooldown: 0,
    usage: '<DiscordId> - (optional)',
    args: 2,
    aliases: [],
    async execute(message, args, connection) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.react('❌');
        if (!parseInt(args[0])) return message.react('🚫');

        let discordUser;
        try {
            discordUser = await message.client.users.fetch(args[0]);
        } catch (e) {
            return message.react('🚫')
        }

        const negative = args[1] === '-';

        return handleAddWarning(message, connection, discordUser, negative);
    },
};
