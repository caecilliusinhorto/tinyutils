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
                const memeAuthor = post.data.author
                const title = post.data.title
                const imageURL = String(post.data.url);
                const fullAuthor = String('u/' + memeAuthor) //this is the only way i can think of to get a proper reddit style username 
                const permalink = post.data.permalink
                const permalinkURL = String('https://www.reddit.com' + permalink)
                const memeEmbed = new MessageEmbed()
                    .setColor('DARK_BUT_NOT_BLACK')
                    .setTitle(title)
                    .setAuthor('r/memes')
                    .setImage(imageURL)
                    .setDescription(fullAuthor)
                    .setURL(permalinkURL)
                    .setFooter('Click on title to view Reddit post')
                interaction.reply({ embeds: [memeEmbed] });
            });
    }
}
