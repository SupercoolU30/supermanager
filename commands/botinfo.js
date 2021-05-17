const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let totalSeconds = (client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let uptime = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    var e = new Discord.MessageEmbed()
    .setTitle("SuperManager Bot Information")
    .setColor("BLUE")
    .addField("Bot Username", client.user.username, true)
    .addField("All channels", client.channels.cache.size, true)
    .addField("Servers", client.guilds.cache.size, true)
    .addField("Users", client.users.cache.size, true)
    .addField("Ping", Math.round(client.ws.ping) + "*ms*", true)
    .addField("Running time", uptime, true)
    .addField("Alive Since", client.user.createdAt)
    .setTimestamp()
        .setFooter('SuperManager', 'https://cdn.discordapp.com/attachments/843626534253363290/843626772879638568/supermanager-logo.png');
   
    message.channel.send(e)
    return;
}
