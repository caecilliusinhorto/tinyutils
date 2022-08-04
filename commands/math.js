const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const  math  = require('mathjs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calc')
        .setDescription('Calculate a mathematical expression')
        .addStringOption(option => option.setName('value').setDescription('What to calculate')),
    async execute(interaction) {
        const value = interaction.options.getString('value');
        try {
            const reply = String(math.evaluate(value))
            const embed = new MessageEmbed()
                .setTitle(reply)
                .setFooter(value)
                .setColor("AQUA")
            await interaction.reply({ embeds: [embed] });
        } catch (err) {
            const embed = new MessageEmbed()
                .setTitle("There was an error.")
                .setFooter(value)
                .setAuthor("Please try again")
                .setColor("AQUA")
            await interaction.reply({ embeds: [embed] });
        }
    },
};
