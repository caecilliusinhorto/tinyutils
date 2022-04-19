const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('isomorphic-unfetch')
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wiki')
        .setDescription('Search for a wikipedia article')
        .addStringOption(option => option.setName('query').setDescription('What to search for').setRequired(true)),
    async execute(interaction) {
        const search = interaction.options.getString('query');
        fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${search}&format=json`, { method: "Get" })
            .then(res => res.json())
            .then((response) => {
                const [data] = Array(response);
                const [list] = Array(data[3])
                const link1 = list[0]
                const link2 = list[1]
                const link3 = list[2]
                const link4 = list[3]
                const otherlinks = String(link2 + " " + link3 + " " + link4)
                const replyEmbed = new MessageEmbed()
                    .setColor("AQUA")
                    .setTitle("Other possible articles:")
                    .setDescription(otherlinks)
                interaction.reply(link1)
                interaction.followUp({ embeds: [replyEmbed] })
            })
    },
};