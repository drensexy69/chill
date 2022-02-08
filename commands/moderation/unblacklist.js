const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "unblacklist",
  aliases: [],
  description: "unblacklist A User!",
  usage: "unblacklist <Mention User>",
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
        `There Is No unblacklist Role, So Member Is Not unblacklisted Anymore!`
      );

    if (!Member.roles.cache.has(Role)) {
      return message.channel.send(`Member Is Already unblacklisted!`);
    }

    let Embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Member unblacklisted!`)
      .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
      .addField(`unblacklisted Member`, `${Member.user.tag} (${Member.user.id})`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    if (Role && Member.roles.cache.has(Role)) {
      Member.roles.remove([Role]);
      return message.channel.send(Embed);
    } else {
      return message.channel.send(`Something Went Wrong, Try Again Later!`);
    }

    //End
  }
};