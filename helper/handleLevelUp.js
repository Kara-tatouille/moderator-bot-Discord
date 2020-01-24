const {grades} = require('../config/config');


module.exports = function handleLevelUp(message, connection) {
    connection.query(`SELECT id, discord_id, username, xp FROM dofus.user WHERE discord_id = ${message.author.id}`, (err, row) => {

        if (row.length === 0) {
            return;
        }

        const xp = row[0].xp;

        switch (true) {
            case xp < 200:
                message.member.roles.remove(Object.values(grades)).then(member => {
                    member.roles.add(grades.baseRoleId)
                });
                break;
            case xp < 10000:
                message.member.roles.remove(Object.values(grades)).then(member => {
                    member.roles.add(grades.grade1Id)
                });
                break;
            case xp < 20000:
                message.member.roles.remove(Object.values(grades)).then(member => {
                    member.roles.add(grades.grade2Id)
                });
                break;
            case xp < 30000:
                message.member.roles.remove(Object.values(grades)).then(member => {
                    member.roles.add(grades.grade3Id)
                });
                break;
            case xp < 40000:
                message.member.roles.remove(Object.values(grades)).then(member => {
                    member.roles.add(grades.grade4Id)
                });
                break;
            case xp < 50000:
                message.member.roles.remove(Object.values(grades)).then(member => {
                    member.roles.add(grades.grade5Id)
                });
                break;
        }
    });
};