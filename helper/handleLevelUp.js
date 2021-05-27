const {grades} = require('../config/config');


module.exports = function handleLevelUp(message, connection) {
    connection.query(`SELECT id, discord_id, xp FROM dofus.user WHERE discord_id = ${message.author.id}`, (err, row) => {

        if (row.length === 0 || message.member === null) {
            return;
        }

        const xp = row[0].xp;
        const currentRanks = message.member.roles.cache;

        switch (true) {
            case xp < 200: // Iron
                if (currentRanks.has(grades.baseRoleId)) break;

                message.member.roles.remove(Object.values(grades)).then(member => {
                    member.roles.add(grades.baseRoleId).catch(() => console.log('Bad role id for the LevelUp handling!'))
                }).catch(() => {
                    console.log('Bad role id to remove for the LevelUp handling one of this snowflake is wrong : ' + Object.values(grades));
                });
                break;
            case xp < 1000: // Copper
                if (currentRanks.has(grades.grade1Id)) break;

                message.member.roles.remove(Object.values(grades)).then(member => {
                    member.roles.add(grades.grade1Id).catch(() => console.log('Bad role id for the LevelUp handling!'))
                }).catch(() => console.log('Bad role id to remove for the LevelUp handling one of this snowflake is wrong : ' + Object.values(grades)));
                break;
            case xp < 3000: // Silver
                if (currentRanks.has(grades.grade2Id)) break;

                message.member.roles.remove(Object.values(grades)).then(member => {
                    member.roles.add(grades.grade2Id).catch(() => console.log('Bad role id for the LevelUp handling!'))
                }).catch(() => console.log('Bad role id to remove for the LevelUp handling one of this snowflake is wrong : ' + Object.values(grades)));
                break;
            case xp < 8000: // Gold
                if (currentRanks.has(grades.grade3Id)) break;

                message.member.roles.remove(Object.values(grades)).then(member => {
                    member.roles.add(grades.grade3Id).catch(() => console.log('Bad role id for the LevelUp handling!'))
                }).catch(() => console.log('Bad role id to remove for the LevelUp handling one of this snowflake is wrong : ' + Object.values(grades)));
                break;
            case xp < 15000: // Platinium
                if (currentRanks.has(grades.grade4Id)) break;

                message.member.roles.remove(Object.values(grades)).then(member => {
                    member.roles.add(grades.grade4Id).catch(() => console.log('Bad role id for the LevelUp handling!'))
                }).catch(() => console.log('Bad role id to remove for the LevelUp handling one of this snowflake is wrong : ' + Object.values(grades)));
                break;
            case xp < 30000: // Diamond
                if (currentRanks.has(grades.grade5Id)) break;

                message.member.roles.remove(Object.values(grades)).then(member => {
                    member.roles.add(grades.grade5Id).catch(() => console.log('Bad role id for the LevelUp handling!'))
                }).catch(() => console.log('Bad role id to remove for the LevelUp handling one of this snowflake is wrong : ' + Object.values(grades)));
                break;
            case xp > 30000: // Obsidian
                if (currentRanks.has(grades.grade6Id)) break;

                message.member.roles.remove(Object.values(grades)).then(member => {
                    member.roles.add(grades.grade6Id).catch(() => console.log('Bad role id for the LevelUp handling!'))
                }).catch(() => console.log('Bad role id to remove for the LevelUp handling one of this snowflake is wrong : ' + Object.values(grades)));
                break;
        }
    });
};
