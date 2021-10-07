/* eslint-disable no-unused-vars */
//TinyUtils discord bot version v1.4.2
const { version } = require('./package.json')
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })


client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Bot Ready:');
    console.log(client.user.username);
	console.log(version)
	client.user.setActivity('TinyUtils v1.4.2', { type: 'PLAYING' }); 
	const channel = client.channels.cache.get('883375611832320001')
	channel.send('Bot online: v1.4.2')

});

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