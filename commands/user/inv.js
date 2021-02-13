const Command = require("../../base/Command.js"),
    Discord = require("discord.js"),
    Canvas = require('canvas');
    let object = require("../../object")
class inv extends Command {

    constructor(client) {
        super(client, {
            name: "inv",
            dirname: "user",
        });
    }

    async run(message, args, data, language) {
        let user = data.user
if(!args[0]){
const canvas = Canvas.createCanvas(600, 500)
const ctx = canvas.getContext('2d')
let background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/648609644897501194/793555517867950130/Sans_titre_118_20201229200610.png");
let ressources = [{id: "1", q: 2, icon: "https://tse3.mm.bing.net/th?id=OIP.j0qkhgUCYq8wpb2mIo8QbAHaHX&pid=Api&P=0&w=300&h=300"}]
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
for (let i = 0; i < 5; i++) {
  for (let y = 0; y < 6; y++) {
    ctx.fillStyle = "#00000080";
    ctx.fillRect(5+(100*y), 5+(100*i), 90, 90);
    ctx.fillStyle = "#ffffff80";
    ctx.fillRect(5+(100*y), 75+(100*i), 90, 20);
    if (ressources[(i*6)+y] !== undefined) {
              let img = await Canvas.loadImage(ressources[(i*6)+y].icon);
      ctx.drawImage(img, 20+(100*y), 10+(100*i), 60, 60);
      ctx.fillStyle = "#000000CC";
      ctx.font = "13px Arial"
      ctx.fillText(ressources[(i*6)+y].id, 5+(100*y)+5, 75+(100*i)+15) 

      ctx.textAlign = "center"
      ctx.font = "10px Arial"
      ctx.fillText(ressources[(i*6)+y].q, 68+(100*y)+5, 74+(100*i)+15) 
      ctx.textAlign = "start"
    }
  }
}
const file = new Discord.MessageAttachment(canvas.toBuffer(), 'inv.png');
 const embed = {
                files: [file]
            }
 message.channel.send(embed)  
}else{
    const canvas = Canvas.createCanvas(700, 500)
const ctx = canvas.getContext("2d")
let lastend = 0, data, force, vitesse, magie, défense, temps, myTotal, myColor, colorFiole, ImageNotPotion, purete, qualité;
//Donner a modifier
let consombale = true
let potion = false
if (!consombale) { 
   force = 15;
   vitesse = 40;
   magie = 30;
   if (potion) {
    temps = "10h";
    data = [force, magie, vitesse]  //Edit pas
    colorFiole = "#ED0000"
   } else {
        défense = 10;
       data = [force, magie, vitesse, défense]  //Edit pas
   }
   myTotal = 0;  //Edit pas
   myColor = ["#ED0000","#25fde9", "#654321", "#000000"]; //Edit pas
} else {
    purete = 100
    qualité = "Bonne"
}
if (!potion) ImageNotPotion = "https://icons-for-free.com/iconfiles/png/512/key+password+unlock+icon-1320190846512238901.png"
let desc = "C'est une super clé !"
let name = "Super clé"
let level = "100"
//Fin des donner a modifier
let background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/692712497844584448/793610229299413043/starry-sky-zoom-meeting-background-design-template-effc86d5ca59c77b6b817943f0342de8_screen.jpg");
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#ffffff1A";
ctx.fillRect(370, 20, 310, 460);
ctx.fillStyle = "#ffffff80";
ctx.fillRect(380, 50, 290, 5);
ctx.fillStyle = "#ffffff40";
ctx.fillRect(380, 70, 290, 20);
ctx.fillRect(380, 100, 290, 20);
if (!consombale) ctx.fillRect(380, 130, 290, 20);
if (!consombale) ctx.fillRect(380, 160, 290, 20);
ctx.fillStyle = "#ffffff";
ctx.font = "20px Arial"
ctx.fillText(name, 390, 40) 
ctx.fillText("Lvl "+level, 600, 40) 
desc = desc.split("")
let z = 0
for (let i = 0; i < desc.length; i++) {
    if (ctx.measureText(desc.slice(z,i).join("")).width >= 262) {
        desc[i] = desc[i]+"\n"
        z = i+1
    } else if (ctx.measureText(desc.slice(z,i).join("")).width > 250 && desc[i] === " ") {
        desc[i] = "\n"
        z = i+1
    }

}
desc = desc.join("").replace(/\n /g, "\n")
if (!consombale) ctx.fillText(desc, 385, 385)
if (consombale) ctx.fillText(desc, 385, 150)
        let icon;
if (!consombale) {
    ctx.font = "15px Arial"
    ctx.fillStyle = myColor[0];
    ctx.fillText("Force: "+data[0], 390, 85)
    ctx.fillStyle = myColor[1];
    ctx.fillText("Magie: "+data[1], 390, 85+30)
    ctx.fillStyle = myColor[2];
    ctx.fillText("Vitesse: "+data[2], 390, 85+60)
    if (potion) {
        icon = await Canvas.loadImage("https://cdn.discordapp.com/attachments/757326675599163442/793889170724093952/Sans_titre_119_20201230181202.png");
        let color = colorFiole+"80"
        colorPotion(color)
        ctx.fillStyle = "#ffffff";
        ctx.fillText("Temps: "+temps, 390, 85+90)
    } else {
        icon = await Canvas.loadImage(ImageNotPotion);
        ctx.fillStyle = myColor[3];
        ctx.fillText("Défense: "+data[3], 390, 85+90)
    }
    graphique()
} else {
    icon = await Canvas.loadImage(ImageNotPotion)
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Qualité de l'objet: "+qualité, 392, 85)
    ctx.fillText("Pureté de l'objet "+purete, 392, 85+30)
}
let P = icon.height / icon.width
let P2 = 300 * P
ctx.drawImage(icon, 50, (canvas.height-P2)/2, 300, P2);


function colorPotion(color) {
    ctx.fillStyle = color;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(160,250);
    ctx.lineTo(240,250);
    ctx.lineTo(330,420);
    ctx.lineTo(75,420);
    ctx.closePath();
    ctx.fill();
}
function graphique() {
    for (let e = 0; e < data.length; e++) {
        myTotal += data[e];
    }   
    for (let i = 0; i < data.length; i++) {
        ctx.fillStyle = myColor[i]+"80";
        ctx.beginPath();
        ctx.moveTo(530, 280);
        ctx.arc(530, 280, 70, lastend, lastend + (Math.PI * 2 * (data[i] / myTotal)), false);
        ctx.lineTo(530, 280);
        ctx.fill();
        lastend += Math.PI * 2 * (data[i] / myTotal);
    }
}
    const file = new Discord.MessageAttachment(canvas.toBuffer(), 'inv.png');
 const embed = {
                files: [file]
            }
 message.channel.send(embed) 
}         
    }
}

module.exports = inv;