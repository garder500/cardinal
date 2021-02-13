const moment = require("moment")

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(channel) {
            const playerlogs = this.client.guilds.cache.get('768574060140822539').channels.cache.find(channel => channel.id === '785265543757692950')
        const data = {}
        const client = this.client;
 const database = await client.database();
    data.database = database;
    data.config = client.config;
          await data.database.query(`UPDATE player SET in_channel = "0" WHERE channel = "${channel.id}" && guild= "${channel.guild.id}"`)
          playerlogs.send(client.globalManager.generateGlobalSystemEmbed("Tout les joueurs présent sur le salon " + channel.name + " dans le royaume " + channel.guild.name+ " vienne d'en sortir car celui-ci vient de disparaitre"))   
    }
}
