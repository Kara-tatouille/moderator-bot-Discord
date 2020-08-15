const Discord = require('discord.js');

module.exports = function createLeaderboardMessage(users, client) {
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

    return new Discord.MessageEmbed()
        .addFields(embedFields)
        .setFooter('Current ladderboard')
        .setTimestamp(client.createdTimestamp)
        .setColor(0x309AD4)
    ;
}
