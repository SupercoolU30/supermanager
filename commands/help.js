const Discord = require('discord.js');

exports.run = async (client, message, args) => {
   const e = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('SuperManager Help')
        .setDescription('Please take a look to your direct messages!')
        .setTimestamp()
        .setFooter('SuperManager', 'https://cdn.discordapp.com/attachments/843626534253363290/843626772879638568/supermanager-logo.png');
        const helpembed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setThumbnail('https://cdn.discordapp.com/attachments/843626534253363290/843626772879638568/supermanager-logo.png')
        .setTitle('SuperManager Help')
        .setDescription('Here my list of commands.\n \n 🎮**Roblox Commands**🎮 \n sm!verify | Verify yourself on the server. \n sm!update | Updates certain user in the discord. \n \n 📑**Moderation**📑 \n ***Coming soon...***\n \n 📑**Other Commands**📑\n sm!botinfo | Gets the bot info. \n sm!serverinfo | Gets the server info. \n \n 📣**Setup (COMING SOON)**📣 \n sm!setup roblox | Sets up your verification command. \n sm!setup discord | Sets up the discord server moderation with the command. \n \n')
        .setTimestamp()
        .setFooter('SuperManager', 'https://cdn.discordapp.com/attachments/843626534253363290/843626772879638568/supermanager-logo.png');
    
        message.author.send(helpembed);
        return message.channel.send(e)
}
