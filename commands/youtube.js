const { SlashCommandBuilder } = require('@discordjs/builders');
const YouTube = require("discord-youtube-api");
const { apiKey } = require('../config.json');
const youtube = new YouTube(apiKey);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('youtube')
        .setDescription('Search for a youtube video.')
        .addStringOption(option => option.setName('search').setDescription('What do you want to search for?').setRequired(true)),
    async execute(interaction) {
        const search = interaction.options.getString('search')
        const video = await youtube.searchVideos(search)
        await interaction.reply(video.url);
    },
};
