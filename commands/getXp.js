const ordinalSuffix = require('../helper/ordinalSuffix');


module.exports = {
    name: 'getXp',
    description: 'Show xp of target username',
    cooldown: 30,
    usage: 'user-id',
    args: 1,
    aliases: ['getxp'],
    offChamberOnly: true,
    async execute(message, args, connection) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.react('❌');

        let target;
        try {
            target = (await message.guild.members.fetch({query: args[0], limit: 1})).first()
        } catch (e) {
            return message.channel.send('Utilisateur non trouvé / User not found')
        }
        if (!target) {
            return message.channel.send('Utilisateur non trouvé / User not found')
        }

        connection.query(`SELECT xp FROM user WHERE discord_id = ${target.id}`, (firstErr, firstRow) => {
            if (firstRow.length === 0) {
                return;
            }

            connection.query(`SELECT id FROM user WHERE xp >= ${firstRow[0].xp}`, (secondErr, secondRow) => {
                if (secondRow.length === 0) {
                    return;
                }

                message.channel.send(`${message.author.username} currently has ${firstRow[0].xp} xp. they are ${ordinalSuffix(secondRow.length)} in the ladder.`)
            })
        })
    },
};
