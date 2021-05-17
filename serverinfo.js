const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {


    let guildname = message.guild.name
    let sEmbed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Guild Name:**", `${guildname}`, true)
        .addField("**Guild Owner:**", `${message.guild.owner}`, true)
        .addField("**Member Count:**", `${message.guild.memberCount}`, true)
        .addField("**Role Count:**", `${message.guild.roles.cache.size}`, true)
        .setTimestamp()
        .setFooter(`SuperManager`, client.user.displayAvatarURL);
    message.channel.send(sEmbed);
}