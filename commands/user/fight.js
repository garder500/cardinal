const Command = require("../../base/Command.js"),
    Discord = require("discord.js"),
    canvacord = require("canvacord"),
    talkedRecently = new Set();

class fight extends Command {

    constructor(client) {
        super(client, {
            name: "fight",
            dirname: "user",
        });
    }

    async run(message, args, data, language) {
                    function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}   
              const playerlogs = this.client.guilds.cache.get('768574060140822539').channels.cache.find(channel => channel.id === '785265543757692950')
        let client = this.client;
        if(data.user.in_channel === 0) return message.channel.send(client.globalManager.generateGlobalEmbedError(`Vous devez êtres présent dans un salon pour pouvoir combattre écrivez simplement \`arrive\` dans le salon ou vous souhaitez entrée`)).then(m => {
            setTimeout(() => {m.delete()},30000) })     
          if(data.user.channel !== message.channel.id) return message.channel.send(client.globalManager.generateGlobalEmbedError(`Vous ne pouvez pas attaquez dans un salon ou vous n'êtes pas présent !`)).then(m => {
            setTimeout(() => {m.delete()},30000) }) 
        const mention = message.mentions.users.first() || this.client.users.cache.get(args[0])
        if(!mention) return message.channel.send(client.globalManager.generateGlobalEmbedError(`Cette commande attend un second argument\nExemple : \`fight < @mention > (magie)\``)).then(m => {
            setTimeout(() => {m.delete()},30000) })
        if(mention.id === message.author.id) return message.channel.send(client.globalManager.generateGlobalEmbedError(`Vous ne pouvez pas vous attaquez vous même !`)).then(m => {
            setTimeout(() => {m.delete()},30000) })
        let bot = false;
        if(mention.id === "769614781043703810") return message.channel.send(client.globalManager.generateGlobalEmbedError(`Les combats celeste ne sont pas encore disponible !`)).then(m => {
            setTimeout(() => {m.delete()},30000) });
        (async()=>{
        if(mention.bot){
        const monsterlevel = data.user.level + getRandomInt(3)
        let baselive;
        let randomType = getRandomInt(5);
        if(randomType === 0){
          baselive = 50;
        }else if(randomType=== 1){
          baselive = 80;
        }else if(randomType=== 2){
          baselive = 100;
        }else if(randomType=== 3){
          baselive = 120;
        }else if(randomType=== 4){
          baselive = 150;
        }
        let user;
        try{
         user = await client.findOrCreateMonster(mention,message.channel,message.guild,randomType,(baselive+(5*monsterlevel)),monsterlevel)
        }catch(e){
           return message.channel.send(client.globalManager.generateGlobalEmbedError(`Le monstre ce crée veuillez patientez !`))
        }
        let monster = {
            vitesse: 15+user.level,
            strength: 20+user.level,
            magie: 10 +user.level,
            defense: 20+user.level,
            prenom: ""
        }
        if(user.monster_id === 0){
        monster= {
            vitesse: 15+user.level,
            strength: 20+user.level,
            magie: 10 +user.level,
            defense: 20+user.level,
            prenom: "Slime"
        }
        }else if(user.monster_id === 1){
       monster= {
            vitesse: 10+user.level,
            strength: 30+user.level,
            magie: 0 +user.level,
            defense: 30+user.level,
            prenom: "Gobelin"
        }        
      }else if(user.monster_id === 2){
      monster= {
            vitesse: 20+user.level,
            strength: 30+user.level,
            magie: 20 +user.level,
            defense: 30+user.level,
            prenom: "Ogre"
        }        
      }else if(user.monster_id === 3){
      monster= {
            vitesse: 20+user.level,
            strength: 35+user.level,
            magie: 15 +user.level,
            defense: 20+user.level,
            prenom: "Orc"
        }        
      }else if(user.monster_id === 4){
      monster= {
            vitesse: 10+user.level,
            strength: 50+user.level,
            magie: 50 +user.level,
            defense: 50+user.level,
            prenom: "Géant"
        }
        }
          let atck1 = 20 + ((data.user.strength)*0.1)
          let def1 = 15 + ((monster.defense)*0.2)
          let degatT1 = parseInt(atck1)-parseInt(def1/2);
          let atck2 = 20 + ((data.user.magie + (data.user.strength/2))*0.1);
          let def2 = 15 + ((monster.magie + monster.defense)*0.2)
          let degatT2 = parseInt(atck2)-parseInt(def2/2);
          let time = 5000 - ((data.user.vitesse))
          if(time <= 1000){
            time = 1000;
          }
          let systeme;
           let life;
           if(args[1]){
                if(args[1].toLowerCase() === "magie"){
                     if(degatT2 <= 0){
            degatT2 = 0;
            systeme = `Il semble être immunisé contre la magie, peut être que fuire serait une bonne solution ?`
          }
          await data.database.query(`UPDATE player SET stat_coup="${data.user.stat_coup+1}",stat_coup_monster_magie="${data.user.stat_coup_monster_magie+1}" WHERE id = "${message.author.id}"`)
          life = user.vie - degatT2;
                }else{ 
          await data.database.query(`UPDATE player SET stat_coup="${data.user.stat_coup+1}",stat_coup_monster="${data.user.stat_coup_monster+1}" WHERE id = "${message.author.id}"`)
        if(degatT1 <= 0){
            degatT1 = 0;
            systeme = `Vous devriez avisez à trouvez un autre adversaire, celui-ci semble trop fort pour vous :)`
          }  
                              life = user.vie - degatT1;  
                }
          }else{
          await data.database.query(`UPDATE player SET stat_coup="${data.user.stat_coup+1}",stat_coup_monster="${data.user.stat_coup_monster+1}" WHERE id = "${message.author.id}"`)
            if(degatT1 <= 0){
            degatT1 = 0;
            systeme = `Vous devriez avisez à trouvez un autre adversaire, celui-ci semble trop fort pour vous :)`
          }  
            life = user.vie - degatT1;
          }
          let maxlife = 100 + (user.level*5)
        let lvl = parseInt(data.user.level)+1
        let xprequired = (50 * (lvl*lvl)) + (400 * lvl) + 550
        let xp = 50+((getRandomInt(15)+5)*(user.level+1));
           setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        },time);
        if(life === user.vie) return message.channel.send(client.globalManager.generateGlobalSystemEmbed(systeme)).then(m => {
                    playerlogs.send(client.globalManager.generateGlobalSystemEmbed(`Fight de ${message.author.username} :\n${systeme}`))
            setTimeout(() => {m.delete()},30000) })
        if(talkedRecently.has(message.author.id)) return message.channel.send(client.globalManager.generateGlobalSystemEmbed(`Veuilez patientez avant de pouvoir réattaquer`)).then(m => {
            setTimeout(() => {m.delete()},30000) })
          if(life <= 0){
                      talkedRecently.add(message.author.id);

          let newxp = data.user.xp + xp;
          let pass;
          let argent = data.user.bronze + xp
          let stat;
          if(newxp >= xprequired){
            pass = true;
            newxp = newxp-xprequired;
            stat = data.user.ps + 5;
            systeme = `${data.user.prenom} à tué ${monster.prenom} et passe un niveau ! (Niveau ${lvl} atteint 5 points statistique ont été ajouté, Gain de ${xp} XP et ${xp} piece de bronze)`
          }else{
            stat = data.user.ps;
            lvl = lvl-1;
            systeme = `${data.user.prenom} à tué ${monster.prenom}! (Gain de ${xp} XP et ${xp} piece de bronze)`
          }
          await data.database.query(`UPDATE player SET stat_kill_monster="${data.user.stat_kill_player+1}" WHERE id = "${message.author.id}"`)
          await data.database.query(`UPDATE player SET xp="${newxp}", bronze = "${argent}", level= "${lvl}", ps= ${stat} WHERE id = "${message.author.id}"`)
          await data.database.query(`DELETE FROM monster WHERE id = "${mention.id}" && guild= "${message.guild.id}" && channel= "${message.channel.id}"`)
          message.channel.send(client.globalManager.generateGlobalSystemEmbed(systeme)).then(m => {
            playerlogs.send(client.globalManager.generateGlobalSystemEmbed(`Fight de ${message.author.username} :\n${systeme}`))
            setTimeout(() => {m.delete()},30000) })  
          }else{
          talkedRecently.add(message.author.id);
             if(args[1]){
                if(args[1].toLowerCase() === "magie"){
            systeme = `Vous avez infligé ${degatT2} de dégat magique à ${monster.prenom} il ne lui reste plus que ${life} point de vie`
                }else{
            systeme = `Vous avez infligé ${degatT1} de dégat à ${monster.prenom} il ne lui reste plus que ${life} point de vie`
                }
          }else{
            systeme = `Vous avez infligé ${degatT1} de dégat à ${monster.prenom} il ne lui reste plus que ${life} point de vie`
          }
          if(isNaN(life)){
                playerlogs.send(client.globalManager.generateGlobalSystemEmbed(`${message.author.username} vient de créer un monstre de niveau ${monsterlevel} sur le royaume ${message.guild.name} dans le salon ${message.channel.name}`))       
                return message.channel.send(client.globalManager.generateGlobalSystemEmbed(`Le monstre créer est de niveau ${monsterlevel} faite attention !`)) 
          }else{
                                  await data.database.query(`UPDATE monster SET vie = "${life}" WHERE id = "${mention.id}" && guild= "${message.guild.id}" && channel= "${message.channel.id}"`)
          }
          playerlogs.send(client.globalManager.generateGlobalSystemEmbed(`Fight de ${message.author.username} :\n${systeme}`))
          message.channel.send(client.globalManager.generateGlobalSystemEmbed(systeme)).then(m => {
            setTimeout(() => {m.delete()},30000) });
         setTimeout(() => {
            playerlogs.send(client.globalManager.generateGlobalSystemEmbed(`Le monstre : ${monster.prenom} vient d'attaquez ${data.user.prenom} sur le royaume ${message.guild.name} dans le salon ${message.channel.name}`))
         atck1 = 20 + ((monster.strength)*0.1)
          def1 = 15 + ((data.user.defense)*0.2)
          degatT1 = parseInt(atck1)-parseInt(def1/2);
           atck2 = 20 + ((monster.magie + (monster.strength/2))*0.1);
           def2 = 15 + ((data.user.magie + data.user.defense)*0.2)
         degatT2 = parseInt(atck2)-parseInt(def2/2);
         time = 5000 - ((monster.vitesse))
          if(time <= 1000){
            time = 1000;
          }
          let systeme;
           let life;
        (async()=>{
           if(args[1]){
                if(args[1].toLowerCase() === "magie"){
                await data.database.query(`UPDATE player SET stat_def_monster_magie="${data.user.stat_def_monster_magie+1}" WHERE id = "${message.author.id}"`)
                     if(degatT2 <= 0){
            degatT2 = 0;
            systeme = `Il semble être immunisé contre la magie, peut être que fuire serait une bonne solution ?`
          }
          life = data.user.vie - degatT2;
                }else{ 
        await data.database.query(`UPDATE player SET stat_def_monster="${data.user.stat_def_monster+1}" WHERE id = "${message.author.id}"`)
        if(degatT1 <= 0){
            degatT1 = 0;
            systeme = `Vous devriez avisez à trouvez un autre adversaire, celui-ci semble trop fort pour vous :)`
          }  
          life = data.user.vie - degatT1;  
                }
          }else{
          await data.database.query(`UPDATE player SET stat_def_monster="${data.user.stat_def_monster+1}" WHERE id = "${message.author.id}"`)
            if(degatT1 <= 0){
            degatT1 = 0;
            systeme = `Vous devriez avisez à trouvez un autre adversaire, celui-ci semble trop fort pour vous :)`
          }  
            life = data.user.vie - degatT1;
          }
          let maxlife = 100 + (data.user.level*5)
        let lvl = parseInt(user.level)+1
        let xprequired = (5 * (lvl*lvl)) + (40 * lvl) + 55
        let xp = getRandomInt(15);
        if(life === data.user.vie) return message.channel.send(client.globalManager.generateGlobalSystemEmbed(systeme)).then(m => {
                    playerlogs.send(client.globalManager.generateGlobalSystemEmbed(`Fight de ${message.author.username} :\n${systeme}`))
            setTimeout(() => {m.delete()},30000) })
          if(life <= 0){
            systeme = `${monster.prenom} à tué ${data.user.prenom}! `;
            (async()=>{
                  await data.database.query(`UPDATE player SET stat_dead="${data.user.stat_dead+1}" WHERE id = "${message.author.id}"`)
                  await data.database.query(`UPDATE player SET vie = "${maxlife}" WHERE id = "${message.author.id}"`)
          message.channel.send(client.globalManager.generateGlobalSystemEmbed(systeme)).then(m => {
                        playerlogs.send(client.globalManager.generateGlobalSystemEmbed(`Fight de ${message.author.username} :\n${systeme}`))
            setTimeout(() => {m.delete()},30000) })  
      })();
        
          }else{
             if(args[1]){
                if(args[1].toLowerCase() === "magie"){
            systeme = `Le monstre ${monster.prenom} de niveau ${user.level} as infligé ${degatT2} de dégat magique à ${data.user.prenom} il ne lui reste plus que ${life} point de vie`
                }else{
            systeme = `Le monstre ${monster.prenom} de niveau ${user.level} as infligé ${degatT1} à ${data.user.prenom} il ne lui reste plus que ${life} point de vie`
                }
          }else{
            systeme = `Le monstre ${monster.prenom} de niveau ${user.level} as infligé ${degatT1} à ${data.user.prenom} il ne lui reste plus que ${life} point de vie`
          }
                      (async()=>{
          await data.database.query(`UPDATE player SET vie = "${life}" WHERE id = "${message.author.id}"`)
          message.channel.send(client.globalManager.generateGlobalSystemEmbed(systeme)).then(m => {
            setTimeout(() => {m.delete()},30000) })   
})();
          }
    })();
          },1000)
     }
        }else{
                        (async()=>{
                const user = await client.findOrCreateUser(mention);
        if(user.in_channel === 0) return message.channel.send(client.globalManager.generateGlobalEmbedError(`L'utilisateur mentionné n'est présent nul part.`)).then(m => {
            setTimeout(() => {m.delete()},30000) })
         if(user.in_channel === 1 && user.channel !== message.channel.id) return message.channel.send(client.globalManager.generateGlobalEmbedError(`L'utilisateur mentionné n'étant pas présent de ce salon vous ne pouvez pas l'attaquez.`)).then(m => {
            setTimeout(() => {m.delete()},30000) })
            if(user.in_channel === 1 && user.channel !== data.user.channel) return message.channel.send(client.globalManager.generateGlobalEmbedError(`L'utilisateur mentionné n'étant pas présent de le même salon que vous, l'attaquez est impossible.`)).then(m => {
            setTimeout(() => {m.delete()},30000) })
          playerlogs.send(client.globalManager.generateGlobalSystemEmbed(`${message.author.username} vient d'attaquez  ${mention.username} sur le royaume ${message.guild.name} dans le salon ${message.channel.name}`))
          let atck1 = 20 + ((data.user.strength)*0.1)
          let def1 = 15 + ((user.defense)*0.2)
          let degatT1 = parseInt(atck1)-parseInt(def1/2);
          let atck2 = 20 + ((data.user.magie + (data.user.strength/2))*0.1);
          let def2 = 15 + ((user.magie + user.defense)*0.2)
          let degatT2 = parseInt(atck2)-parseInt(def2/2);
          let time = 5000 - ((data.user.vitesse))
          if(time <= 1000){
            time = 1000;
          }
          let systeme;
         
         
           let life;
           if(args[1]){
                if(args[1].toLowerCase() === "magie"){
                      await data.database.query(`UPDATE player SET stat_coup="${data.user.stat_coup+1}",stat_coup_player_magie="${data.user.stat_coup_player_magie+1}" WHERE id = "${message.author.id}"`)
                      await data.database.query(`UPDATE player SET stat_def_player_magie="${data.user.stat_def_player_magie+1}" WHERE id = "${mention.id}"`)
                     if(degatT2 <= 0){
            degatT2 = 0;
            systeme = `Il semble être immunisé contre la magie, peut être que fuire serait une bonne solution ?`
          }
          life = user.vie - degatT2;
                }else{
                    await data.database.query(`UPDATE player SET stat_def_player="${data.user.stat_def_player+1}" WHERE id = "${mention.id}"`)
                    await data.database.query(`UPDATE player SET stat_coup="${data.user.stat_coup+1}",stat_coup_player="${data.user.stat_coup_player+1}" WHERE id = "${message.author.id}"`)
        if(degatT1 <= 0){
            degatT1 = 0;
            systeme = `Vous devriez avisez à trouvez un autre adversaire, celui-ci semble trop fort pour vous :)`
          }  
                              life = user.vie - degatT1;  
                }
          }else{
            await data.database.query(`UPDATE player SET stat_def_player="${data.user.stat_def_player+1}" WHERE id = "${mention.id}"`)
            await data.database.query(`UPDATE player SET stat_coup="${data.user.stat_coup+1}",stat_coup_player="${data.user.stat_coup_player+1}" WHERE id = "${message.author.id}"`)
            if(degatT1 <= 0){
            degatT1 = 0;
            systeme = `Vous devriez avisez à trouvez un autre adversaire, celui-ci semble trop fort pour vous :)`
          }  
            life = user.vie - degatT1;
          }
          let maxlife = 100 + (user.level*5)
        let lvl = parseInt(data.user.level)+1
        let xprequired = (50 * (lvl*lvl)) + (400 * lvl) + 550
           let xp = getRandomInt(15);
           setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        },time);
        if(life === user.vie) return message.channel.send(client.globalManager.generateGlobalSystemEmbed(systeme)).then(m => {
            setTimeout(() => {m.delete()},30000) })
        if(talkedRecently.has(message.author.id)) return message.channel.send(client.globalManager.generateGlobalSystemEmbed(`Veuilez patientez avant de pouvoir réattaquer`)).then(m => {
            setTimeout(() => {m.delete()},30000) })
          if(life <= 0){
                      talkedRecently.add(message.author.id);
            let money;
            if(user.bronze >= 0){
                money = user.bronze - xp;
                if(money < 0){
                    money = 0;
                }
            }else{
                money = user.bronze;
            }
          let newxp = data.user.xp + xp;
          let pass;
          let argent = data.user.bronze + xp
          let stat;
          if(newxp >= xprequired){
            pass = true;
            newxp = newxp-xprequired;
            stat = data.user.ps + 5;
            systeme = `${data.user.prenom} à tué ${user.prenom} et passe un niveau ! (Niveau ${lvl} atteint 5 points statistique ont été ajouté, Gain de ${xp} XP et ${xp} piece de bronze)`
          }else{
            stat = data.user.ps;
            lvl = lvl-1;
            systeme = `${data.user.prenom} à tué ${user.prenom}! (Gain de ${xp} XP et ${xp} piece de bronze)`
          }
          await data.database.query(`UPDATE player SET stat_dead="${data.user.stat_dead+1}" WHERE id = "${mention.id}"`)
          await data.database.query(`UPDATE player SET stat_kill_player="${data.user.stat_kill_player+1}" WHERE id = "${message.author.id}"`)
          await data.database.query(`UPDATE player SET xp="${newxp}", bronze = "${argent}", level= "${lvl}", ps= ${stat} WHERE id = "${message.author.id}"`)
          await data.database.query(`UPDATE player SET vie = "${maxlife}", bronze = ${money} WHERE id = "${mention.id}"`)
          message.channel.send(client.globalManager.generateGlobalSystemEmbed(systeme)).then(m => {
            setTimeout(() => {m.delete()},30000) })  
          }else{
          talkedRecently.add(message.author.id);
             if(args[1]){
                if(args[1].toLowerCase() === "magie"){
            systeme = `Vous avez infligé ${degatT2} de dégat magique à ${user.prenom}`
                }else{
            systeme = `Vous avez infligé ${degatT1} de dégat à ${user.prenom}`
                }
          }else{
            systeme = `Vous avez infligé ${degatT1} de dégat à ${user.prenom}`
          }
          await data.database.query(`UPDATE player SET vie = "${life}" WHERE id = "${mention.id}"`)
          message.channel.send(client.globalManager.generateGlobalSystemEmbed(systeme)).then(m => {
            setTimeout(() => {m.delete()},30000) })  
          }
      })();
       }

   })();
            /*
            * SQL request: await data.database.query(`UPDATE player SET guild = "${message.guild.id}", channel = ${message.channel.id}, in_channel = "1" WHERE id = "${message.author.id}"`)
            * Calcul attaque basique : 5 + ((attaque)*0.1)
            * Calcul défense basique : 1 + ((defense)*0.2)
            * Calcul attaque magique : 5 + ((magie + (attaque/2))*0.1)
            * Calcul défense magique : 1 + ((magie + (defense/2))*0.2)
            * Calcul vitesse d'excecution : 5000 - ((vitesse)*2)
            */
    }
}

module.exports = fight;