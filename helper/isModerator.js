module.exports = function isModerator(user, guild) {
    if (guild === null) return false;

    return guild.member(user).hasPermission('KICK_MEMBERS')
};
