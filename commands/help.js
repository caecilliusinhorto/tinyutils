const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Learn how to use TinyUtils'),
    async execute(interaction) {
        const helpEmbed = new MessageEmbed()
            .setColor('AQUA')
            .setTitle('Click here for a full list of commands!')
            .setFooter('help for tinyutils v1.7.0 by blue')
            .setURL('https://github.com/caecilliusinhorto/tinyutils#tinyutils-discord-bot')
        await interaction.reply({ embeds: [helpEmbed] });
    }
}