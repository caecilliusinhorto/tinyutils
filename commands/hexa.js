const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hexcode')
        .setDescription('Enter a hex colour code and this will return the correct colour')
        .addStringOption(option => option.setName('hexcode').setDescription('Enter a valid hex code (e.g. ff7d7d)').setRequired(true)),
    async execute(interaction) {
        const search = interaction.options.getString('hexcode')
        try {
            const reply = new MessageEmbed()
                .setTitle('#' + search)
                .setColor('AQUA')
                .setImage(`https://www.colorhexa.com/${search}.png`)
            await interaction.reply({ embeds: [reply] })
        } catch (err) {
            interaction.reply("Invalid code. Please make sure it is in hex form.")
        }
    },
};
