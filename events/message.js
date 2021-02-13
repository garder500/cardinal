const moment = require("moment")
const socket = require("socket.io-client")("https://bug-center.tk")
socket.emit('connect',socket)
socket.on('connected', function(){
});
 const talkedRecently = new Set();

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(message) {
      const playerlogs = this.client.guilds.cache.get('768574060140822539').channels.cache.find(channel => channel.id === '785265543757692950')
socket.emit('DiscordMessage',{
  user_id: 555,
  avatar_uri: message.author.displayAvatarURL({ dynamic: true }),
  author: message.author,
  channel: message.channel,
  guild: message.guild,
  message: message,
  mentions : message.mentions,
  embeds: message.embeds,
  attachments : message.attachments
})

        const data = {}
                const client = this.client;
 const database = await client.database();
    data.database = database;
if(message.guild.id === "768574060140822539"){
    if(message.author.id === "302050872383242240"){
      let auteur = message.embeds[0].description.substr(2, 18)
      let msgrequis = "Bump effectué !"
      if(message.embeds[0].description.includes(msgrequis)){
       const [rows] = await data.database.query(`SELECT * FROM player WHERE id = "${auteur}"`)
       if(rows.length < 1){
        await client.findOrCreateUser(client.users.cache.get(auteur));
            message.channel.send("Malheureusement vous n'avez rien gagné car vous n'aviez pas de compte :(")
        }else{
                   await data.database.query(`UPDATE player SET bronze = ${parseInt(rows[0].bronze) + 5} WHERE id = '${auteur}'`)                   
                   message.channel.send(`<@${auteur}> vous avez gagné 5 pièce de bronze vous avez maintenant ${parseInt(rows[0].bronze) + 5} pièce de bronze !`)
        }
      }else if(message.embeds[0].description.includes("avant que le serveur puisse être bumpé !")){
        message.channel.send(`<@${auteur}> vous n'avez rien gagné !`)
      }
    }
  }
    data.config = client.config;
    (async() =>{
      const [rows] = await data.database.query(`SELECT * FROM player WHERE id = "${message.author.id}"`);
        if (rows.length < 1) {
            const createUser = await data.database.query(`INSERT INTO player (id,prenom,nom,image,language) VALUES ('${message.author.id}','${message.author.username}','(Sans fiche)','${message.author.displayAvatarURL()}','fr')`);
            return createUser[0];
        } else {
            return rows[0];
        }
      })();
        const user = await client.findOrCreateUser(message.author);
        data.user = user;
        const language = this.client.functions.getLanguage(data.user);
        if(message.author.id === "769614781043703810"){
             const args = message.content.split(/\s+/g).filter(a => a).map(s => s.trim()).slice(1);
                const commandSearch = message.content.split(/\s+/g)[0];
                const command = commandSearch.toLowerCase();
                const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
                if (cmd) {
                   cmd.run(message, args, data, language);
                }
        }

        if(message.content.toLowerCase().startsWith("arrive")){
          if(data.user.in_channel === 1 && data.user.channel === message.channel.id)return message.channel.send(client.globalManager.generateGlobalEmbedError(`Vous êtes déja présent sur ce salon !`)).then(m => {
            setTimeout(() => {m.delete()},30000) })
          if(data.user.in_channel === 1 && data.user.channel !== message.channel.id)return message.channel.send(client.globalManager.generateGlobalEmbedError(`${message.author} vous êtes déja sur le <#${data.user.channel}> sur le royaume ${client.guilds.cache.get(data.user.guild).name} vous ne pouvez pas allez ici avant de l'avoir quitté`)).then(m => {
            setTimeout(() => {m.delete()},30000) })
          await data.database.query(`UPDATE player SET guild = "${message.guild.id}", channel = ${message.channel.id}, stat_arrived="${data.user.stat_arrived+1}", in_channel = "1" WHERE id = "${message.author.id}"`)
          playerlogs.send(client.globalManager.generateGlobalSystemEmbed(`${message.author.username} vient d'entrée dans  ${message.channel.name} sur le royaume ${message.guild.name}`))
          message.channel.send(client.globalManager.generateGlobalSystemEmbed(`${message.author} vient d'entrée dans  ${message.channel} sur le royaume ${message.guild}`)).then(m => {
            setTimeout(() => {m.delete()},30000) })         

      }
        if(message.content.toLowerCase().startsWith("part")){
          if(data.user.in_channel === 0) return message.channel.send(client.globalManager.generateGlobalEmbedError(`Vous n'êtes présent dans aucun salon`)).then(m => {
            setTimeout(() => {m.delete()},30000)
           })
           if(data.user.in_channel === 1 && data.user.channel !== message.channel.id) return message.channel.send(client.globalManager.generateGlobalEmbedError(`${message.author} vous êtes déja sur le <#${data.user.channel}> sur le royaume ${client.guilds.cache.get(data.user.guild).name} vous ne pouvez pas quitté un endroit ou vous n'êtes pas`)).then(m => {
            setTimeout(() => {m.delete()},30000)
           })
          await data.database.query(`UPDATE player SET  stat_sorted="${data.user.stat_sorted+1}", in_channel = "0" WHERE id = "${message.author.id}"`)
          playerlogs.send(client.globalManager.generateGlobalSystemEmbed(`${message.author.username} vient de sortir de ${message.channel.name} sur le royaume ${message.guild.name}`))
          message.channel.send(client.globalManager.generateGlobalSystemEmbed(`${message.author} vient de sortir de ${message.channel} sur le royaume ${message.guild}`)).then(m => {
            setTimeout(() => {m.delete()},30000) }) 
         }

if(message.guild.me.hasPermission("MANAGE_WEBHOOKS") && message.guild.me.hasPermission("MANAGE_MESSAGES")){
      if(data.user.webhook == "true"){      
      message.delete()
 message.channel.fetchWebhooks().then(webhooks3=>{
   let contenu = message.content.replace(/@everyone/g,"Tout le monde").replace(/@+here/g,"here")
    let user1 = contenu.match(/<@!(\d{18})>/g)
    if(!user1){
   }else{
    for(let i = 0;i < user1.length; i++){
       contenu = contenu.replace(user1[i], message.guild.members.cache.get(user1[i].substr(3, 18)).displayName) 
  }    
}
 let role = contenu.match(/<@&(\d{18})>/g)
 if(!role){
   }else{
    for(let i = 0;i < role.length; i++){
       contenu = contenu.replace(role[i], message.guild.roles.cache.get(role[i].substr(3, 18)).name) 
  } 
}
   let user2 = contenu.match(/<@(\d{18})>/g)
   if(!user2){
   }else{
    for(let i = 0;i < user2.length; i++){
        contenu = contenu.replace(user2[i], message.guild.members.cache.get(user2[i].substr(2, 18)).displayName) 
  } 
};
        const webhook3 = webhooks3.filter(e => e.type === "Incoming").first();
        if(webhook3 === undefined){
           message.channel.createWebhook(client.user.username, {
    avatar: client.user.displayAvatarURL,
    reason: `Création de webhook par : ${message.author.tag}`
}).then(e =>{ e.send(contenu.replace(/@/g,""), {
          username: `${data.user.prenom} ${data.user.nom}`,
          avatarURL: data.user.image,
         })
    if(message.attachments.size !== 0){
      message.attachments.map(m =>{
        e.send(m.proxyURL,{
          username: `${data.user.prenom} ${data.user.nom}`,
          avatarURL: data.user.image,
         })
      })
    }
          })
}else{
  webhook3.send(contenu.replace(/@/g,""),{
          username: `${data.user.prenom} ${data.user.nom}`,
          avatarURL: data.user.image,
         })
  if(message.attachments.size !== 0){
      message.attachments.map(m =>{
        webhook3.send(m.proxyURL,{
          username: `${data.user.prenom} ${data.user.nom}`,
          avatarURL: data.user.image,
         })
      })
    }
      }

        })
     }else{
        }
      }else{
      }
        if (message.author.bot) return;
               if (message.guild) {
            const regexResult = new RegExp(`^(\\${data.config.prefix}|<@!?${client.user.id}>)`).exec(message.content);
            if (regexResult) {
                if (regexResult[0].length === message.content.length) return;
                const args = message.content.substring(regexResult[0].length).split(/\s+/g).filter(a => a).map(s => s.trim()).slice(1);
                const commandSearch = message.content.substring(regexResult[0].length).split(/\s+/g).filter(a => a).map(s => s.trim())[0];
                const command = commandSearch.trim().toLowerCase();
                const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
                if (cmd) {
                    return cmd.run(message, args, data, language);
                }
            }
        }    
    }
}
