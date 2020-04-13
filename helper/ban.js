module.exports = function ban(member, days, reason) {
    member.ban({days: days, reason: reason});
};
