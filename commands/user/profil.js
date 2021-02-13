const Command = require("../../base/Command.js"),
    Discord = require("discord.js");
const { CanvasRenderService } = require('chartjs-node-canvas');
const Canvas = require('canvas'),
   canvacord = require("canvacord");
 const talkedRecently = new Set();
const linkbackground = "https://tse3.mm.bing.net/th?id=OIP.Za576T10nsMaY6Vn2SvzyAHaEK&pid=Api&P=0&w=294&h=166"

const width = 400;
const height = 400;
const chartCallback = (ChartJS) => {
    ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
    ChartJS.plugins.register({
    });
    ChartJS.controllers.MyType = ChartJS.DatasetController.extend({
    });
};

class profil extends Command {

    constructor(client) {
        super(client, {
            name: "profil",
            dirname: "user",
        });
    }

    async run(message, args, data, language) {
        let user;
        const mention = message.mentions.users.first() || this.client.users.cache.get(args[0])
        if (!mention) {
            user = data.user
        } else {    
        console.log(mention)    
        const [user2] = await data.database.query(`SELECT * FROM player WHERE id = "${mention.id}"`);
        if(user2.length< 1){
            console.log("As no account or don't exist")
            return message.channel.send(this.client.globalManager.generateGlobalSystemEmbed("L'utilisateur/Robot vient d'être rajouté au cache du robot reefectuer la commande")).then(async(m) =>{
                await this.client.findOrCreateUser(mention);
           })
        }
        user = user2[0]
        }
        let img;
        const canvasRenderService = new CanvasRenderService(width, height, chartCallback);
        let object = {}
        if(user.object_use === null){
            object = {
                name: "Pas d'arme en main"
            }
        }else{                    
            object = {
                name: user.object_use
            }
        }

(async()=>{
     const configuration = {
                type: "radar",
                data: {
                    labels: [`VIT`, `INT`, `FOR`, `MAG`, `DEF`],
                    datasets: [{
                        label: "Statistique",
                        data: [parseInt(user.vitesse), parseInt(user.intelligence), parseInt(user.strength), parseInt(user.magie), parseInt(user.defense)],
                        fill: true,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgb(255, 99, 132)",
                        pointBackgroundColor: "rgb(255, 99, 132)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgb(255, 99, 132)",
                    }]
                },
                options: {
                    chartArea: {
                        backgroundColor: 'rgba(240, 240, 240, 0.2)'
                    },
                    legend: {
                        display: true,
                        labels: {
                            fontColor: 'rgb(255, 99, 132)'
                        }
                    },
                    scale: {
                        pointLabels: {
                            fontSize: 20,
                            fontColor: "#fff"
                        },
                        angleLines: {
                            display: false
                        },
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 50
                        }
                    },
                    elements: {
                        line: {
                            tension: 0,
                            borderWidth: 3,
                            backgroundColor: "rgb(23,23,23)",
                            borderColor: "rgb(0,0,0)"
                        }
                    }
                }
            };
    const canvas = Canvas.createCanvas(900, 1157)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/783082363685044226/791467241353904128/Sans_titre_112_20201224014559.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00000099';
    ctx.fillRect(20, 20, 860, 300);
    ctx.fillRect(20, 340, 300, 797);
    ctx.fillRect(340, 340, 540, 300);
    ctx.fillRect(380, 680, 460, 460);
    
    ctx.fillStyle = '#c4c4c4';
    ctx.fillRect(25, 25, 290, 290);
    ctx.fillRect(75, 695, 190, 190);
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
    const PRENOM = user.prenom
    const NOM = user.nom
    const SEXE = user.sexe
    const ARME = "POING"
    const TITRE = "Pas de titre"
    const CLASS = user.primary_class
    const [MemberClan] = await data.database.query(`SELECT * FROM clan WHERE clan_id = "${user.clan}"`)
    let clan;
    if(MemberClan.length > 0){
        clan = MemberClan[0].name
    }else{
        clan = "Pas de clan"
    }
    const TYPE = (user.pouvoir).toLowerCase()
    const PS = convert(user.ps)
    const lvl = parseInt(user.level)
    const vieMax = convert(100 + (lvl*5))
    const vie = convert(user.vie)
    const magieMax = convert(100 + (user.intelligence*2))
    const magie = user.pm
    const AGE = user.age
    const BRONZE = convert(user.bronze)
    const ARGENT = convert(user.argent)
    const OR = convert(user.gold)
    const VITESSE = convert(user.vitesse)
    const FORCE = convert(user.strength)
    const INTELLIGENCE = convert(user.intelligence)
    const DEFENSE = convert(user.defense)
    const MAGIE = convert(user.magie)
    let PHOTO = message.author.displayAvatarURL({ format: 'png' })
    if (mention) PHOTO = mention.displayAvatarURL({ format: 'png' })
    let desc = user.description
    const image = {
    "terre" :"https://cdn.discordapp.com/attachments/768574060807454722/792160445912842270/Sans_titre_114_20201225234227.png",
    "feu" :"https://cdn.discordapp.com/attachments/768574060807454722/792160445531422740/Sans_titre_114_20201225234239.png",
    "eau" :"https://cdn.discordapp.com/attachments/768574060807454722/792160445712171058/Sans_titre_114_20201225234233.png",
    "air" :"https://cdn.discordapp.com/attachments/768574060807454722/792160446068948992/Sans_titre_114_20201225234221.png"
    }
    const PVie = user.vie/(100 + (lvl*5))
    const PMagie = user.pm/(100 + (user.intelligence*2))

    let lien = await Canvas.loadImage("https://cdn.discordapp.com/attachments/768574060807454722/792156924186591262/Sans_titre_113_20201225232834.png");
    ctx.drawImage(lien, 95, 715, 150, 150)

    let type = await Canvas.loadImage("https://cdn.discordapp.com/emojis/547337808491053094.png?v=1");
    try { 
       if (image[TYPE]) {
            type = await Canvas.loadImage(image[TYPE]);
        } else type = await Canvas.loadImage("https://cdn.discordapp.com/emojis/547337808491053094.png?v=1");
    } catch (err) {
        type = await Canvas.loadImage("https://cdn.discordapp.com/emojis/547337808491053094.png?v=1");
    }

    ctx.drawImage(type, 800, 100, 70, 70)

    let photo = await Canvas.loadImage(PHOTO);
    ctx.drawImage(photo, 30, 30, 280, 280)

    let image2 = await canvasRenderService.renderToBuffer(configuration);
    let dataUrl = await canvasRenderService.renderToDataURL(configuration);
    let stream = canvasRenderService.renderToStream(configuration);


    const avatar = await Canvas.loadImage(dataUrl);
    ctx.drawImage(avatar, 380, 680, 460, 460);

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(25, 265, 150, 50);
    roundRect(35, 635, 270, 5)
    roundRect(35, 910, 270, 5)
    roundRect(360, 490, 500, 5)
    
    ctx.font = `bold 30px Arial`
    ctx.fillText(ARME, 118, 675)

    ctx.font = `bold 25px Arial`
    ctx.fillText("BRONZE: "+BRONZE, 75, 960)
    ctx.fillText("ARGENT: "+ARGENT, 75, 1000)
    ctx.fillText("OR :"+OR, 75, 1040)

    ctx.fillText(TITRE, 360, 370)
    ctx.fillText(CLASS, 360, 430)
    ctx.fillText(clan, 360, 470)

    ctx.fillText("VIT: "+VITESSE, 360, 540)
    ctx.fillText("FOR: "+FORCE, 360, 580)
    ctx.fillText("INT: "+INTELLIGENCE, 360, 620)
    ctx.fillText("DEF: "+DEFENSE, 660, 540)
    ctx.fillText("MAG: "+MAGIE, 660, 580)

    ctx.textAlign = "center"
    let start = true
    let size = 20
    while (start) {
        ctx.font = `bold ${size}px Arial`
        let width = ctx.measureText(PRENOM+" "+NOM).width
        if (width > 540 || size > 64) { 
            start = false
            size--
        } else size++
    }
    
    ctx.fillText(PRENOM.substr(0,20)+" "+NOM.substr(0,20), 600, 80)
    ctx.fillStyle = "#d1d1d1"
    ctx.textAlign = "start"
    ctx.font = `bold 30px Arial`
    ctx.fillText(SEXE, 350, 120)
    ctx.fillText("PS: "+PS, 350, 160)

    ctx.font = `bold 20px Arial`
    ctx.fillStyle = "#ffffff"
    desc = desc.split("")
    let z = 0
    for (let i = 0; i < desc.length; i++) {
        if (ctx.measureText(desc.slice(z,i).join("")).width >= 262) {
            desc[i] = desc[i]+"\n"
            z = i+1
        } else if (ctx.measureText(desc.slice(z,i).join("")).width > 240 && desc[i] === " ") {
            desc[i] = "\n"
            z = i+1
        }
    }
    desc = desc.join("").replace(/\n /g, "\n")
    ctx.fillText(desc, 25, 380)
      
    roundRect(350, 190, 500, 30)
    roundRect(350, 240, 500, 30)
    ctx.fillStyle = '#ff0000'
    if (PVie < 0.009) {} else if (PVie < 0.025) {
        roundRect(352, 196, PVie*496, 16);
    } else roundRect(352, 192, PVie*496, 26);
    ctx.fillStyle = '#00ffee'
    if (PMagie < 0.009) {} else if (PMagie < 0.025) {
        roundRect(352, 248, PMagie*496, 16);
    } else roundRect(352, 242, PMagie*496, 26);
    ctx.fillStyle = "#000000"
    ctx.textAlign = "start"
    ctx.font = "bold 25px Arial"
    ctx.fillText(vie+"/"+vieMax, 367, 215)
    ctx.fillText(magie+"/"+magieMax, 367, 265)
    ctx.fillText("AGE: "+AGE, 35, 305)

            const file = new Discord.MessageAttachment(canvas.toBuffer(), 'stats.png');
            const embed = {
                files: [file]
            }
            await message.channel.send(embed)     
        })();
    }
}

module.exports = profil;
