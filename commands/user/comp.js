const Command = require("../../base/Command.js"),
    Discord = require("discord.js");
const { CanvasRenderService } = require('chartjs-node-canvas');
const Canvas = require('canvas'),
    canvacord = require("canvacord");


class comp extends Command {

    constructor(client) {
        super(client, {
            name: "comp",
            dirname: "user",
        });
    }

    async run(message, args, data, language) {
      const Canvas = require('canvas')
        const canvas = Canvas.createCanvas(800, 616)
        const ctx = canvas.getContext('2d')
        let background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/648609644897501194/794150423543808050/Sans_titre_122_20201231113005.png");
        ctx.drawImage(background, 0, 0, 800, 616);
        
        for (let i = 0; i < 8; i++){
            let nom = "Fire Ball"
            let niveau = 0
            let xp = 20
            let xpAll = 100
            let image = "https://cdn.discordapp.com/attachments/648580851734413323/793994669297238036/I_56IQE_1466612107367.png"
            let pXP = xp / xpAll
            let pm = 1
            await addSort(nom, niveau, xp, xpAll, pXP, image, i, pm)
        }
        let embed = new Discord.MessageEmbed()
            .attachFiles([{ name: "profile.png", attachment: canvas.toBuffer() }])
            .setImage('attachment://profile.png')
        message.channel.send(embed)
        async function addSort(n, l, x, xa, px, p, id, pmm) {
            let w = id*100
            let h = 0
            if (id > 3) {
            w = (id-4)*100
            h = 340
            }
            ctx.fillStyle = '#ffefa3';
            ctx.beginPath();
            ctx.arc(120+h, 100+w, 40, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillRect(120+h, 73+w, 230, 60);
            ctx.fillStyle = "#ffe262";
            ctx.beginPath();
            ctx.arc(120+h, 100+w, 35, 0, 2 * Math.PI);
            ctx.fill();
            roundRect(160+h, 105+w, 170, 20)
            ctx.fillStyle = "#62fff2";
            roundRect(160+h, 105+w, px*150+20, 20)
            ctx.fillStyle = "#000";
            ctx.font = `bold 15px Arial`
            ctx.fillText(n, 170+h, 95+w)
            ctx.fillText("LV "+l, 290+h, 95+w)
            ctx.fillText(x+" / "+xa, 170+h, 120+w)
            if (pmm !== 0) ctx.fillText(pmm+" PM", 310+h, 120+w)
            let i = await Canvas.loadImage(p)
            ctx.drawImage(i, 95+h, 75+w, 50, 50);
            i.wi
        }
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
        

    }
}

module.exports = comp;