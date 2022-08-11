const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Set a warning')
        .addUserOption(option => option.setName('target').setDescription('Target to warn').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Please provide a reason').setRequired(true)),
    async execute(interaction) {
        const reason = interaction.options.getString('reason')
        const member = interaction.options.getMember('target')
        const replyEmbed = new MessageEmbed()
            .setColor('AQUA')
            .setDescription(String(member))
            .setTitle('User has been warned.')
            .setFooter('Reason:' + reason)
        if (interaction.member.permissions.has('BAN_MEMBERS')) {
            member.send(`You have recieved a warning for the following reason: ${reason}`)
            await interaction.reply({ embeds: [replyEmbed] })
        } else {
            await interaction.reply('You do not have the required permissions to execute this command.')
        }
    },
};
