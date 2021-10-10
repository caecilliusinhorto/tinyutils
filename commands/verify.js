const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verification.'),
    async execute(interaction) {
        const StringMember = String(interaction.user)
        const member = interaction.member
        const replyEmbed = new MessageEmbed()
            .setColor("AQUA")
            .setTitle("Successfuly verified user.")
            .setDescription(StringMember)
            .setFooter('This means you can talk now, head to a channel and have fun!')
            .setImage(interaction.user.displayAvatarURL({ dynamic: true }))
        member.roles.add('879817525607673877')
        await interaction.reply({ embeds: [replyEmbed] });
    },
};
