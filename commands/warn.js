const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Set a warning')
        .addUserOption(option => option.setName('target').setDescription('Target to warn'))
        .addStringOption(option => option.setName('reason').setDescription('Please provide a reason')),
    async execute(interaction) {
        const reason = interaction.options.getString('reason')
        const member = interaction.options.getMember('target')
        const replyreason = String('Reason: '  + reason)
        const stringMember = String(member)
        const dmReply = String('You have been warned in TinyWays for the following reason: ' + reason)
        const replyEmbed = new MessageEmbed()
            .setColor('AQUA')
            .setDescription(stringMember)
            .setTitle('User has been warned.')
            .setFooter(replyreason)
        if (interaction.member.permissions.has('BAN_MEMBERS')) {
            member.send(dmReply)
            await interaction.reply({ embeds: [replyEmbed] })
        } else {
            await interaction.reply('You do not have the required permissions to execute this command.')
        }
    },
};
