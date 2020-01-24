module.exports = function handleXp(user, connection) {
    console.log(user);
    connection.query(`SELECT * FROM dofus.user WHERE discord_id = ${user.id}`, (err, row) => {
        if (row.length === 0) { // Create row for new user
            connection.query(`INSERT INTO dofus.user (discord_id, username, xp) VALUES ('${user.id}', '${user.username}', '10')`)
        } else { // Add 10 xp
            connection.query(`UPDATE dofus.user SET xp = xp + 10 WHERE discord_id = ${user.id}`)
        }
    });

};