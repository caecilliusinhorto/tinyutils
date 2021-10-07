const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('isomorphic-unfetch')
const { MessageEmbed } = require('discord.js')
const url = "https://fdo.rocketlaunch.live/json/launches/next/5";
let settings = { method: "Get" };

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rocketlaunch')
        .setDescription('What is the next rocket launch?'),
    async execute(interaction) {
        fetch(url, settings)
            .then(res => res.json())
            .then ((response) => {
                const [list] = response
                const missionname = list.name
                const provider = list.provider.name
                interaction.reply(missionname)
            });
    }
};
