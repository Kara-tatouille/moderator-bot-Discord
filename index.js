const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token, offChambersId} = require('./config/config');
const mysql = require('mysql');
const mysqlConfig = require('./config/mysql');
const handleXp = require('./helper/handleXp');
const handleLevelUp = require('./helper/handleLevelUp');
const handleSuggestion = require('./helper/handleSuggestion');
const handleAddWarning = require('./helper/handleAddWarning');
const isModerator = require('./helper/isModerator');
const test = require('./helper/test');


const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

// Dynamically set commands to the Collection client.commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
}

//Mysql connection
const connection = mysql.createConnection(mysqlConfig);
connection.connect();

// Launch event
client.once('ready', () => {
    console.log(`Logged in as "${client.user.tag}"!`);
});

client.on('messageReactionAdd', ((reaction, user) => {
    const guild = reaction.message.guild;

    if (reaction.emoji.name === '⚠️' && isModerator(user, guild)) {
        console.log(reaction.users.cache.last().username + ' warned ' + reaction.message.author.username);
        handleAddWarning(reaction.message, connection);
    }
}));

// Message event
client.on('message', message => {
    if (message.author.id === '244929988103503872') {
        test(message);
    }

    if (message.channel.type !== 'text') {
        handleSuggestion(message);
    } else {
        handleXp(message, connection);
        handleLevelUp(message, connection);
    }


    // Early return if message doesn't start with prefix or author is a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Retrieve command name and arguments from the message
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // The actual command object
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // Early return if command isn't found
    if (!command) return;

    // Early return if command is used inside DM instead of in a guild
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.offChamberOnly && !offChambersId.includes(message.channel.id)) {
        return message.react('❌')
    }

    // Early return if the command require arguments but there is none
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (args.length > command.args) {
        return message.channel.send(`Too many arguments used, please use only ${command.args}.`);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000; // 3s default

    // Early return if the author is in the timestamps collection
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    // Sets the author in the timestamps collection for cooldownAmount * 1000 ms
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    /*/- Launch the magic! -/*/
    try {
        command.execute(message, args, connection);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.login(token);
