const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Learn how to use TinyUtils'),
    async execute(interaction) {
        const helpEmbed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setTitle('Click here for a full list of commands!')
            .setFooter('help for tinyutils v1.4.2 by blue')
            .setURL('https://discord.com/channels/879772643031670874/883408578466152459/883408972768493598')
        await interaction.reply({ embeds: [helpEmbed] });
    }
}