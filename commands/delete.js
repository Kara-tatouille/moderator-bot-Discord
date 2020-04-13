module.exports = {
    name: 'delete',
    description: 'Bulk delete multiples messages, only avalible to moderators.',
    cooldown: 5,
    usage: '<Number of message to delete>',
    args: 1,
    guildOnly: true,
    aliases: ['del'],
    execute(message, args) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.react('❌');
        if (args[0] > 0 && args[0] <= 100 ) {
            return message.channel.bulkDelete(args[0]);
        }

        return message.channel.send('I can only delete up to 100 messages.');
    },
};