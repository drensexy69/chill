const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "blacklist",
  aliases: [],
  description: "blacklist A User!",
  usage: "blacklist <Mention User> | <Reason>",
  run: async (client, message, args) => {
    //Start
    message.delete();

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send(`Please Mention A User!`);

    let Role = message.guild.roles.cache.find(role => role.name === "blacklist").id;

    if (!Role)
      return message.channel.send(
        `Please Create Mute Role | Role Name : blacklist`
      );

    if (Member.roles.cache.has(Role)) {
      return message.channel.send(`Member Is Already blacklisted!`);
    }

    let Reason = args.slice(1).join(" ");

    let Embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Member blacklisted!`)
      .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
      .addField(`Muted Member`, `${Member.user.tag} (${Member.user.id})`)
      .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    if (Role && !Member.roles.cache.has(Role)) {
      Member.roles.add([Role]);
      return message.channel.send(Embed);
    } else {
      return message.channel.send(`Something Went Wrong, Try Again Later!`);
    }

    //End
  }
};
