const mute = require('./mute');
const ban = require('./ban');
const quote = require('./quote');
const sendToBotChannel = require('./sendToBotChannel');

module.exports = function handleAddWarning(message, connection) {
    connection.query(`SELECT * FROM dofus.user WHERE discord_id = ${message.author.id}`, (err, row) => {
        if (row.length === 0) {
            connection.query(`INSERT INTO dofus.user (discord_id, username, warning) VALUES ('${message.author.id}', '${message.author.username}', '1')`)
        } else {
            connection.query(`UPDATE dofus.user SET warning = warning + 1 WHERE discord_id = ${message.author.id}`)
        }
        row[0].warning++;

        sendToBotChannel(message.client, quote(message, `⚠ Number of warnings: ${row[0].warning}`, 0xffc107));

        let whatHappensNext, whatHappensNextFr;
        switch (row[0].warning) {
            case 1:
                whatHappensNext = 'Nothing will happen for now, but you will be muted 1 hour the next warning.';
                whatHappensNextFr = 'Rien ne se passera pour l\'instant, mais vous serez mute pendant 1 heure au prochain avertissement.';
                break;
            case 2:
                whatHappensNext = 'You have been muted for 1 hour. The next warning will mute you for 1 day.';
                whatHappensNextFr = 'Vous avez été mis en sourdine pendant une heure. Le prochain avertissement vous rendra muet pendant 1 jour.';
                mute(message.member, 3.6e+6); // 1 hour
                break;
            case 3:
                whatHappensNext = 'You have been muted for 1 day. The next warning will mute you for 2 days.';
                whatHappensNextFr = 'Vous avez été mis en sourdine pendant 1 jour. Le prochain avertissement vous rendra muet pendant 2 jours.';
                mute(message.member, 8.64e+7); // 1 day
                break;
            case 4:
                whatHappensNext = 'You have been muted for 2 days. The next warning will ban you for 1 week.';
                whatHappensNextFr = 'Vous avez été mis en sourdine pendant deux jours. Le prochain avertissement vous bannera pendant une semaine.';
                mute(message.member, 1.728e+8); // 2 days
                break;
            case 5:
                whatHappensNext = 'You have been banned for 1 week. The next warning will ban you indefinitly';
                whatHappensNextFr = 'Vous avez été interdit de séjour pendant une semaine. Le prochain avertissement vous bannera indéfiniment';
                ban(message.member, 7, '5th warning'); // 1 week
                break;
            case 6:
                whatHappensNext = 'You have been banned indefinitly.';
                whatHappensNextFr = 'Vous avez été banni définitivement.';
                ban(message.member, 0, '6th warning'); // infinite
                break;
            default:
                whatHappensNext = `Nothing will happen for now, you somehow have ${row[0].warning} warnings, this shouldn't be possible. Please contact a moderator.`;
                whatHappensNextFr = `Rien ne se passera pour l\'instant, vous réussi à avoir ${row[0].warning} avertissements d'une manière ou d'une autre, cela ne devrait pas être possible. Veuillez contacter un modérateur.`;
                console.log(`warnings : ${row[0].warning}`);
                break;
        }

        if (!message.author.bot) {
            message.author.send(`You have ${row[0].warning} warning(s). ${whatHappensNext}. \n\nVous avez ${row[0].warning} warning(s). ${whatHappensNextFr}`)
        }
    });
};
