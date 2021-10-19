const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { memberRole } = require('../config.json')
//See index.js for what values should be in config.json

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verification.'),
    async execute(interaction) {
        const member = interaction.member
        const replyEmbed = new MessageEmbed()
            .setColor("AQUA")
            .setTitle("Successfuly verified user.")
            .setDescription(String(interaction.user))
            .setFooter('This means you can talk now, head to a channel and have fun!')
            .setImage(interaction.user.displayAvatarURL({ dynamic: true }))
        member.roles.add(memberRole)
        await interaction.reply({ embeds: [replyEmbed] });
    },
};
