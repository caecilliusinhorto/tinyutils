/* eslint-disable no-unused-vars */
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { version } = require('./package.json')
const { token } = require('./config.json');
const startupMessage = 'Bot online \nVersion ' + version
const activity = "TinyUtils v" + version
const { botChannel } = require('./config.json')

/*These values are in config.json which should look something like this:
{
	"token":"your bot token here",
	"clientId": "your client ID here",
	"guildId": "your guild ID here",
	"apiKey": "your youtube api key here",
	"botChannel": "channel for bot messages",
	"memberRole": "role for verified members",
	"mutedRole": "role for muted members"
}
*/

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })


client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}



//Command line interface
var readline = require('readline')
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
function interface() {
	rl.question("> ", function (a) {
		if (a === "help") {
			console.log("All possible commands: \n help - shows this page \n status - show bot status \n stop - stop the bot")
			interface()
		} if (a === "stop") {
			console.log("Stopped Bot")
			rl.close();
			process.exit()
		} if (a === "status") {
			console.log("Bot is online: \n Version: " + version + "\n Username: " + client.user.username + "\n Startup message channel: " + botChannel)
			interface()
		} else if (a !== "help") {
			console.log("Invalid Command: " + a)
			interface()
		}
	});

}

//Startup

client.once('ready', () => {
	console.log('Bot Ready:');
	console.log(client.user.username);
	console.log(version)
	client.user.setActivity(activity, { type: 'PLAYING' });
	const channel = client.channels.cache.get(botChannel)
	channel.send(startupMessage)
	console.log("Welcome to Tinyutils!  Type \"help\" for more. \n")
	interface()
});

//Interaction Handling

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Something went wrong. Please start a support ticket and specify which command caused an error.', ephemeral: true });
	}
});


client.login(token);