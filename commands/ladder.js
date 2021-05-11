const createLeaderboardMessage = require('../helper/embeds/createLeaderboardMessage');
const leaderboard = require('../cron/leaderboard');

module.exports = {
    name: 'ladder',
    description: 'Show who\'s the boss',
    cooldown: 60,
    usage: '',
    args: 0,
    execute(message, args, connection)
    {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.react('❌');

        leaderboard(message.client)
    },
};
