module.exports = function ban(member, days, reason) {
    member.ban({days: days, reason: reason}).catch(function (e) {
        console.log('Can\'t ban : ' + e.message)
    });
};
