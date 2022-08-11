const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
//See index.js for what values should be in config.json
const { memberRole } = require('../config.json')
const { mutedRole } = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a specified user.')
        .addUserOption(option => option.setName('target').setDescription('The user you want to mute.').setRequired(true)),
    async execute(interaction) {
        const member = interaction.options.getMember('target');
        if (interaction.member.permissions.has('BAN_MEMBERS')) {
            member.send("You have been muted.")
            member.roles.remove(memberRole);
            member.roles.add(mutedRole);
            const replyEmbed = new MessageEmbed()
                .setColor("AQUA")
                .setTitle('Successfully muted member. To unmute them please use /unmute.')
                .setDescription(String(member))
            await interaction.reply({ embeds: [replyEmbed] });
        }
        else{
            await interaction.reply('You do not have the required permissions to execute this command')
        }
    }
}