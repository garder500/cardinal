const moment = require("moment");
 const talkedRecently = new Set();

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(oldMessage,newMessage) {
      const playerlogs = this.client.guilds.cache.get('768574060140822539').channels.cache.find(channel => channel.id === '785265543757692950')

        const data = {}
 const client = this.client;
 const database = await client.database();
    data.database = database;
    data.config = client.config;
        const user = await client.findOrCreateUser(newMessage.author);
        data.user = user;
        const language = this.client.functions.getLanguage(data.user);
        if(newMessage.author.id === "769614781043703810"){
             const args = newMessage.content.split(/\s+/g).filter(a => a).map(s => s.trim()).slice(1);
                const commandSearch = newMessage.content.split(/\s+/g)[0];
                const command = commandSearch.toLowerCase();
                const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
                if (cmd) {
                   cmd.run(newMessage, args, data, language);
                }
        }
        if(newMessage.content.toLowerCase().startsWith("arrive")){
          if(data.user.in_channel === 1 && data.user.channel === newMessage.channel.id)return newMessage.channel.send(client.globalManager.generateGlobalEmbedError(`Vous êtes déja présent sur ce salon !`)).then(m => {
            setTimeout(() => {m.delete()},30000) })
          if(data.user.in_channel === 1 && data.user.channel !== newMessage.channel.id)return newMessage.channel.send(client.globalManager.generateGlobalEmbedError(`${newMessage.author} vous êtes déja sur le <#${data.user.channel}> sur le royaume ${client.guilds.cache.get(data.user.guild).name} vous ne pouvez pas allez ici avant de l'avoir quitté`)).then(m => {
            setTimeout(() => {m.delete()},30000) })
          await data.database.query(`UPDATE player SET guild = "${newMessage.guild.id}", channel = ${newMessage.channel.id}, in_channel = "1" WHERE id = "${newMessage.author.id}"`)
          playerlogs.send(client.globalManager.generateGlobalSystemEmbed(`${newMessage.author.username} vient d'entrée dans  ${newMessage.channel.name} sur le royaume ${newMessage.guild.name}`))
          newMessage.channel.send(client.globalManager.generateGlobalSystemEmbed(`${newMessage.author} vient d'entrée dans  ${newMessage.channel} sur le royaume ${newMessage.guild}`)).then(m => {
            setTimeout(() => {m.delete()},30000) })         
      }
        if(newMessage.content.toLowerCase().startsWith("part")){
          if(data.user.in_channel === 0) return newMessage.channel.send(client.globalManager.generateGlobalEmbedError(`Vous n'êtes présent dans aucun salon`)).then(m => {
            setTimeout(() => {m.delete()},30000)
           })
           if(data.user.in_channel === 1 && data.user.channel !== newMessage.channel.id) return newMessage.channel.send(client.globalManager.generateGlobalEmbedError(`${newMessage.author} vous êtes déja sur le <#${data.user.channel}> sur le royaume ${client.guilds.cache.get(data.user.guild).name} vous ne pouvez pas quitté un endroit ou vous n'êtes pas`)).then(m => {
            setTimeout(() => {m.delete()},30000)
           })
          await data.database.query(`UPDATE player SET in_channel = "0" WHERE id = "${newMessage.author.id}"`)
          playerlogs.send(client.globalManager.generateGlobalSystemEmbed(`${newMessage.author.username} vient de sortir de ${newMessage.channel.name} sur le royaume ${newMessage.guild.name}`))
          newMessage.channel.send(client.globalManager.generateGlobalSystemEmbed(`${newMessage.author} vient de sortir de ${newMessage.channel} sur le royaume ${newMessage.guild}`)).then(m => {
            setTimeout(() => {m.delete()},30000) }) 
         }
        if (newMessage.author.bot) return;
               if (newMessage.guild) {
            const regexResult = new RegExp(`^(\\${data.config.prefix}|<@!?${client.user.id}>)`).exec(newMessage.content);
            if (regexResult) {
                if (regexResult[0].length === newMessage.content.length) return;
                const args = newMessage.content.substring(regexResult[0].length).split(/\s+/g).filter(a => a).map(s => s.trim()).slice(1);
                const commandSearch = newMessage.content.substring(regexResult[0].length).split(/\s+/g).filter(a => a).map(s => s.trim())[0];
                const command = commandSearch.trim().toLowerCase();
                const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
                if (cmd) {
                    return cmd.run(newMessage, args, data, language);
                }
            }
        }    
    }
}
