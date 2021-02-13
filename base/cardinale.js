const { Client, Collection } = require("discord.js"),
    path = require("path");
const mysql = require('mysql2');
const config = require("../config");
const createConnextion = mysql.createPool({ host: config.mysql.host, port: config.mysql.port, user: config.mysql.user, password: config.mysql.password, database: config.mysql.database, waitForConnections: true, connectionLimit: 1, queueLimit: 0 });

class Cardinale extends Client {

    constructor(options) {
        super(options);
        this.config = require("../config");
        this.commands = new Collection();
        this.aliases = new Collection();
        this.functions = require("../utils/functions");
        this.clanManager = require("../utils/clanManager");
        this.globalManager = require("../utils/globalManager");
        this.economyManager = require("../utils/economyManager");
    }

    loadCommand(commandPath, commandName) {
        const props = new (require(`.${commandPath}${path.sep}${commandName}`))(this);
        props.conf.location = commandPath;
        if (props.init) {
            props.init(this);
        }
        this.commands.set(props.help.name, props);
        props.conf.aliases.forEach((alias) => {
            this.aliases.set(alias, props.help.name);
        });
        return false;
    }

    async unloadCommand(commandPath, commandName) {
        let command;
        if (this.commands.has(commandName)) {
            command = this.commands.get(commandName);
        } else if (this.aliases.has(commandName)) {
            command = this.commands.get(this.aliases.get(commandName));
        }
        if (!command) {
            return;
        }
        if (command.shutdown) {
            await command.shutdown(this);
        }
        delete require.cache[require.resolve(`.${commandPath}${path.sep}${commandName}.js`)];
        return false;
    }




    async database() {
        var promiseDB = createConnextion.promise();
        return promiseDB;
    }

    async findOrCreateUser(user) {
        const [rows] = await (await this.database()).query(`SELECT * FROM player WHERE id = "${user.id}"`);
        if (rows.length < 1) {
            const createUser = await (await this.database()).query(`INSERT INTO player (id,prenom,nom,image,language) VALUES ('${user.id}','${user.username}','(Sans fiche)','${user.displayAvatarURL()}','fr')`);
            return createUser[0];
        } else {
            return rows[0];
        }
    }

    async findOrCreateMonster(user,channel,guild,monster_id,vie,level){
         const [rows] = await (await this.database()).query(`SELECT * FROM monster WHERE id = "${user.id}" && channel = "${channel.id}" && guild = "${guild.id}"`);
        if (rows.length < 1) {
            const createUser = await (await this.database()).query(`INSERT INTO monster (id,channel,guild,monster_id,vie,level) VALUES ('${user.id}','${channel.id}','${guild.id}','${monster_id}','${vie}','${level}')`);
            return createUser[0];
        } else {
            return rows[0];
        }
    }
}

module.exports = Cardinale;