const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('isomorphic-unfetch')
const { MessageEmbed } = require('discord.js')
let url = "https://fdo.rocketlaunch.live/json/launches/next/5.json";
let settings = { method: "Get" };

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rocketlaunch')
        .setDescription('What is the next rocket launch?'),
    async execute(interaction) {
        fetch(url, settings)
            .then(res => res.json())
            .then((response) => {
                const [list] = Array(response)
                const [mission] = list.result
                const replyEmbed = new MessageEmbed()
                    .setTitle(mission.name)
                    .setDescription(mission.launch_description)
                    .addField('Vehicle', mission.vehicle.name)
                    .addFields(
                        { name: 'Provider', value: mission.provider.name, inline: true },
                        { name: "Launchsite", value: mission.pad.location.name, inline: true },
                        { name: "Country", value: mission.pad.location.country, inline: true }
                    )
                    .addField('Launch Day',mission.date_str)
                    .setTimestamp()
                    .setFooter("Data from rocketlaunch.live")
                    .setColor("AQUA")
                interaction.reply({ embeds: [replyEmbed] })
            }); 
    }
}
