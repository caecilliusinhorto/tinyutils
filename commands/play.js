const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addStringOption(option => option.setName('name').setDescription('Name of the song')),
    async execute(interaction) {
        const client = interaction.client
        const Player = require('discord-player-music');
        const player = new Player(client);
        player.voice.join('899683411155886160').then(data => {
            interaction.reply("Joined channel and playing song.")
        }).catch(error => {
            interaction.reply("An error was encountered")
        })
    },
};
