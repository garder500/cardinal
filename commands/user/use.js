const Command = require("../../base/Command.js"),
    Discord = require("discord.js");
class use extends Command {

    constructor(client) {
        super(client, {
            name: "use",
            dirname: "user",
        });
    }

    async run(message, args, data, language) {
        if(!args[0]) return message.channel.send("Veuillez dire l'id de l'arme ou de la compétence que vous souhaitez utilisé !")
        let user = data.user
        let invtest, newinventory,  object, desc, confirm;
        let inventory = "";
        if(user.inventaire === null){
            inventory = false
        }else {
            invtest = JSON.parse(user.inventaire)
            if(invtest.item.length === 0){
              inventory = false
            }else{
           inventory = "Y a des objets" 
        }
        }
let searchword = parseInt(args[0])
        if(inventory === false){
                   desc = "Vous n'avez aucun item dans votre inventaire"
        }else{
            let inv = [];
            let newinv = [];
          for (let i = 0; i < invtest.item.length; i++) {
                inv.push(invtest.item[i].id)
            }
        for(let i=0;i<inv.length;i++){
            if(inv.includes(searchword)){
                let search = invtest.item.findIndex(x => x.id === searchword)
                   let object_use;
                    if(user.object_use === "0"){
                        object_use = "0"
                    }else{
                      object_use = user.object_use;
                    }
                   object = invtest.item[search]
                   let newobject = await data.database.escape(invtest.item[search].name)                 
                    if(object_use === "0"){
                    console.log("Inventaire modifié")                   
                    desc = `Item modifié avec succés !\nVous avez placé l'item : ${object.name}` 
                    await data.database.query(`UPDATE player SET object_use = ${newobject} WHERE id = "${message.author.id}"`)
                    }else if(object_use === newobject){
                     desc = `Impossible de mettre un item exactement pareil !`
                    }else{                    
                    await data.database.query(`UPDATE player SET object_use = ${newobject} WHERE id = "${message.author.id}"`)
                    desc = `Item modifié avec succés !\nVous avez placé l'item : ${object.name} et remplacé l'item : ${object_use}`
                    console.log("Inventaire remplacé") 
                    }
                }else{
                 desc = "Aucun item correspondant dans votre inventaire"
                }
            }
        }
           const embed = {
                embed: {
                    title: `Utilisation d'objets !`,
                    thumbnail: {
                        url: `${user.image}`,
                    },
                    description: `${desc}`
                }
            }
            await message.channel.send(embed)          
            
    }
}

module.exports = use;