module.exports = function handleXp(oldState, newState, connection) {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    connection.query(`SELECT connected_since, cumulated_connection_time FROM dofus.user WHERE discord_id = ${newState.id}`, (err, row) => {
        if (!row[0]) {
            return;
        }

        if (newState.channelID) {
            if (row[0].connected_since === null) {

                connection.query(`UPDATE user SET connected_since = "${now}" WHERE discord_id = ${newState.id}`)
            }
        } else {
            if (row[0].cumulated_connection_time === null) {
                connection.query(`UPDATE user SET cumulated_connection_time = TIMESTAMPDIFF(SECOND, connected_since, "${now}") WHERE discord_id = ${newState.id}`)
            } else {
                connection.query(`UPDATE user SET cumulated_connection_time = cumulated_connection_time + TIMESTAMPDIFF(SECOND, connected_since, "${now}") WHERE discord_id = ${newState.id}`)
            }
            connection.query(`UPDATE user SET connected_since = null WHERE discord_id = ${newState.id}`)
        }
    })
};
