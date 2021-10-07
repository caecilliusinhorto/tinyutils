const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Is the bot up?'),
	async execute(interaction) {
		await interaction.reply('Test Works!');
	},
};
