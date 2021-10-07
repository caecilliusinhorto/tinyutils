const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rick')
        .setDescription('Rickroll someone!'),
    async execute(interaction) {
        await interaction.reply('https://tenor.com/view/dance-moves-dancing-singer-groovy-gif-17029825')
    }
}