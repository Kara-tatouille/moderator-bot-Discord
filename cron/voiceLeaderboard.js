const {suggestionChannelId} = require('../config/config.json')
const mysql = require('mysql');
const mysqlConfig = require('../config/mysql');
const createVoiceLeaderboardMessage = require('../helper/embeds/createVoiceLeaderboardMessage');

module.exports = async function (client) {
    const connection = mysql.createConnection(mysqlConfig);
    connection.connect();
    await connection.query('SELECT discord_id, cumulated_connection_time FROM user ORDER BY cumulated_connection_time DESC LIMIT 10', async (err, rows) => {
        const users = [];
        for (const row of rows) {
            users.push({
                username: await client.users.fetch(row.discord_id).then(value => value.tag),
                cumulated_connection_time: row.cumulated_connection_time,
            });
        }

        const embed = createVoiceLeaderboardMessage(users, client);
        const channel = await client.channels.fetch(suggestionChannelId);

        channel.send(embed).finally(() => process.exit());
    })
}
