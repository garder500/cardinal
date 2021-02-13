const config = require("../config.js");
const wait = require('util').promisify(setTimeout);
const axios = require("axios")

module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run() {
        this.client.user.setActivity(`Cardinal vous observe`, { url: "https://www.twitch.tv/blblbl", type: 'WATCHING' })

        setInterval(() => {
            this.client.user.setActivity(`Cardinal vous observe`, { url: "https://www.twitch.tv/blblbl", type: 'WATCHING' })
        }, 900000);

        console.log(`\x1b[36m%s\x1b[0m`, '[INFO]', '\x1b[0m', 'Connecté sur ' + this.client.user.username + '#' + this.client.user.discriminator + ' / identifiant : ' + this.client.user.id + ' / créé le : ' + this.client.user.createdAt);
    };
}

