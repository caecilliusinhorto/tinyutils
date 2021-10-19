const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a specified user.')
        .addUserOption(option => option.setName('target').setDescription('The user to ban')),
    async execute(interaction) {
        const member = interaction.options.getMember('target');
        if (interaction.member.permissions.has("BAN_MEMBERS")) {
            member.send("You have been banned.")
            member.ban(member);
            const replyEmbed = new MessageEmbed()
                .setColor("AQUA")
                .setTitle('Successfully banned member.')
                .setDescription(String(member))
            await interaction.reply({ embeds: [replyEmbed] });
        }
        else {
            await interaction.reply({ content: 'You do not have the required permissions to execute this command!', ephemeral: true });
        }
    },
};