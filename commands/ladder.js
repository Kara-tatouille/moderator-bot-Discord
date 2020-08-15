const createLeaderboardMessage = require('../helper/embeds/createLeaderboardMessage');

module.exports = {
    name: 'ladder',
    description: 'Show who\'s the boss',
    cooldown: 60,
    usage: '',
    args: 0,
    offChamberOnly: true,
    execute(message, args, connection)
    {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.react('❌');

        connection.query('SELECT discord_id, xp FROM user ORDER BY xp DESC LIMIT 10', async (err, rows) => {
            const users = [];
            for (const row of rows) {
                users.push({
                    username: await message.client.users.fetch(row.discord_id).then(value => value.username),
                    xp: row.xp,
                })
            }

            const embed = createLeaderboardMessage(users, message.client);

            return message.channel.send(embed);
        })
    },
};
