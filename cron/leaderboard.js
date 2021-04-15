const {suggestionChannelId} = require('../config/config.json')
const mysql = require('mysql');
const mysqlConfig = require('../config/mysql');
const createLeaderboardMessage = require('../helper/embeds/createLeaderboardMessage');

module.exports = function (client) {
    const connection = mysql.createConnection(mysqlConfig);
    connection.connect();
    connection.query('SELECT discord_id, xp FROM user ORDER BY xp DESC LIMIT 10', async (err, rows) => {
        const users = []
        for (const row of rows) {
            users.push({
                username: await client.users.fetch(row.discord_id).then(value => value.tag),
                xp: row.xp,
            })
        }

        const embed = createLeaderboardMessage(users, client);
        const channel = await client.channels.fetch(suggestionChannelId);

        channel.send(embed).finally(() => process.exit());
    })
}
