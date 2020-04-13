const Discord = require('discord.js');

module.exports = function quote(message) {
    return new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setDescription(message.content)
        .setImage(message.attachments.first() ? message.attachments.first().proxyURL : '')
        .setTimestamp(message.createdTimestamp)
        .setColor(0xC678DD)
    ;
};