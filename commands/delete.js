module.exports = {
    name: 'delete',
    description: 'Bulk delete multiples messages',
    cooldown: 5,
    usage: '<Number of message to delete>',
    args: 1,
    aliases: ['d'],
    execute(message, args) {
        if (args[0] > 0 && args[0] <= 100 ) {
            return message.channel.bulkDelete(args[0]);
        }

        return message.channel.send('I can only delete up to 100 messages.');
    },
};