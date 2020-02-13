const {suggestionChannelId} = require('../config/config');
const Discord = require('discord.js');


module.exports = function handleSuggestion(message) {
    message.client.channels.fetch(suggestionChannelId).then(channel => {
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setDescription(message.content)
            .setImage(message.attachments.first() ? message.attachments.first().proxyURL : '')
            .setTimestamp(message.createdTimestamp)
            .setColor(0xC678DD)
        ;

        return channel.send(embed);
    })
};
