const Discord = require('discord.js');


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
            const users = []
            for (const row of rows) {
                users.push({
                    username: await message.client.users.fetch(row.discord_id).then(value => value.username),
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
                .setTimestamp(message.createdTimestamp)
                .setColor(0x309AD4)
            ;

            return message.channel.send(embed);
        })
    },
};
