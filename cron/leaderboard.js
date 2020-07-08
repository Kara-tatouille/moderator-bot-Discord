const Discord = require('discord.js');
const client = new Discord.Client();
const {suggestionChannelId, token} = require('../config/config.json')
const mysql = require('mysql');
const mysqlConfig = require('../config/mysql');

const connection = mysql.createConnection(mysqlConfig);
connection.connect();

connection.query('SELECT discord_id, xp FROM user ORDER BY xp DESC LIMIT 10', async (err, rows) => {

    const users = []
    for (const row of rows) {
        users.push({
            username: await client.users.fetch(row.discord_id).then(value => value.username),
            xp: row.xp,
        })
    }

    let embedFields = []
    for (let i = 0; i < users.length; i++) {
        if (i <= 2) {
            embedFields.push({
                name: i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉',
                value: `${users[i].username} - ${users[i].xp} xp`,
                inline: false,
            })
        } else {
            if (embedFields[3] === undefined) {
                embedFields.push({
                    name: 'Others',
                    value: '',
                    inline: false,
                })
            }
            embedFields[3].value += `${users[i].username} - ${users[i].xp} xp\n`;
        }
    }

    const embed = new Discord.MessageEmbed()
        .addFields(embedFields)
        .setFooter('Current ladderboard')
        .setTimestamp(client.createdTimestamp)
        .setColor(0x309AD4)
    ;

    const channel = await client.channels.fetch(suggestionChannelId);

    console.log('done.');
    return channel.send(embed);
})

client.login(token);
