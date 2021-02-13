const Command = require("../../base/Command.js"),
    Discord = require("discord.js");



class stat extends Command {

    constructor(client) {
        super(client, {
            name: "stat",
            dirname: "user",
        });
    }

    async run(message, args, data, language) {
        await message.channel.send({
            embed:{
                color: 0x0099ff,
                title: 'Vos statistiques',
                author: {
                    name: `${data.user.prenom}`,
                    icon_url: data.user.image,
                    url: data.user.image,
                    },
                description:`**» Information :** \nLes statistiques affiché si-contre pourront devenir des objectif de quête à atteindre`,
                    fields: [{
                        name: `» Nb de coups totaux`,
                        value:data.user.stat_coup,
                        inline:true
                    },
                    {
                        name: `» Nb de coups aux monstres`,
                        value:data.user.stat_coup_monster,
                        inline:true
                    },
                    {
                        name: `» Nb de coups magique aux monstres`,
                        value:data.user.stat_coup_monster_magie,
                        inline:true
                    },
                    {
                        name: `» Nb de coups aux joueurs`,
                        value:data.user.stat_coup_player,
                        inline:true
                    },
                    {
                        name: `» Nb de coups magique aux joueurs`,
                        value:data.user.stat_coup_player_magie,
                        inline:true
                    },
                     {
                        name: `» Nb de défence aux coups des monstres`,
                        value:data.user.stat_def_monster,
                        inline:true
                    },
                    {
                        name: `» Nb de défence magique aux monstres`,
                        value:data.user.stat_def_monster_magie,
                        inline:true
                    },
                    {
                        name: `» Nb de défence aux coups des joueurs`,
                        value:data.user.stat_def_player,
                        inline:true
                    },
                    {
                        name: `» Nb de défence magique aux joueurs`,
                        value:data.user.stat_def_player_magie,
                        inline:true
                    },
                    {
                        name: `» Nb de monstres tué`,
                        value:data.user.stat_kill_monster,
                        inline:true
                    },
                    {
                        name: `» Nb de joueurs assassiné`,
                        value:data.user.stat_kill_player,
                        inline:true
                    },
                    {
                        name: `» Nb de morts`,
                        value:data.user.stat_dead,
                        inline:true
                    },
                    {
                        name: `» Nb d'entrée dans un salon'`,
                        value:data.user.stat_arrived,
                        inline:true
                    },
                    {
                        name: `» Nb de sortie d'un salon`,
                        value:data.user.stat_sorted,
                        inline:true
                    }],
            timestamp: new Date(),
            }
        })
    }
}

module.exports = stat;