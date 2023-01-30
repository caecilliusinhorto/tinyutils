const { SlashCommandBuilder, Embed } = require('@discordjs/builders');
const fetch = require('isomorphic-unfetch')
const { MessageEmbed } = require('discord.js');
const settings = { method: "Get" };


module.exports = {
    data: new SlashCommandBuilder()
        .setName('chess')
        .setDescription('Show the last game played by a chess.com user this month.')
        .addStringOption(option => option.setName('user').setDescription("chess.com username").setRequired(true)),
    async execute(interaction) {
        const date = new Date()
        const url = `https://api.chess.com/pub/player/${interaction.options.getString('user')}/games/${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`
        fetch(url, settings)
            .then(res => res.json())
            .then((response) => {
                const list = response
                const game = list.games[(list.games.length)-1]
                let result
                if (game.white.result == "win" && game.black.result == "checkmated") {
                    result = "White won by checkmate"
                } else if (game.white.result == "win" && game.black.result == "resigned") {
                    result = "White won by resignation"
                } else if (game.white.result == "win" && game.black.result == "timeout") {
                    result = "White won by timeout"
                } else if (game.white.result == "win" && game.black.result == "abandoned") {
                    result = "White won by abandonment"
                } else if (game.white.result == "stalemate" || game.black.result == "stalemate") {
                    result = "Stalemate"
                } else if (game.white.result == "agreed" || game.black.result == "agreed"){
                    result = "Draw by agreement"
                } else if (game.black.result == "win" && game.white.result == "checkmated") {
                    result = "Black won by checkmate"
                } else if (game.black.result == "win" && game.white.result == "resigned") {
                    result = "Black won by resignation"
                } else if (game.black.result == "win" && game.white.result == "timeout") {
                    result = "Black won by timeout"
                } else if (game.black.result == "win" && game.white.result == "abandoned") {
                    result = "Black won by abandonment"
                } else {
                    result = "n/a" 
                } // super messy and not always functional, but whatever!
                const replyEmbed = new MessageEmbed()
                    .setTitle(`${game.white.username} vs. ${game.black.username}`)
                    .addFields(
                        {name: 'White', value: `${game.white.username} (${game.white.rating})`, inline: true},
                        {name: 'Black', value: `${game.black.username} (${game.black.rating})`, inline: true},
                        {name: 'Result', value: result},
                    )
                    .setColor("AQUA")
                    .setURL(game.url)
                    .setFooter("api.chess.com")
                    .setImage(encodeURI(`https://www.chess.com/dynboard?fen=${game.fen}&size=1`))
                    .setTimestamp()
                interaction.reply({ embeds: [replyEmbed] })
            });
        
    }
}
