const fetch = require('isomorphic-unfetch')
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');


let settings = { method: "Get" };

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reddit')
        .setDescription('Select a subreddit, and this will return a random post.')
        .addStringOption(option => option.setName('subreddit').setDescription('Subreddit name, e.g. r/memes')),
    async execute(interaction) {
        const subreddit = interaction.options.getString('subreddit')
        const url = `https://www.reddit.com/${subreddit}/random.json`;
        fetch(url, settings)
            .then(res => res.json())
            .then((response) => {
                const [list] = response
                const [post] = list.data.children;
                const nsfw = post.data.over_18;
                if (nsfw === false) {
                    const replyEmbed = new MessageEmbed()
                        .setColor('AQUA')
                        .setTitle(post.data.title)
                        .setAuthor(subreddit)
                        .setImage(post.data.url)
                        .setDescription('u/' + post.data.author)
                        .setURL(`https://www.reddit.com/${post.data.permalink}`)
                        .setFooter('Click on title to view Reddit post')
                    interaction.reply({ embeds: [replyEmbed] });
                } else {
                    const replyEmbed = new MessageEmbed()
                        .setColor('AQUA')
                        .setTitle("Bonk! Go to horny jail.")
                        .setDescription("NSFW subreddits are blocked.")
                    interaction.reply({ embeds: [replyEmbed] })
                }
            
            });
        }  
    }
