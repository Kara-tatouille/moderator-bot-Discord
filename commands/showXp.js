const ordinalSuffix = require('../helper/ordinalSuffix');


module.exports = {
    name: 'xp',
    description: 'Show your xp',
    cooldown: 60,
    usage: 'xp',
    args: 0,
    aliases: [],
    offChamberOnly: true,
    execute(message, args, connection) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.react('❌');

        connection.query(`SELECT xp FROM user WHERE discord_id = ${message.author.id}`, (firstErr, firstRow) => {
            if (firstRow.length === 0) {
                return;
            }

            connection.query(`SELECT id FROM user WHERE xp >= ${firstRow[0].xp}`, (secondErr, secondRow) => {
                if (secondRow.length === 0) {
                    return;
                }

                message.channel.send(`Hello ${message.author.username}. You currently have ${firstRow[0].xp} xp. You are ${ordinalSuffix(secondRow.length)} in the ladder.`)
            })
        })
    },
};
