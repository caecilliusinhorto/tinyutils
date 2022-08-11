const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a specified user.')
        .addUserOption(option => option.setName('target').setDescription('The user to kick').setRequired(true)),
    async execute(interaction) {
        const member = interaction.options.getMember('target');
        if (interaction.member.permissions.has("BAN_MEMBERS")) {
            member.send("You have been kicked.")
            await member.kick(member);
            const replyEmbed = new MessageEmbed()
                .setColor("AQUA")
                .setTitle('Successfully kicked member.')
                .setDescription(String(member))
            await interaction.reply({ embeds: [replyEmbed] });
        }
        else {
            await interaction.reply("You do not have the required permissions to execute this command!")
        }
    },
};