const Command = require("../../base/Command.js"),
    Discord = require("discord.js"),
    fetch = require("node-fetch");

class set extends Command {

    constructor(client) {
        super(client, {
            name: "set",
            dirname: "user",
        });
    }

    async run(message, args, data, language) {
        let client = this.client;
        const [user] = await data.database.query(`SELECT * FROM player WHERE id = "${message.author.id}"`);
        function partialembed(dinfo,partial){
        const embed = {
                embed: {
                    title: `<:profil:774546490139869194> Modification profil`,
                    thumbnail: {
                        url: message.author.displayAvatarURL({ format: "png", dynamic: true})
                    },
                    description: `${partial}`,
                    fields: [
                        {
                            name: `<a:update:774546814853972008> ${dinfo.toUpperCase()}`, 
                            value: `Modification effectué !`,
                            inline: true,
                        }
                    ],
                    footer: {
                        text: client.footer
                    },

                }
            };
        message.channel.send(embed)
        }

        function embedstats(dinfo,avant,stat){
            const embed = {
                embed: {
                    color: client.maincolor,
                    title: `<:profil:774546490139869194> Modification profil`,
                    thumbnail: {
                        url: message.author.displayAvatarURL({ format: "png", dynamic: true})
                    },
                    description: `<a:update:774546814853972008> Les Données de l'utilisateur ${message.author.username} ont été modifiées`,
                    fields: [
                        {
                            name: `<:info:774546953328525312> Informations`, 
                            value: `**__Avant :__** \n
                            __${dinfo} :__ \`${avant}\`\n
                            **__Après :__**\n
                            __${dinfo} :__ \`${stat}\``,
                            inline: true,
                        }
                    ],
                    footer: {
                        text: client.footer
                    },

                }
            };
            message.channel.send(embed)
        }
        function check(partialdata){
        const count2 = parseInt(user[0].ps)            
        let stat = parseInt(partialdata)
            
             if(Number.isNaN(parseInt(partialdata))){
                message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Second paramètre invalide ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `Le second paramètre pour ce type d'Informations doit être de type nombre !`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            })
                return false
            }else if(stat < 1){
                message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Erreur ! ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `Vous devez entrez un nombre positif !`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            })
                return false
            }else if(stat > count2){
            message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Erreur ! ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `Vous n'avez pas autant de point, vous en avez seulement ${count2} !`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            })
            return false
        }else if(count2 === 0){
                message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Erreur ! ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `Vous n'avez aucun point statistique à attribué`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            })
        return false
        }else{
            return true
        }
        }
        if(!args[0]) return message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Mauvaise utilisation",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `\`set <defense/force/magie/vitesse/intelligence/nom/prenom/age/sexe/image/description/pouvoir> <valeur demandé>\``,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            }) 
 const requis = ["defense","force","magie","vitesse","intelligence","nom","prenom","age","sexe","image","description","pouvoir"]           
    if(!requis.includes(args[0].toLowerCase())) return message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Erreur ! ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `Le paramètre n'existe pas !\nVoici la liste des paramètre disponible :\n${requis}`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            })   
                        if (user.length < 1) {
                            await message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Aucun compte trouvé ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `Aucune modification possible !\nEffectue la commande : \`profil\``,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            })
          }else{
                if(!args[1]) return message.channel.send("Une seconde valeur est attendu !")            
                if(args[0].toLowerCase() === "defense"){
              if(check(args[1]) === false) return;
            await data.database.query(`UPDATE player SET defense = '${parseInt(user[0].defense) + parseInt(args[1])}' WHERE id = "${message.author.id}"`)
                        await data.database.query(`UPDATE player SET ps = '${parseInt(user[0].ps) - parseInt(args[1])}' WHERE id = "${message.author.id}"`)
            embedstats(args[0].toUpperCase(),user[0].defense,(parseInt(user[0].defense) + parseInt(args[1])))              
        }else if(args[0].toLowerCase() === "force"){
              if(check(args[1]) === false) return;
            await data.database.query(`UPDATE player SET strength = '${parseInt(user[0].strength) + parseInt(args[1])}' WHERE id = "${message.author.id}"`)
                    await data.database.query(`UPDATE player SET ps = '${parseInt(user[0].ps) - parseInt(args[1])}' WHERE id = "${message.author.id}"`)
           embedstats(args[0].toUpperCase(),user[0].strength,(parseInt(user[0].strength) + parseInt(args[1])))              

        }else if(args[0].toLowerCase() === "vitesse"){
              if(check(args[1]) === false) return;
            await data.database.query(`UPDATE player SET vitesse = '${parseInt(user[0].vitesse) + parseInt(args[1])}' WHERE id = "${message.author.id}"`)
                        await data.database.query(`UPDATE player SET ps = '${parseInt(user[0].ps) - parseInt(args[1])}' WHERE id = "${message.author.id}"`)

                       embedstats(args[0].toUpperCase(),user[0].vitesse,(parseInt(user[0].vitesse) + parseInt(args[1])))              
        }else if(args[0].toLowerCase() === "magie"){
              if(check(args[1]) === false) return;
            await data.database.query(`UPDATE player SET magie = '${parseInt(user[0].magie) + parseInt(args[1])}' WHERE id = "${message.author.id}"`)
            await data.database.query(`UPDATE player SET ps = '${parseInt(user[0].ps) - parseInt(args[1])}' WHERE id = "${message.author.id}"`)
          embedstats(args[0].toUpperCase(),user[0].magie,(parseInt(user[0].magie) + parseInt(args[1])))              
        }else if(args[0].toLowerCase() === "intelligence"){
              if(check(args[1]) === false) return;
            await data.database.query(`UPDATE player SET intelligence = '${parseInt(user[0].intelligence) + parseInt(args[1])}' WHERE id = "${message.author.id}"`)
                        await data.database.query(`UPDATE player SET ps = '${parseInt(user[0].ps) - parseInt(args[1])}' WHERE id = "${message.author.id}"`)
                        embedstats(args[0].toUpperCase(),user[0].intelligence,(parseInt(user[0].intelligence) + parseInt(args[1])))              
        }else if(args[0].toLowerCase() === "nom"){
            let partial = args.slice(1).join(" ")
            let stat = await data.database.escape(partial)
            let max = 65;
            if(partial.length >= max) return message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Erreur ! ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `Le ${args[0]} est trop long veuillez raccourcir à moins de ${max} carractère`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            })
            await data.database.query(`UPDATE player SET nom = ${stat} WHERE id = "${message.author.id}"`)
            embedstats(args[0],user[0].nom,partial)

        }else if(args[0].toLowerCase() === "prenom"){
              let partial = args.slice(1).join(" ")
            let stat = await data.database.escape(partial)
            let max = 65;
            if(partial.length >= max) return message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Erreur ! ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `Le ${args[0]} est trop long veuillez raccourcir à moins de ${max} carractère`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            })
            await data.database.query(`UPDATE player SET prenom = ${stat} WHERE id = "${message.author.id}"`)
            embedstats(args[0],user[0].prenom,partial)
        }else if(args[0].toLowerCase() === "age"){
            let stat = parseInt(args[1])
            let max = 1000;
            if(stat < 1) return message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Erreur ! ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `L'${args[0]} est trop petit vous ne pouvez pas avoir un âge négatif !`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            })
            if(stat >= max) return message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Erreur ! ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `L'${args[0]} est trop grand veuillez mettre à moins de ${max} ans`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            })
            await data.database.query(`UPDATE player SET age = ${stat} WHERE id = "${message.author.id}"`)
            embedstats(args[0],user[0].age,stat)

        }else if(args[0].toLowerCase() === "sexe"){
            let sexe = ['homme',"femme",'nonbinaire'];
            let partial = args[1]
            let stat = await data.database.escape(partial)
            let max = 65;
            if(partial.toLowerCase().length >= max) return message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Erreur ! ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `Le ${args[0]} est trop long veuillez raccourcir à moins de ${max} carractère`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            })
            if(!sexe.includes(partial.toLowerCase())) return message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Erreur ! ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `Votre sexe doit être parmis ceux là :\n ${sexe.join(" • ")}.`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            })
            await data.database.query(`UPDATE player SET sexe = ${stat} WHERE id = "${message.author.id}"`)
                        embedstats(args[0],user[0].sexe,partial)

        }else if(args[0].toLowerCase() === "image"){
            let stat = args[1]
            let regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g
            if(!stat.match(regex) ) return message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Erreur ! ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `Ce n'est pas une url valide !`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            })
            let check;
            const errorembed = {
                embed: {
                    title: "<a:error:773202660211163166> Erreur ! ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `L'url est valide, mais ce n'est pas une image !`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            }
            fetch(stat).then(async(res) => {
            console.log();
            if (res.status === 200) {
                let content_type = res.headers.get("content-type");
                if(content_type.includes("image")){
                                await data.database.query(`UPDATE player SET image = '${stat}' WHERE id = "${message.author.id}"`)
          const embed = {
                embed: {
                    color: client.maincolor,
                    title: `<:profil:774546490139869194> Modification profil`,
                    thumbnail: {
                        url: message.author.displayAvatarURL({ format: "png", dynamic: true})
                    },
                    description: `<a:update:774546814853972008> Les Données de l'utilisateur ${message.author.username} ont été modifiées`,
                    fields: [
                        {
                            name: `<:info:774546953328525312> Informations`, 
                            value: `**__Avant :__**`,
                            inline: true,
                        }
                    ],
                     image: {
                        url: user[0].image
                        },
                    footer: {
                        text: client.footer
                    },

                }
            };
            const img = {
                embed: {
                    color: client.maincolor,
                    title: `Image après`,
                     image: {
                        url: stat
                        },
                    footer: {
                        text: client.footer
                    },

                }
            };
             await message.channel.send(embed)
             await message.channel.send(img)
                             }else{
                return message.channel.send(errorembed) 
                }
                }else{
                return message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Erreur ! ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `L'url est valide, mais le liens renvoie un status http différent de 200 !`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            }) 
                }
            }).catch((err) => { 
                return message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Erreur ! ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `Le format de l'url est valide, mais le liens n'existe pas !`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            }) 
                 })
               
              
        }else if(args[0].toLowerCase() === "description"){
              let partial = args.slice(1).join(" ")
            let stat = await data.database.escape(partial)
            let max = 250;
            if(partial.length >= max) return message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Erreur ! ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `${args[0]} est trop long veuillez raccourcir à moins de ${max} carractère`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            })
            await data.database.query(`UPDATE player SET description = ${stat} WHERE id = "${message.author.id}"`)
                       partialembed(args[0],partial)

        }else if(args[0].toLowerCase() === "pouvoir"){
            let pouvoir = ['soin','lumiere','tenebre','eau','terre','renforcement','feu','air']
              let partial = args[1]
            let stat = await data.database.escape(partial)
            let max = 1000;
            if(user[0].magie < 10) return message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Erreur ! ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `Votre magie est actuellement à ${user[0].magie} vous ne pouvez pas avoir de pouvoir (Il vous faut minimum 10 en magie pour avoir un pouvoir)`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            })
            if(!pouvoir.includes(partial.toLowerCase())) return message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Erreur ! ",
                    color: 0xf36636,
                    timestamp: new Date(),
                    description: `Ce pouvoir n'existe pas, vous devez choisir un pouvoir parmis ceux là :\n ${pouvoir.join(" • ")}`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            })
            await data.database.query(`UPDATE player SET pouvoir = ${stat} WHERE id = "${message.author.id}"`)
                                 partialembed(args[0],partial)
         
    }
}
    }
}

module.exports = set;