const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { execute } = require('./meme.js') 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a specified user.')
        .addUserOption(option => option.setName('target').setDescription('The user you want to mute.')),
    async execute(interaction) {
        const member = interaction.options.getMember('target');
        if (interaction.member.permissions.has('BAN_MEMBERS')) {
            stringMember = String(member)
            member.send("You have been muted in TinyWays.")
            member.roles.remove('879817525607673877');
            member.roles.add('880872655174111302');
            const replyEmbed = new MessageEmbed()
                .setColor("AQUA")
                .setTitle('Successfully muted member. To unmute them please use /unmute.')
                .setDescription(stringMember)
            await interaction.reply({ embeds: [replyEmbed] });
        }
        else{
            await interaction.reply('You do not have the required permissions to execute this command')
        }
    }
}