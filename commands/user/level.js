const Command = require("../../base/Command.js"),
    Discord = require("discord.js"),
    canvacord = require("canvacord");

class level extends Command {

    constructor(client) {
        super(client, {
            name: "level",
            dirname: "user",
        });
    }

    async run(message, args, data, language) {
        let client = this.client;
          let user;
        const mention = message.mentions.users.first() || this.client.users.cache.get(args[0]);
        if (!mention) {
            user = data.user
        } else {        
        const [user2] = await data.database.query(`SELECT * FROM player WHERE id = "${mention.id}"`);
        if(user2.length< 1){
           return await message.channel.send(this.client.globalManager.generateGlobalSystemEmbed("L'utilisateur/Robot vient d'être rajouté au cache du robot reefectuer la commande")).then(async(m) =>{
                await this.client.findOrCreateUser(mention);
           })
        }
        user = user2[0]
        }

        function convert(number) {
            let numberSymbol = ["", "K", "M", "Md", "B"];
            let str = String(number);
            let finalNumber = str;
            let symbol = Math.floor(str.length / 3.00001);
            let num = str.length % 3;
            if (symbol > 0) {
                if (num === 0) num = 3;
                num += 2;
                finalNumber = (Number(str.substr(0, num)) / 100).toFixed(2) + numberSymbol[symbol];
            }
            return String(finalNumber).replace(".00", "");
            }

    const lvl = parseInt(user.level)+1
    let xprequired = (50 * (lvl*lvl)) + (400 * lvl) + 550

    const Canvas = require('canvas')
    const canvas = Canvas.createCanvas(1000, 279)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/648609644897501194/792690495179718666/Sans_titre_115_20201227104834.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const PRENOM = user.prenom
    const NOM = user.nom
    const LVL = user.level
    const XP = convert(user.xp)
    const XPMAX = convert(xprequired)

    let PHOTO = client.users.cache.get(user.id).displayAvatarURL({ format : "jpg"})
    const PXP = user.xp/xprequired
    
    ctx.fillStyle = "#fff"
    ctx.font = `bold 20px Arial`
    ctx.fillText("LV "+LVL, 700, 150)

    function roundRect(x, y, w, h) {
        let radius = h * 0.6
        let r = x + w;
        let b = y + h;
        ctx.beginPath();
        ctx.lineWidth="4";
        ctx.moveTo(x+radius, y);
        ctx.lineTo(r-radius, y);
        ctx.quadraticCurveTo(r, y, r, y+radius);
        ctx.lineTo(r, y+h-radius);
        ctx.quadraticCurveTo(r, b, r-radius, b);
        ctx.lineTo(x+radius, b);
        ctx.quadraticCurveTo(x, b, x, b-radius);
        ctx.lineTo(x, y+radius);
        ctx.quadraticCurveTo(x, y, x+radius, y);
        ctx.fill();
    }
    ctx.fillStyle = '#e6b04a'
    roundRect(370, 160, 380, 30)
    roundRect(230, 70, 140, 140)
    let lien = await Canvas.loadImage(PHOTO);
    ctx.save()
    ctx.beginPath()
    ctx.arc(235 + 65, 75+ 65, 65, 0, 2 * Math.PI, false)
    ctx.clip()
    ctx.drawImage(lien, 235, 75, 130, 130)
    ctx.restore()
    ctx.fillStyle = '#007a7a'
    roundRect(370, 160, PXP*353.4+26.6, 30);
    ctx.fillStyle = '#fff'
    ctx.fillText(XP+"/"+XPMAX, 380, 182)

    let start = true
    let size = 20
    while (start) {
        ctx.font = `bold ${size}px Arial`
        let width = ctx.measureText(PRENOM+" "+NOM).width
        if (width > 380 || size > 38) { 
            start = false
            size--
        } else size++
    } 
    ctx.fillText(PRENOM.substr(0,20)+" "+NOM.substr(0,20), 370, 110)
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "RankCard.png");
        message.channel.send(attachment);    
    }
}

module.exports = level;