// This is literally just recycled code from mute but with the name changed.
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
//See index.js for what values should be in config.json
const { mutedRole } = require('../config.json')
const { memberRole } = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmute a specified user.')
        .addUserOption(option => option.setName('target').setDescription('The user you want to unmute.')),
    async execute(interaction) {
        const member = interaction.options.getMember('target');
        if (interaction.member.permissions.has('BAN_MEMBERS')) {
            member.send('You have been unmuted.')
            member.roles.remove(mutedRole);
            member.roles.add(memberRole);
            const replyEmbed = new MessageEmbed()
                .setColor("AQUA")
                .setTitle('Successfully unmuted member.')
                .setDescription(String(member))
            await interaction.reply({ embeds: [replyEmbed] });
        }
        else{
            await interaction.reply('You do not have the required permissions to execute this command')
        }
    }
}