const {grades} = require('../config/config');

module.exports = function mute(member, duration) {
    member.roles.add(grades.muted);
    setTimeout(function () {
        member.roles.remove(grades.muted);
    }, duration)
};