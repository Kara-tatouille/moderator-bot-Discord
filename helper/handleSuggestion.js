const quote = require('./quote');
const sendToBotChannel = require('./sendToBotChannel');


module.exports = function handleSuggestion(message) {
    if (message.author.bot) return;

    sendToBotChannel(message.client, quote(message))
};
