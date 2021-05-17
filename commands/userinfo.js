const rbx = require("noblox.js");
const fetch = require("node-fetch");
const fs = require("fs");

exports.run = async (client, message, args) => {
    const data = args.join(" ");
    if (!data) return message.channel.send({
        embed: {
            color: 16711680,
            description: "Please enter a valid username.`"
        }
    });

    const { Id } = await fetch(`https://api.roblox.com/users/get-by-username?username=${data}`).then(response => response.json());
    if (!Id) return message.channel.send({
        embed: {
            color: 16711680,
            description: "Please enter a valid username."
        }
    });

    const { name } = await fetch(
        `https://users.roblox.com/v1/users/${Id}`
    ).then(response => response.json());


    const { count } = await fetch(`https://friends.roblox.com/v1/users/${Id}/followings/count`).then(response => response.json());
    let { description } = await fetch(
        `https://users.roblox.com/v1/users/${Id}`).then(response => response.json());
    const { created } = await fetch(
        `https://users.roblox.com/v1/users/${Id}`).then(response => response.json());
    const date = created.slice(0, -12)


    message.channel.send({
        embed: {
            color: 15728384,
            title: name,
            url: "https://www.roblox.com/users/" + Id + "/profile",
            thumbnail: {
                url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&username=${data}`
            },
            fields: [
                {
                    name: "Username",
                    value: name,
                    inline: true
                },
                {
                    name: "ID",
                    value: Id,
                    inline: true
                },
                {
                    name: "Description",
                    value: description,
                    inline: false
                }
            ]
        }
    });
}