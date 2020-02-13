#What does this bot do?

This bot count each time someone post a message and gives xp. Then grant a role depending on your xp. The steps are:
- 0xp - 20xp
- 20xp - 1000xp
- 1000xp - 2000xp
- 2000xp - 3000xp
- 3000xp - 4000xp
- 4000xp - 5000xp
- 5000xp and onward

**If you send a direct message to the bot, it will be transfered to a chosen channel!**

This bot also grant a base role to anyone who react to a specific message (see commands).

#Commands

```
makeRules <message-ID>
```
Adds the base role defined in config.json to anyone who react with any emoji to the message with the given ID

```
help <command>
```
Gives info/help on specific command, leave blank to recive a DM with every commands

```
ping
```
Pong!

#How to install

- Run `npm install`

- create the files `config/config.json` and `config/mysql.json` based on their dist copies. You **NEED** to create the appropriates roles/channels in `config.json`, or the bot won't work.

- Launch index.js with `node index.js`