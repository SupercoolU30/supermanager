const rbx = require('noblox.js');
const Discord = require('discord.js');
exports.run = async (client, message, args) => {
 //const enmap = client.db.get(message.author.id)
  function makeid() {
    var text = "";
    var selectFruit = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😲', '😝', '🤑', '🤯', '😭', '😑', '😶', '😋', '🙆', '👉', '👇', '🧠', '💼', '👮🏻', '👍🏼', '👎🏼', '🐵', '🌨', '☁️', '💧', '🎬', '🎧', '🎮', '🎲', '🏅', '🥇', '🥈', '🥉', '🏆', '🏒', '🍎', '🍫', '🍿', '🍪', '🥛', '🍽', '🍴', '🐑', '🦀', '🐔', '🐭', '🦊', '🐧', '🐞', '🌍', '🌏', '🌕', '🌖', '🌚', '🌝', '🌵', '🎄', '🌲', '☀️', '⛅️', '☔️', '🍋'];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    return text;
  }
  const filter = m => m.author.id === message.author.id
  const collector = message.channel.createMessageCollector(filter, { max: "1", time: "200000" })
  const robloxEmbed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle("Verification Prompt")
    .setDescription("❓ What's your ROBLOX username?❓")
    .setFooter('SuperManager', 'https://cdn.discordapp.com/attachments/843626534253363290/843626772879638568/supermanager-logo.png')
    .setTimestamp()
  message.channel.send(robloxEmbed)

  collector.on("collect", m => {
    if (m.content === 'cancel' || m.content === 'Cancel') {
      message.channel.send('**I have cancelled the prompt!**')
      return
    }
    rbx.getIdFromUsername(m.content).then(foundId => {
      const Id = foundId
      const newString = makeid() + makeid() + makeid() + makeid() + makeid()
      const foundUsername = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle("Verification Prompt")
        .setDescription("Greetings **" + m.content + "**, to verify that you are that user. Please put in your ROBLOX description this code \n ```" + newString + "```\n\nWhen you are done, say **done** when complete.\nSay **cancel** to cancel. ")
        .setImage("https://media.discordapp.net/attachments/507370558631968788/511159342884454400/verify_help.png?width=396&height=457")
        .setFooter("Player ID is " + foundId)
        .setTimestamp()
      message.channel.send(foundUsername)
      message.channel.awaitMessages(mag => {
        if (mag.content.includes('done') && mag.author.id == message.author.id) {
          const fetchingBlurb = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle("Verification Prompt")
            .setDescription("Fetching your emojis, please wait as I am going to fetch it.")
            .setFooter("Fetching..")
            .setTimestamp()
          message.channel.send(fetchingBlurb)
          setTimeout(function() {
            rbx.getStatus(foundId).then(status => {
              console.log(status)
              rbx.getBlurb(foundId).then(blurb => {
                if (status.includes(newString) || blurb.includes(newString)) {
                  const verified = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("Verification Prompt")
                    .setDescription("You have now been verified!")
                    .setFooter("Verifying.. Please one moment")
                    .setTimestamp()
                  message.channel.send(foundId)
                  message.channel.send(verified)
                  const json = { id: foundId, Username: m.content }

                //  client.db.set(message.author.id, json)


                  let role = message.guild.cache.roles.find(r => r.name === "Verified")
                  message.member.roles.add(role)
                  console.log()
                  message.member.setNickname(m.content)
                  let rolew = message.guild.cache.roles.find(r => r.name === "UnVerified")
                  message.member.roles.remove(rolew)
                  console.log()
                } else {
                  message.channel.send("Could not find the verification code in your description. Please try again!")
                }
              })
            }, 5000)
          })
        } else
          if (mag.content.includes('cancel') && mag.author.id == message.author.id) {
            message.channel.send('**Cancelled prompt.**')
            return
          }
      })
    })
  })
}