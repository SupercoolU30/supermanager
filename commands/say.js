exports.run = async (client, message, args) => {

    const Discord = require('discord.js');

    var e2 = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Invalid Phrase")
        .setDescription("**Please enter a valid phrase.**")
        .setTimestamp()
        .setFooter('SuperManager', 'https://cdn.discordapp.com/attachments/843626534253363290/843626772879638568/supermanager-logo.png');

    var e1 = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Invalid Permissions")
        .setDescription("**You can't use this command.**")
        .setTimestamp()
        .setFooter('SuperManager', 'https://cdn.discordapp.com/attachments/843626534253363290/843626772879638568/supermanager-logo.png');


    if (!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"]))
        return message.channel.send(e1);

    let argsm = args.join(" ")
    if (!argsm)
        return message.channel.send(e2)
    if (argsm.startsWith('<@') && argsm.endsWith('>'))
        return message.channel.send(e2)
    if (argsm.startsWith('@everyone'))
        return message.channel.send(e2)
    if (argsm.startsWith('@here'))
        return message.channel.send(e2)
    message.channel.send(argsm)
    message.delete()