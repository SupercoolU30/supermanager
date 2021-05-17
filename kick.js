const Discord = require('discord.js');
exports.run = async (
    client, message, args) => {

    var e = new Discord.MessageEmbed()
        .setTitle(":no_entry_sign: Insufficient Permission")

        .addField("You do not have permissions to use this command.")
        .setColor("RED")
        .setTimestamp()
        .setFooter('SuperManager', 'https://cdn.discordapp.com/attachments/682409155738468411/841693127500103750/RoManager_Logo.png');
    var e4 = new Discord.MessageEmbed()
        .setTitle(":no_entry_sign: Insufficient Permission")
        .setDescription("You can't kick a person is above you or equal as you.")
        .setColor("RED")
        .setTimestamp()
        .setFooter('SuperManager', 'https://cdn.discordapp.com/attachments/682409155738468411/841693127500103750/RoManager_Logo.png');
    var e2 = new Discord.MessageEmbed()
        .setTitle(":no_entry_sign: Error")
        .setDescription("Could not find user.")
        .setColor("RED")
        .setTimestamp()
        .setFooter('SuperManager', 'https://cdn.discordapp.com/attachments/682409155738468411/841693127500103750/RoManager_Logo.png');
    var e3 = new Discord.MessageEmbed()
        .setTitle(":no_entry_sign: Error")

        .setDescription("Please supply a reason.")
        .setColor("RED")
        .setTimestamp()
        .setFooter('SuperManager', 'https://cdn.discordapp.com/attachments/682409155738468411/841693127500103750/RoManager_Logo.png');

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(e)

    if (args[0] == "help") {
        message.reply("Usage: " + prefix + "kick [@USER] [REASON]")
        return;
    }
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!kUser) {
        return message.channel.send(e2)
    }
    let reason = args[1];
    if (!reason) {
        return message.channel.send(e3)
    }
    if (kUser.hasPermission("ADMINISTRATOR")) return message.channel.send(e4)

    message.guild.member(kUser).kick(reason)
    var be = new Discord.MessageEmbed()
        .setTitle("Action Log")
        .setDescription(`${kUser}`, "has been kicked.")
        .setColor("BLUE")
        .addField("User:", `${kUser}`)
        .addField("Reason:", `${reason}`)
        .setTimestamp()
        .setFooter('SuperManager', 'https://cdn.discordapp.com/attachments/843626534253363290/843626772879638568/supermanager-logo.png');
    message.channel.send(be)
}