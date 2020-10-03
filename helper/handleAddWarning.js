const mute = require('./mute');
const ban = require('./ban');
const quote = require('./embeds/quote');
const sendToBotChannel = require('./sendToBotChannel');
const {prefix} = require('../config/config.json')

module.exports = async function handleAddWarning(message, connection, discordUser, negative = false) {
    if (message.content[0] !== prefix && (
        !message.member || message.member.hasPermission('KICK_MEMBERS') || message.author.bot
    )) {
        return await message.delete();
    }

    const warningNumber = negative ? -1 : 1;

    connection.query(`SELECT * FROM dofus.user WHERE discord_id = ${discordUser.id}`, async (err, row) => {
        if (row[0].warning === 0 && negative) {
            return await message.react('🚫');
        }
        if (row.length === 0) {
            connection.query(`INSERT INTO dofus.user (discord_id, warning, xp) VALUES ('${discordUser.id}', '1', '0')`)
        } else {
            connection.query(`UPDATE dofus.user SET warning = warning + ${warningNumber} WHERE discord_id = ${discordUser.id}`)
        }
         row[0].warning += warningNumber;

        sendToBotChannel(message.client, quote(message, `⚠ Number of warnings: ${row[0].warning}`, 0xffc107));

        let whatHappensNext, whatHappensNextFr;
        if (negative) {
            discordUser.send(`You have been removed 1 warning, you have ${row[0].warning} warnings left.\n\n1 avertissement vous as été retiré, il vous reste ${row[0].warning} avertissements.`)
            return await message.delete();
        }

        const member = await message.guild.members.fetch(discordUser);

        switch (row[0].warning) {
            case 1:
                whatHappensNext = 'Nothing will happen for now, but you will be muted 1 hour the next warning.';
                whatHappensNextFr = 'Rien ne se passera pour l\'instant, mais vous serez mute pendant 1 heure au prochain avertissement.';
                break;
            case 2:
                whatHappensNext = 'You have been muted for 1 hour. The next warning will mute you for 1 day.';
                whatHappensNextFr = 'Vous avez été mis en sourdine pendant une heure. Le prochain avertissement vous rendra muet pendant 1 jour.';
                mute(member, 3.6e+6); // 1 hour
                break;
            case 3:
                whatHappensNext = 'You have been muted for 1 day. The next warning will mute you for 2 days.';
                whatHappensNextFr = 'Vous avez été mis en sourdine pendant 1 jour. Le prochain avertissement vous rendra muet pendant 2 jours.';
                mute(member, 8.64e+7); // 1 day
                break;
            case 4:
                whatHappensNext = 'You have been muted for 2 days. The next warning will ban you for 1 week.';
                whatHappensNextFr = 'Vous avez été mis en sourdine pendant deux jours. Le prochain avertissement vous bannera pendant une semaine.';
                mute(member, 1.728e+8); // 2 days
                break;
            case 5:
                whatHappensNext = 'You have been banned for 1 week. The next warning will ban you indefinitly';
                whatHappensNextFr = 'Vous avez été interdit de séjour pendant une semaine. Le prochain avertissement vous bannera indéfiniment';
                ban(member, 7, '5th warning'); // 1 week
                break;
            case 6:
                whatHappensNext = 'You have been banned indefinitly.';
                whatHappensNextFr = 'Vous avez été banni définitivement.';
                ban(member, 0, '6th warning'); // infinite
                break;
            default:
                whatHappensNext = `Nothing will happen for now, you somehow have ${row[0].warning} warnings, this shouldn't be possible. Please contact a moderator.`;
                whatHappensNextFr = `Rien ne se passera pour l\'instant, vous réussi à avoir ${row[0].warning} avertissements d'une manière ou d'une autre, cela ne devrait pas être possible. Veuillez contacter un modérateur.`;
                console.log(`warnings : ${row[0].warning}`);
                break;
        }

        discordUser.send(`You have ${row[0].warning} warning(s). ${whatHappensNext}. \n\nVous avez ${row[0].warning} warning(s). ${whatHappensNextFr}`)
        return await message.delete();
    });
};
