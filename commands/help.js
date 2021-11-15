const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { version } = require('../package.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Learn how to use TinyUtils'),
    async execute(interaction) {
        const helpEmbed = new MessageEmbed()
            .setColor('AQUA')
            .setTitle('Click here for a full list of commands!')
            .setFooter('help for tinyutils v' + version + ' by hello_and_goodbye#3114')
            .setURL('https://caecilliusinhorto.github.io/tinyutils/')
            .setImage('https://github.com/caecilliusinhorto/tinyutils/blob/main/profile.png')
        await interaction.reply({ embeds: [helpEmbed] });
    }
}