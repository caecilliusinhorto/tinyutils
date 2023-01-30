const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('isomorphic-unfetch')
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wiki')
        .setDescription('Search for a wikipedia article')
        .addStringOption(option => option.setName('query').setDescription('What to search for').setRequired(true))
        .addStringOption(option => option.setName('language').setDescription('Language to search in (ISO639-1 codes, use \'en\' for English.').setRequired(true)),
        
    async execute(interaction) {
        const search = interaction.options.getString('query');
        const language = interaction.options.getString('language');
        fetch(`https://${language}.wikipedia.org/w/api.php?action=opensearch&search=${search}&format=json`, { method: "Get" })
            .then(res => res.json())
            .then((response) => {
                const [data] = Array(response);
                const [list] = Array(data[3])
                const otherlinks = String(list[1] + " " + list[2] + " " + list[3])
                const replyEmbed = new MessageEmbed()
                    .setColor("AQUA")
                    .setTitle("Other possible articles:")
                    .setDescription(otherlinks)
                interaction.reply(list[0])
                if (list[1] != null) {
                    interaction.followUp({ embeds: [replyEmbed] })
                }
            })
    },
};