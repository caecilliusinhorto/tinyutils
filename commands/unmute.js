// This is literally just recycled code from mute but with the name changed.
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmute a specified user.')
        .addUserOption(option => option.setName('target').setDescription('The user you want to unmute.')),
    async execute(interaction) {
        const member = interaction.options.getMember('target');
        if (interaction.member.permissions.has('BAN_MEMBERS')) {
            stringMember = String(member)
            member.send('You have been unmuted in TinyWays.')
            member.roles.remove('880872655174111302');
            member.roles.add('879817525607673877');
            const replyEmbed = new MessageEmbed()
                .setColor("AQUA")
                .setTitle('Successfully unmuted member.')
                .setDescription(stringMember)
            await interaction.reply({ embeds: [replyEmbed] });
        }
        else{
            await interaction.reply('You do not have the required permissions to execute this command')
        }
    }
}