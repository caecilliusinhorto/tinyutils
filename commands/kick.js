const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a specified user.')
        .addUserOption(option => option.setName('target').setDescription('The user to kick')),
    async execute(interaction) {
        const member = interaction.options.getMember('target');
        if (interaction.member.permissions.has("BAN_MEMBERS")) {
            stringMember = String(member)
            member.send("You have been kicked from TinyWays.")
            member.kick(member);
            const replyEmbed = new MessageEmbed()
                .setColor("AQUA")
                .setTitle('Successfully kicked member.')
                .setDescription(stringMember)
            await interaction.reply({ embeds: [replyEmbed] });
        }
        else {
            await interaction.reply("You do not have the required permissions to execute this command!")
        }
    },
};