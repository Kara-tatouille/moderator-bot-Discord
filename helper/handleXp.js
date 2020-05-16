module.exports = function handleXp(message, connection) {
    connection.query(`SELECT * FROM dofus.user WHERE discord_id = ${message.author.id}`, (err, row) => {
        if (message.content.length <= 4) {
            return;
        }

        if (row.length === 0) { // Create row for new user
            try {
                connection.query(`INSERT INTO dofus.user (discord_id, xp) VALUES ('${message.author.id}', '1')`)
            } catch (e) {
                console.log(e)
            }
        } else { // Add 10 xp
            try {
                connection.query(`UPDATE dofus.user SET xp = xp + 1 WHERE discord_id = ${message.author.id}`)
            } catch (e) {
                console.log(e)
            }
        }
    });
};
