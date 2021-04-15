const Discord = require('discord.js');
const leaderboard = require('./leaderboard');
const client = new Discord.Client();
const {token} = require('../config/config.json');

client.login(token);
leaderboard(client);
