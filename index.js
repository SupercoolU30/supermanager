const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const config = require('./config.json');
const fs = require('fs');
const express = require('express')
const keepAlive = require('./server');
const roblox = require('noblox.js');
const chalk = require('chalk');

const Enmap = require("enmap");
const client = new Discord.Client();
let app = express();
let port = process.env.PORT || 8080;



client.config = config;



client.once('ready', () => {
console.log(`[READY] ${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`); 
  client.user.setActivity(`sm!help | ${client.guilds.cache.size} servers | ${client.users.cache.size} users | SuperManager`, {
 type: "LISTENING",
      url: "https://www.roblox.com/groups/9186431/"
});
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
  });
});

 


keepAlive();

client.login(token);