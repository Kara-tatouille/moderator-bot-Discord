const {grades} = require('../config/config');

module.exports = function mute(member, duration) {
    member.roles.add(grades.muted).catch((e) => {
        console.log('cannot mute : ' + e.message);
    });
    setTimeout(function () {
        member.roles.remove(grades.muted).catch((e) => {
            console.log('cannot unmute : ' + e.message);
        });
    }, duration)
};
