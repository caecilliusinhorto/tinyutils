const  fetch  =  require('isomorphic-unfetch')
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
let url = "https://www.reddit.com/r/memes/random.json";

let settings = { method: "Get" };

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Fetches a random meme from r/memes'),
    async execute(interaction) {
        fetch(url, settings)
            .then(res => res.json())
            .then((response) => {
                const [list] = response 
                const [post] = list.data.children; 
                const memeEmbed = new MessageEmbed()
                    .setColor('AQUA')
                    .setTitle(post.data.title)
                    .setAuthor('r/memes')
                    .setImage(post.data.url)
                    .setDescription(`u/${post.data.author}`)
                    .setURL(`https://www.reddit.com/${post.data.permalink}`)
                    .setFooter('Click on title to view Reddit post')
                interaction.reply({ embeds: [memeEmbed] });
            });
    }
}
