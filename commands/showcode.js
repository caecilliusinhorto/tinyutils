const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('isomorphic-unfetch')
const fs = require('fs');

let commands_raw = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commands = commands_raw.map(file => {
    return file.slice(0, -3);
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('showcode')
        .setDescription('Show the code for a command')
        .addStringOption(option => option.setName('command').setDescription('Command to show the code for').setRequired(true)),
    async execute(interaction) {   
        commands.map(command => {
            if (command == interaction.options.getString('command')) {
                const settings = { method: "Get" };
                const url = `https://raw.githubusercontent.com/caecilliusinhorto/tinyutils/main/commands/${command}.js`
                fetch(url, settings)
                    .then(res => res.text())
                    .then((response) => {
                        if (response.length >= 1999) {
                            part1 = response.slice(0, 1990);
                            part2 = response.slice(1991);
                            interaction.reply(`\`\`\`js\n${part1}\n\`\`\``);
                            interaction.followUp(`\`\`\`js\n${part2}\n\`\`\``);
                        } 
                        else {
                            interaction.reply(`\`\`\`js\n${response}\n\`\`\``);
                        }
                    })
            }
        });
    },
};
