const Discord = require('discord.js');

module.exports = function quote(message, extraText = '', color = 0x309AD4) {
    if (extraText !== '') extraText = "\n----------\n" + extraText;

    return new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setDescription(message.content + extraText)
        .setImage(message.attachments.first() ? message.attachments.first().proxyURL : '')
        .setFooter(message.channel.type === 'text' ? `In #${message.channel.name}` : 'In direct messages')
        .setTimestamp(message.createdTimestamp)
        .setColor(color)
    ;
};
