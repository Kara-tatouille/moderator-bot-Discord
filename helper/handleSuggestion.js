const quote = require('./embeds/quote');
const sendToBotChannel = require('./sendToBotChannel');
const {prefix} = require('../config/config.json');


module.exports = function handleSuggestion(message) {
    if (message.author.bot || message.content.startsWith(prefix)) return;

    sendToBotChannel(message.client, quote(message))
};
