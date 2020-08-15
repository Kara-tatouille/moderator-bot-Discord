const {suggestionChannelId} = require('../config/config.json');

module.exports = function sendToBotChannel(client, message) {
    client.channels.fetch(suggestionChannelId).then(channel => {
        return channel.send(message);
    })
};
