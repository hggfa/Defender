const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};
var http = require('http');
console.log(process.env.TOKEN)


//ANCHOR Variable globales


var prefix = "jg/";
var muted = JSON.parse(fs.readFileSync('muted.json', 'utf-8'));
var vers = fs.readFileSync('vers', 'utf-8');
var fryourperm = "⚠️**Hey ...** Je suis désolé or, vous n'avez pas la permission d'exécuter celà !";
var frmyperm = "⚠️**Hey ...** Je suis désolé or, je n'ai pas la permission d'exécuter celà !";


//ANCHOR swaping letters
function swap(text) {
    if (text === "text") return text
    var textreplaced = text.replace(/A|à|4|â|@|ã|ä|Д/gi, "a")
    var textreplaced = textreplaced.replace(/B|8|ᱠ/gi, "b")
    var textreplaced = textreplaced.replace(/८|C|\(|<|\{|\[|ç/gi, "c")
    var textreplaced = textreplaced.replace(/δ|D/gi, "d")
    var textreplaced = textreplaced.replace(/Σ|E|€|3|è|é|ê|ë|£/gi, "e")
    var textreplaced = textreplaced.replace(/∱|F/gi, "f")
    var textreplaced = textreplaced.replace(/૬|G|6/gi, "g")
    var textreplaced = textreplaced.replace(/ђ|H/gi, "h")
    var textreplaced = textreplaced.replace(/ɨ|I|1|!|\||}/gi, "i")
    var textreplaced = textreplaced.replace(/ſ|J|]/gi, "j")
    var textreplaced = textreplaced.replace(/ʞ|K/gi, "k")
    var textreplaced = textreplaced.replace(/⎳|L|7/gi, "l")
    var textreplaced = textreplaced.replace(/Π|M/gi, "m")
    var textreplaced = textreplaced.replace(/ה|N/gi, "n")
    var textreplaced = textreplaced.replace(/O|0|°|¤|#/gi, "o")
    var textreplaced = textreplaced.replace(/ᚹ|P|%/gi, "p")
    var textreplaced = textreplaced.replace(/Զ|Q|9/gi, "q")
    var textreplaced = textreplaced.replace(/ř|R/gi, "r")
    var textreplaced = textreplaced.replace(/ร|S|2|\$|&|§|\?/gi, "s")
    var textreplaced = textreplaced.replace(/ƚ|T/gi, "t")
    var textreplaced = textreplaced.replace(/մ|U|µ|ù|û/gi, "u")
    var textreplaced = textreplaced.replace(/ɤ|V|\^/gi, "v")
    var textreplaced = textreplaced.replace(/ᗯ|W/gi, "w")
    var textreplaced = textreplaced.replace(/Ӿ|X/gi, "x")
    var textreplaced = textreplaced.replace(/¥|Y/gi, "y")
    var textreplaced = textreplaced.replace(/ʓ|Z/gi, "z")
    var textreplaced = textreplaced.replace(/plutonium|pluttonium/gi, "pu")
    var textreplaced = textreplaced.replace(/tellure|telure|tellur|telur/gi, "te")
    return textreplaced
}

function dwords(text) {
    if (text === "text") return text
    var textreplaced = swap(text)
    if (textreplaced.includes("pute")) return true
    if (textreplaced.includes("pu et te")) return true
    return false
}

function nobadwords(text) {
    if (text === "text") return text
    var textreplaced = swap(text).replace(/pute|pu et te/gi, "**°°°°**")
    return textreplaced
}

function pro(iduser) {
    if (iduser === "iduser") return false;
    if (!client.users.get(iduser)) return false;
    if (client.guilds.get("517372982268657684").members.get(iduser)) {
        if (client.guilds.get("517372982268657684").members.get(iduser).roles.some(role => role.name === "JeuxGate pro" || role.name === "JeuxGate GOLD")) {
            return true;
        } else {
            return false;
        }
    } else {
        return false
    }
}

function gold(iduser) {
    if (iduser === "iduser") return false;
    if (!client.users.get(iduser)) return false;
    if (client.guilds.get("517372982268657684").members.get(iduser)) {
        if (client.guilds.get("517372982268657684").members.get(iduser).roles.some(role => role.name === "JeuxGate GOLD")) {
            return true;
        } else {
            return false;
        }
    } else {
        return false
    }
}

function log(event, serveur, version) {

    if (!event) return;
    if (!serveur) return;
    if (dwords(event)) {
        eventok = nobadwords(event)
    } else {
        eventok = event
    }
    if (client.guilds.filter(g => g.name === serveur).size !== 0) return
    console.log(`${event} dans ${serveur}`)
    if (version === 1 || version === "version") {
        const log_embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .addField("LOG : ", eventok + " dans " + serveur)
            .setTimestamp()
            .setFooter("JeuxGate")
        const log = client.channels.filter(c => c.guild.name === serveur || c.guild.name === serveur + "backup" || c.guild.id === "509748831374802954" && c.name === "log" || c.name === "jg-log" || c.name === "logs" || c.name === "jg-logs" && c.guild.member(client.user).hasPermission("EMBED_LINKS") && c.type === "text");
        log.map(z => z.send(log_embed).catch(O_o => {}))
    } else if (version === 2) {
        const log_embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .addField("LOG : ", eventok)
            .setTimestamp()
            .setFooter("JeuxGate")
        const log = client.channels.filter(c => c.guild.name === serveur || c.guild.name === serveur + "backup" || c.guild.id === "509748831374802954" && c.name === "log" || c.name === "jg-log" || c.name === "logs" || c.name === "jg-logs" && c.guild.member(client.user).hasPermission("EMBED_LINKS") && c.type === "text");
        log.map(z => z.send(log_embed).catch(O_o => {}))
    }
}


//JeuxGate


client.login(process.env.TOKEN)
client.on("ready", () => {
    console.log(`connecté : ${client.user.tag}!`)

    setInterval(function () {

        var statut = [
            `les gens taper ${prefix}help | version : ${vers}`,
            `${client.guilds.array().length} serveurs | ${client.users.filter(u => !u.bot).size} utilisateurs`,
            `être fait par jéhèndé#3800`,
            "la nouveauté ! jg/mention (un antimention)"
        ];
        var view = [
            `WATCHING`,
            `WATCHING`,
            `PLAYING`
        ];

        var random = Math.floor(Math.random() * (statut.length));

        client.user.setPresence({
            game: {
                name: statut[random],
                type: view[random]
            },
            status: 'dnd'
        });
    }, 30000);
});
client.on("raw", async event => {
    if (!events.hasOwnProperty(event.t)) return;

    const {
        d: data
    } = event;
    const user = client.users.get(data.user_id);
    const channel = client.channels.get(data.channel_id) || await user.createDM();

    if (channel.messages.has(data.message_id)) return;

    const message = await channel.fetchMessage(data.message_id);
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    let reaction = message.reactions.get(emojiKey);

    if (!reaction) {
        const emoji = new Discord.Emoji(client.guilds.get(data.guild_id), data.emoji);
        reaction = new Discord.MessageReaction(message, emoji, 1, data.user_id === client.user.id);
    }

    client.emit(events[event.t], reaction, user);
});
client.on("message", message => {
    //anti kikoo
    if (message.author.bot) return;
    if (message.system) return;
    if (message.channel.type === "dm") return message.channel.send(`Vous ne pouvez pas intéragir avec moi avec des mp. Vous devez intéragir avec moi dans un serveur !`);

    if (message.guild.roles.filter(role => role.name.toLowerCase() === "muted").size === 0) {
        message.guild.createRole({
            name: 'muted',
            color: 'LIGHT_GREY',
        }).catch(O_o => {})
    }
    if (message.guild.roles.some(role => role.name === "🔇Ne pas mentionner🔇").size === 0) {
        message.guild.createRole({
            name: '🔇Ne pas mentionner🔇',
            color: 'DARK_RED',
        }).catch(O_o => {
            message.reply(O_o).catch(err => {
                message.reply("erreure trop longue : impossibilité de créer le role ne pas mentionner")
            })
        })
    }
    if (message.guild.roles.filter(role => role.name.toLowerCase() === "muted").size !== 0) {
        message.guild.channels.map(channel => channel.overwritePermissions(message.guild.roles.filter(role => role.name.toLowerCase() === "muted").first(), {
            'SEND_MESSAGES': false
        }))
    }
    //commandes
    if (message.content.startsWith(prefix)) {
        if (message.content.startsWith(prefix + "pro?")) {
            if (pro(message.author.id)) {
                message.reply("yup")
            } else {
                message.reply("non")
            }
        }
        //REVIEW help
        if (message.content.startsWith(prefix + "help")) {
            var help_embed = new Discord.RichEmbed()
                .setColor("18d67e")
                .setTitle("Tu as besoin d'aide ?")
                .setThumbnail(message.author.avatarURL)
                .setDescription("Je suis là pour vous aider.")
                .addField("Aides", `voicis de l'aide !`)
                .addBlankField()
                .addField(":kiss: Kiss", "Fais `" + prefix + "kiss @quelqu'un` pour faire un bisous à `@quelqu'un` !")
                .addField(":hugging: Hug", "Fais `" + prefix + "hug @quelqu'un` pour faire un câlin à `@quelqu'un` !")
                .addField(":white_circle: Pile ou face", "Fais `" + prefix + "pf` pour faire un pile ou face !")
                .addField(":frame_photo: Avatar", "Fais `" + prefix + "avatar @quelqu'un` pour voir la photo de profil de `@quelqu'un` !")
                .addField(":8ball: Boule magique", "Fais `" + prefix + "8ball <vôtre question>` pour que la boule magique vous réponde") // c à la troisième personne kono
                .addField(":envelope: Serveur", "Fais `" + prefix + "serveur` pour obtenir le serveur du bot !")
                .addField(":door: Invitation", "Fais `" + prefix + "invite` pour obtenir le lien pour inviter le bot dans votre serveur !")
                .addBlankField()
                .addField(":no_bell: Mute", "Fais `" + prefix + "mute @quelqu'un` pour mute `@quelqu'un` !")
                .addField(":bell: Unmute", "Fais `" + prefix + "unmute @quelqu'un` pour unmute `@quelqu'un` !")
                .addField(":timer: Ping", "Fais `" + prefix + "ping` pour savoir le ping du bot!")
                .addField(":no_bell: Antimention", "Fais `" + prefix + "mention` pour recevoir le role d'antimention !")
                .addField(":abcd: Trouveur d'id", "Fais `" + prefix + "id <id d'une personne>` pour potentiellement savoir le nom à qui l'id est !")
                .addField(":skull_crossbones: purge", "Fais `" + prefix + "purge <un nombre>` pour supprimer <un nombre> de message(s) !")
                .addField("Bot infos", "Fais `" + prefix + "binfo` pour avoir des infos du bot !")
                .addField("Serveur infos", "Fais `" + prefix + "sinfo` pour avoir des infos du serveur !")
                .addField("Salons", "Fais `" + prefix + "channels` permet de faire les salons dédié à jeuxgate en une une commande !")
                .setTimestamp()
                .setFooter("JeuxGate")
            message.channel.send(help_embed);


            log(`utilisation de la commande d'help par ${message.author.username}`, message.guild.name, 1)
        }

        //ANCHOR FUN COMMANDES

        //REVIEW kiss
        if (message.content.startsWith(prefix + "kiss")) {
            var kiss = [
                "https://media.giphy.com/media/108M7gCS1JSoO4/giphy.gif",
                "https://media.giphy.com/media%nyGFcsP0kAobm/giphy.gif",
                "https://media.giphy.com/media%n3IuFaIanEs6I/giphy.gif",
                "https://media.giphy.com/media/KH1CTZtw1iP3W/giphy.gif",
                "https://media.giphy.com/media/wOtkVwroA6yzK/giphy.gif",
                "https://media.giphy.com/media/hnNyVPIXgLdle/giphy.gif",
                "https://media.giphy.com/media/11k3oaUjSlFR4I/giphy.gif"
            ];
            var gif = kiss[Math.floor(Math.random() * kiss.length)];
            var kiss_embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle(`Tu viens d'embrasser :`)
                .setImage(gif)
                .setTimestamp()
                .setFooter("JeuxGate")
            message.channel.send(kiss_embed);


            log(`utilisation de la commande kiss par ${message.author.username}`, message.guild.name, 1)

        }

        //REVIEW hug
        if (message.content.startsWith(prefix + "hug")) {
            var hug = [
                "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif",
                "https://media.giphy.com/media/5eyhBKLvYhafu/giphy.gif",
                "https://media.giphy.com/media/lrr9rHuoJOE0w/giphy.gif",
                "https://media.giphy.com/media/svXXBgduBsJ1u/giphy.gif"
            ];
            var gif = hug[Math.floor(Math.random() * hug.length)];
            var hug_embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle(`Tu viens de faire un câlin :`)
                .setImage(gif)
                .setTimestamp()
                .setFooter("JeuxGate")
            message.channel.send(hug_embed);


            log(`utilisation de la commande hug par ${message.author.username}`, message.guild.name, 1)
        }

        //REVIEW pile face
        if (message.content.startsWith(prefix + "pf")) {
            pileface = Math.floor(Math.random() * 2 + 0)
            if (pileface === 0) {
                message.channel.send("Vous venez d'obtenir : **Pile** !")
            } else {
                message.channel.send("Vous venez d'obtenir : **Face** !")
            }


            log(`utilisation de la commande pf par ${message.author.username}`, message.guild.name, 1)
        }

        //REVIEW avatar
        if (message.content.startsWith(prefix + "avatar")) {
            if (message.guild.member(message.mentions.users.first())) {
                var user = message.mentions.users.first()
            } else {
                var user = message.author
            }
            var avatar_embed = new Discord.RichEmbed()
                .setColor("18d67e")
                .setTitle("Voici la photo de profil de " + user.username)
                .setImage(user.avatarURL)
                .setURL(user.avatarURL)
                .setTimestamp()
                .setFooter("JeuxGate")
            message.channel.send(avatar_embed);


            log(`utilisation de la commande d'avatar par ${message.author.username}`, message.guild.name, 1)
        }

        //REVIEW 8ball
        if (message.content.startsWith(prefix + "8ball")) {
            if (message.content.substr(prefix.length + 5)) {
                var ball = [
                    //oui
                    "Plutôt, oui",
                    "Oui.",
                    "Bien sûr.",
                    "Faites ainsi.",

                    //non
                    "Non",
                    "Mes sources disent non.",
                    "Les signes disent que non.",
                    "Je dirais que non",

                    //autres
                    "Actuellement, je ne peux le prédire ...",
                    "Impossible à prédire ..."
                ];
                var ansball = ball[Math.floor(Math.random() * ball.length)];
                var ball_embed = new Discord.RichEmbed()
                    .setColor('4f0982')
                    .addField(`Voici la réponse à vôtre question :`, ansball)
                    .setTimestamp()
                    .setFooter("JeuxGate")
                message.channel.send(ball_embed);


                log(`utilisation de la commande 8ball par ${message.author.username}`, message.guild.name, 1)
            } else {
                message.channel.send("Si vous voulez que la boule magique vous réponde, vous devez déjà poser la question !")
            }
        }


        //REVIEW serveur
        if (message.content.startsWith(prefix + "serveur")) {
            var serveur_embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle('Voici le serveur du bot : ')
                .setDescription(`https://discord.gg/BSEGc9D`)
                .setURL(`https://discord.gg/BSEGc9D`)
                .setTimestamp()
                .setFooter("JeuxGate")
            message.channel.send(serveur_embed);
        }

        //REVIEW invite
        if (message.content.startsWith(prefix + "invite")) {
            var invite_embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle('Voici le lien du bot : ')
                .setDescription(`https://discordapp.com/api/oauth2/authorize?client_id=515891064721244162&permissions=8&scope=bot`)
                .setURL(`https://discordapp.com/api/oauth2/authorize?client_id=515891064721244162&permissions=8&scope=bot`)
                .setTimestamp()
                .setFooter("JeuxGate")
            message.channel.send(invite_embed);
        }

        //REVIEW id finder
        if (message.content.startsWith(prefix + "id")) {
            var idserched = message.content.substr(prefix.length + 3)
            if (!idserched || idserched === 0 || idserched === 1) {
                return message.reply("**Hey ...**Tu as oublié de mettre un id !");
            }
            if (client.users.get(idserched)) {
                message.channel.send('Utilisateur avec id `' + idserched + '` trouvé, voici son nom d\'utilisateur : `' + client.users.get(idserched).username + '`')
                message.channel.send("***Pour des raisons de confidentialitées, le discriminant*** `#----` ***n'est pas cité***")
                log(`recherche d'id de la part de ${message.author.username}`, message.guild.name, 1)
            } else {
                message.channel.send('Aucun utilisateur avec id `' + idserched + '` Trouvé !')
            }
        }

        //ANCHOR MOD COMMANDES

        //REVIEW ping
        if (message.content.startsWith(prefix + 'ping')) {
            message.channel.send('Pong! ping :`' + `${Date.now() - message.createdTimestamp}` + ' ms`');
            log(`Ping de ${message.author.username}`, message.guild.name, 1)
        }


        //REVIEW antimention
        if (message.content.startsWith(prefix + "mention")) {
            if(message.guild.roles.filter(role => role.name === "🔇Ne pas mentionner🔇").size === 0) return message.channel.send("Il n'y a pas de role ne pas mentionner sur ce serveur !")
            if (client.guilds.get(message.guild.id).members.get(message.author.id).roles.some(role => role.name === "🔇Ne pas mentionner🔇")) {
                client.guilds.get(message.guild.id).members.get(message.author.id).removeRole(message.guild.roles.filter(r => r.name === "🔇Ne pas mentionner🔇").first()).then(z => {
                    message.channel.send("le rôle \"ne pas mentionner\" vous a été retiré !")
                    var usernot = user.replace(/ \|\🔇/gi, " ")
                    client.guilds.get(message.guild.id).members.get(message.author.id).setNickname(usernot)
                }).catch(O_o => {
                    message.channel.send("Une erreure est survenue, veuillez réessayé")
                })
            } else {
                client.guilds.get(message.guild.id).members.get(message.author.id).addRole(message.guild.roles.filter(r => r.name === "🔇Ne pas mentionner🔇").first()).then(z => {
                    message.channel.send("le rôle \"ne pas mentionner\" vous a été ajouté !")
                    client.guilds.get(message.guild.id).members.get(message.author.id).setNickname(user + ' |🔇')
                }).catch(O_o => {
                    message.channel.send("Une erreure est survenue, veuillez réessayé")
                })
            }
        }

        //REVIEW demute antimention
        if (message.content.startsWith(prefix + "demute")) {
            if (!muted[message.author.id]) {
                return message.reply("Aucune personne n'est à demute.")
            }
            if (muted[message.author.id].who !== "nop") {
                if (client.guilds.get(message.guild.id).members.get(muted[message.author.id].who).size === 0) message.reply("la personne a démute n'a pas été trouvé !")
                client.guilds.get(message.guild.id).members.get(muted[message.author.id].who).removeRole(message.guild.roles.some(role => role.name === "Muted")).catch(z => message.channel.send("Une erreure est survenue !"))
                muted[message.author.id] = {
                    who: "nop"
                }
                fs.writeFile('muted.json', JSON.stringify(muted), (err) => {
                    if (err) message.channel.send(err);
                })
                message.reply("La personne a bien été démute !")
            } else {
                message.reply("Aucune personne n'est à demute.")
            }
        }

        //REVIEW purge
        if (message.content.startsWith(prefix + "purge")) {
            if (!message.author.id === "244874298714619904") {
                if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send(fryourperm);
            }
            if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send(frmyperm);

            var suppression = message.content.substr(prefix.length + 6);
            if (suppression < 2 || suppression > 10001) {
                return message.reply("**Hey ...**La valeur que vous avez entré est invalide, merci de choisir une valeur comprise entre 2 et 10000");
            }
            while (suppression > 100) {
                message.channel.bulkDelete(100, true).catch(err => message.channel.send(err))
                var suppression = suppression - 100
            }
            message.channel.bulkDelete(suppression, true).then(ok => {
                message.reply("**Suppression de " + "" + suppressions + "" + " messages**")
                    .then(message => setTimeout(function () {
                        message.delete()
                    }, 10000))

            }).catch();

            log(`utilisation de la commande de purge par ${message.author.username}`, message.guild.name, 1)
        }

        //REVIEW mute
        if (message.content.startsWith(prefix + "mute")) {
            if (!message.author.id === "244874298714619904" || !message.author.id === "471669236859928586") {
                if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send(fryourperm);
            }
            if (!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send(frmyperm);

            if (message.mentions.users.size === 0) {
                return message.reply("Tu dois mentionner quelqu'un pour faire cette commande");
            }
            var mute = message.guild.member(message.mentions.users.first());
            if (!mute) {
                return message.reply("Je n'ai pas trouvé l'utilisateur ou il n'existe pas !");
            }
            if (message.content.substr(prefix.length + 4) === " <@515891064721244162>") {
                return message.reply("Je ne peux pas me mute !");
            }

            if (message.guild.roles.filter(role => role.name.toLowerCase() === "muted").size !== 0) {
                message.guild.members.get(mute.id).addRole(message.guild.roles.filter(role => role.name.toLowerCase() === "muted").first()).then(member => {
                    message.channel.send(`${mute.user.username} a été mute par ${message.author.username} !`);


                    log(`utilisation de la commande mute par ${message.author.username}`, message.guild.name, 1)
                }).catch(e => message.reply("Impossibilité d'appliquer le role : vérifier l'ordre des roles, jeuxgate doit être au dessus de la personne à mute."))
            } else {
                message.reply("Aucun role \"muted\" trouvé.")
            }

        }

        //REVIEW unmute
        if (message.content.startsWith(prefix + "unmute")) {
            if (!message.author.id === "244874298714619904" || !message.author.id === "471669236859928586") {
                if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("**Hey ...**Vous n'avez pas la permissions d'éxécuter cela !");
            }
            if (!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");

            if (message.mentions.users.size === 0) {
                return message.reply("Tu dois mentionner quelqu'un pour faire cette commande");
            }
            var mute = message.guild.member(message.mentions.users.first());
            if (!mute) {
                return message.reply("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
            }
            if (message.content.substr(prefix.length + 6) === " <@515891064721244162>") {
                return message.reply("Je ne peux pas me unmute !")
            }

            if (message.guild.roles.filter(role => role.name.toLowerCase() === "muted").size !== 0) {
                message.guild.members.get(mute.id).removeRole(message.guild.roles.filter(role => role.name.toLowerCase() === "muted").first()).then(member => {
                    message.channel.send(`${mute.user.username} a été mute par ${message.author.username} !`);


                    log(`utilisation de la commande mute par ${message.author.username}`, message.guild.name, 1)
                }).catch(e => message.reply("Impossibilité d'appliquer le role : vérifier l'ordre des roles, jeuxgate doit être au dessus de la personne à mute."))
            } else {
                message.reply("Aucun role \"muted\" trouvé.")
            }
        }

        //REVIEW sinfo
        if (message.content.startsWith(prefix + "sinfo")) {
            var info_embed = new Discord.RichEmbed()
                .setColor("18d67e")
                .setTitle(`Infos sur le serveur : ${message.guild.name}`)
                .addField("Propriétaire du serveur", message.guild.owner.user.tag)
                .addField("Serveur crée le ", message.guild.createdAt)
                .addField("Tu as rejoin le ", message.member.joinedAt)
                .addField("Nombre total de personnes", message.guild.members.size)
                .addField("Nombre de membres", message.guild.members.size - message.guild.members.filter(member => member.user.bot).size)
                .addField("Nombre de bots", message.guild.members.filter(member => member.user.bot).size)
                .setTimestamp()
                .setFooter("JeuxGate")
            message.channel.send(info_embed)


            log(`utilisation de la commande sinfo par ${message.author.username}`, message.guild.name, 1)
        }

        //REVIEW binfo
        if (message.content.startsWith(prefix + "binfo")) {
            if (message.author.id === "244874298714619904" || !message.author.id === "471669236859928586") {
                var binfos_embed = new Discord.RichEmbed()
                    .setColor("18d67e")
                    .setTitle(`Infos sur le bot : ${client.user.tag}`)
                    .addField("Propriétaire du bot", `jéhèndé#3800 et Skalefou#8605`)
                    .addField("Bot crée le ", `25/11/2018`)
                    .addField("Nombre total de personnes ", client.users.size)
                    .addField("Nombre total de serveur", client.guilds.array().length)
                    .addField("Log Version", `Version : ` + vers + ` Complète, et réservées !`)
                    .setTimestamp()
                    .setFooter("JeuxGate")
                message.channel.send(binfos_embed)


            } else {
                var binfo_embed = new Discord.RichEmbed()
                    .setColor("18d67e")
                    .setTitle(`Infos sur le bot : ${client.user.tag}`)
                    .addField("Propriétaire du bot", `jéhèndé#3800 et Skalefou#8605`)
                    .addField("Bot crée le ", `25/11/2018`)
                    .addField("Nombre total de personnes ", client.users.size)
                    .addField("Nombre total de serveur", client.guilds.array().length)
                    .addField("Log Version", `Version : ` + vers + ` !`)
                    .setTimestamp()
                    .setFooter("JeuxGate")
                message.channel.send(binfo_embed)

                log(`utilisation de la commande binfo par ${message.author.username}`, message.guild.name, 1)
            }
        }

        //REVIEW channels
        if (message.content.startsWith(prefix + "channel")) {
            if (!message.author.id === "244874298714619904" || !message.author.id === "471669236859928586") {
                if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send(fryourperm);
            }
            if (!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send(frmyperm);
            if (message.guild.channels.filter(c => c.name === "jeuxgate-chat").size !== 0) return message.reply("Vous avez déjà les salons crées, après, si ils ne fonctionnent pas, merci de vérifier vous-même.")
            if (message.guild.channels.filter(c => c.name === "jeuxgate-chat").size === 0) {
                const jgembed = new Discord.RichEmbed()
                    .setColor(`RANDOM`)
                    .setTimestamp()
                    .setFooter("JeuxGate")
                    .setDescription("*Le message*")
                    .addField("Jeuxgate chat provided", "Nom du serveur")
                    .setAuthor("Nom de la personne", client.user.avatarURL)
                message.guild.createChannel('jeuxgate-chat', 'text', [{
                        id: message.guild.id,
                        deny: ['MANAGE_MESSAGES'],
                        allow: ['SEND_MESSAGES']
                    }])
                    .then(channel => channel.send(jgembed))
                    .catch(console.error);

            }
            if (message.guild.channels.filter(c => c.name === "log").size === 0) {
                message.guild.createChannel('log', 'text', [{
                        id: message.guild.id,
                        deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
                    }])
                    .catch(console.error);

            }
            log(`Création des salons de JG par ${message.author.tag}`, message.guild.name, 1)
        }

        //REVIEW Guild with log and jeuxgatechat
        if (message.content.startsWith(prefix + "dedisalons")) {
            if (!message.author.id === "244874298714619904" || !message.author.id === "471669236859928586") {
                message.channel.send("Vous ne pouvez PAS executer cette commande")
            }
            const jg = client.channels.filter(c => c.name === "log" || c.name === "jg-log" || c.name === "logs" || c.name === "jg-logs" && c.guild.member(client.user).hasPermission("EMBED_LINKS") && c.type === "text");
            jg.map(jg => message.channel.send(jg.guild.name + " ||log"))

            const c1 = client.channels.filter(c => c.name === "jeuxgate-chat" && c.guild.member(client.user).hasPermission("EMBED_LINKS") && c.type === "text");
            c1.map(jg => message.channel.send(jg.guild.name + " ||jgchat"))
            log(`regard des salons log / jeuxgatechat dans tous les serveurs ${message.author.tag}`, message.guild.name, 1)
        }

        //REVIEW aaa
        if (message.content.startsWith(prefix + "serveurlist")) {
            if (!message.author.id === "244874298714619904" || !message.author.id === "471669236859928586") {
                message.channel.send("Vous ne pouvez PAS executer cette commande")
            }
            client.guilds.map(jg => message.channel.send(jg.name + "| " + jg.id + "| " + jg.region + "| " + jg.memberCount + "membres"))
        }
    } else {

        //REVIEW jeuxgatechat
        if (message.channel.name === "jeuxgate-chat") {
            if (message.content.length >= 2048) return message.reply("⚠️ Vôtre message est trop long, sois, plus de 2048 caractères")
            if (message.attachments.size === 0) {
                if (gold(message.author.id)) {
                    var usernamejg = `:dvd: ${message.author.tag}  *membre gold*`
                } else if (pro(message.author.id)) {
                    var usernamejg = `:cd: ${message.author.tag}  *membre pro*`
                }
                const chembed = new Discord.RichEmbed()
                    .setColor(`RANDOM`)
                    .setTimestamp()
                    .setFooter("JeuxGate")
                    .setDescription(message.content)
                    .addField("Jeuxgate chat provided", message.guild.name)
                    .setAuthor(usernamejg, message.author.avatarURL)
                const c1 = client.channels.filter(c => c.name === "jeuxgate-chat" && c.guild.member(client.user).hasPermission("EMBED_LINKS") && c.type === "text" && c.id !== message.channel.id);
                c1.map(z => z.send(chembed).catch(O_o => {}))
                message.react('👌')
            } else {
                message.react('❌')
                message.channel.send("⚠️ **Votre message ne doit pas contenir d'image ou de fichier, ou celui-ci ne sera pas envoyé**")
            }
            return
        }

        //REVIEW antimention
        if (message.mentions.members.size !== 0) {
            if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send(frmyperm);
            if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(frmyperm);
            if (message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇Ne pas mentionner🔇")).size !== 0) {
                message.delete().catch(O_o => {
                    return message.channel.send('Erreure 505 : permission insufissante : suppression message')
                })
                muted[message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇Ne pas mentionner🔇")).first().id] = {
                    who: message.author.id
                };
                fs.writeFile('muted.json', JSON.stringify(muted), (err) => {
                    if (err) message.channel.send('Erreure 504 : Erreure sauvegarde fichier (contacter Jéhèndé#3800)')
                });
                const re = new Discord.RichEmbed()
                    .setTitle("Vous avez tenté de mentionner quelqu'un qu'on ne doit pas mentionner !")
                    .addField("message :", message.content)
                    .setTimestamp()
                    .setFooter("JeuxGate ")
                    .setAuthor(message.guild.members.get(message.author.id).displayName, message.author.avatarURL);
                const mentionnopembed = new Discord.RichEmbed()
                    .setTitle("Vous avez tenté de mentionner quelqu'un qu'on ne doit pas mentionner !")
                    .addField("message :", message.content)
                    .addField(message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇Ne pas mentionner🔇")).first().displayName + " Si tu penses qu'il ne devrait pas être mute", "tape `jg/demute` et il sera demute !")
                    .addBlankField()
                    .addField(message.guild.members.get(message.author.id).displayName, "Tu seras mute pendant 30 seconde !")
                    .setTimestamp()
                    .setFooter("JeuxGate ")
                    .setAuthor(message.guild.members.get(message.author.id).displayName, message.author.avatarURL);
                message.channel.send(mentionnopembed).then(y => {
                    client.guilds.get(message.guild.id).members.get(message.author.id).addRole(message.guild.roles.filter(role => role.name.toLowerCase() === "muted").first().id).catch(O_o => {
                        return message.channel.send('Erreure 500 : permission insuffisante : impossibilité d\'aplliquer un role')
                    })
                    setTimeout(function () {
                        y.edit(re).catch(O_o => {
                            return message.channel.send('Erreure 501 : erreure sans nom : impossibilité d\'éditer le message')
                        })
                        muted[message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇Ne pas mentionner🔇")).first()] = {
                            who: "nop"
                        };
                        fs.writeFile('muted.json', JSON.stringify(muted), (err) => {
                            if (err) message.channel.send('Erreure 500 : permission insuffisante : impossibilité d\'aplliquer un role');
                        });
                        client.guilds.get(message.guild.id).members.get(message.author.id).removeRole(message.guild.roles.filter(role => role.name.toLowerCase() === "muted").first().id).catch(O_o => {
                            return message.channel.send('Erreure 504 : Erreure sauvegarde fichier (contacter Jéhèndé#3800)')
                        })

                    }, 30000)
                })
            }
        }

        if (pro(message.author.id)) {
            if (message.content.includes("adriaayl")) {
                message.channel.send("adriaaaaaaaaaaaaaaaaaaaaaaaayl play despacito")
                log(`adriaaaaaaaaaaaaaaaaaaaaaaaayl`, message.guild.name, 2)
            }

            if (message.content.startsWith("system calls") || message.content.startsWith("system call") || message.content.startsWith("systeme calls") || message.content.startsWith("systeme call")) {
                message.channel.send("To access commands, execute `" + prefix + "` and to access the help just do `" + prefix + "help`  !")
            }
        }
        if (gold(message.author.id)) {
            if (message.content.includes("natsu") || message.content.includes("nocta")) {
                if (message.guild.members.filter(u => u.id === 564201035489607680 || u.id === 395946868753825802).size !== 0) {
                    message.reply("<@395946868753825802> <@564201035489607680>, on parle de toi")
                } else {
                    message.reply("Auh, tu parle de nocta ? la moche ? :wink:")
                }
            }
        }

    }
});
client.on("guildCreate", guild => {
    if (guild.region !== "eu-central") {
        const gd = guild.channels.filter(c => c.name === "general" || c.name === "général")
        gd.filter(c => c.send("⚠️ I'm a french bot, and I don't support english or any language !").catch(O_o => {}))
    }
    if (guild.channels.filter(c => c.name === "jeuxgate-chat").size === 0) {
        const jgembed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTimestamp()
            .setFooter("JeuxGate")
            .setDescription("*Le message*")
            .addField("Jeuxgate chat provided", "Nom du serveur")
            .setAuthor("Nom de la personne", client.user.avatarURL)
        guild.createChannel('jeuxgate-chat', 'text', [{
                id: guild.id,
                deny: ['MANAGE_MESSAGES'],
                allow: ['SEND_MESSAGES']
            }])
            .catch(O_o => {})
            .then(channel => channel.send(jgembed)).catch(O_o => {});
    }
    if (guild.channels.filter(c => c.name === "log" || c.name === "logs").size === 0) {
        guild.createChannel('log', 'text', [{
                id: guild.id,
                deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
            }])
            .catch(O_o => {});
    }
    log(`Un nouveau serveur a été ajouté, le voici : ` + guild.name, guild.name, 2)
    if (guild.roles.some(role => role.name === "🔇Ne pas mentionner🔇").size === 0) {
        guild.createRole({
            name: '🔇Ne pas mentionner🔇',
            color: 'DARK_RED',
        }).catch(O_o => {})
    }
    if (guild.roles.some(role => role.name.toLowerCase() === "muted").size === 0) {
        guild.createRole({
            name: 'muted',
            color: 'LIGHT_GREY',
        }).catch(O_o => {})
    }
    if (guild.roles.some(role => role.name.toLowerCase() === "muted").size !== 0) {
        guild.channels.map(channel => channel.overwritePermissions(guild.roles.some(role => role.name.toLowerCase() === "muted").first(), {
            'SEND_MESSAGES': false
        }))
    }
    if (guild.channels.filter(c => c.name === "log").size === 0 || guild.channels.filter(c => c.name === "jeuxgate-chat").size === 0) {
        const gd = guild.channels.filter(c => c.name === "general" || c.name === "général")
        gd.filter(c => c.send("⚠️ Merci de bien vouloir me donner des droits administrateurs, ou créer les salons vous même").catch(O_o => {}))
    }
});
client.on("guildDelete", guild => {
    log(`Un nouveau serveur a été retiré, le voici : ` + guild.name, guild.name, 2)
});


//SK_bot


client.on("message", message => {
    if (message.author.id === client.user.id) return
    if (message.author.bot) return
    //anti botsception
    if (message.channel.type === "dm") return
    //anti dm
    if (message.guild.id !== "474693373287071745") {
        if (!message.content.startsWith("SK_")) return
        if (message.content === " SK_help") {
            var helpo_embed = new Discord.RichEmbed()
                .setColor("18d67e")
                .setTitle("Tu as besoin d'aide ?")
                .setThumbnail(message.author.avatarURL)
                .setDescription("Je suis là pour vous aider.")
                .addField("Aides", `voicis de l'aide !`)
                .addField(":tools: Rôle", "Fais `SK_role` pour voir quel rôle SK_ est utilisé !")
                .setTimestamp()
                .setFooter("SK_Bot - JeuxGate")
            message.channel.send(helpo_embed);
        }
        if (message.content === "SK_role") {
            if (message.guild.roles.filter(r => r.name === "Membre SK_").size !== 0) {
                message.channel.send("Rôle situé à la  " + message.guild.roles.filter(r => r.name === "Membre SK_").first().position + " position (de bas en haut)")
            } else {
                message.channel.send("Aucun rôle trouvé (il doit obligatoirement s'appeller `Membre SK_`) !")
            }
        }
    } else {
        if (client.guilds.get(message.guild.id).members.get(message.author.id).nickname) {
            var user = client.guilds.get(message.guild.id).members.get(message.author.id).nickname
        } else {
            var user = message.author.username
        }
        if (client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === message.channel.name).size !== 0) { // si le salon du message existe dans la team de backup et que c'est un salon textuel 
            const embed = new Discord.RichEmbed()
                .addField(user + " : ", message.content + "-")
                .setTimestamp()
                .setFooter(client.user.tag + " - Jéhèndé#3800")
                .setAuthor("-", message.author.avatarURL)
            client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === message.channel.name).map(e => e.send(embed)) // envoier le message en embed
        } else {
            client.guilds.get("563771921812946964").createChannel(message.channel.name, 'text', [{ //créer le salon
                    id: message.guild.id,
                    deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
                }]).then(z => {
                    const embed = new Discord.RichEmbed()
                        .addField(user + " : ", message.content + "-")
                        .setTimestamp()
                        .setFooter(client.user.tag + " - Jéhèndé#3800")
                        .setAuthor("-", message.author.avatarURL)
                    z.send(embed) // envoyer le message en embed
                })
                .catch(O_o => {}) // on annule toutes les erreures
        }
        if (message.content.startsWith("SK_")) {
            if (message.content === "SK_mention") {
                if (client.guilds.get(message.guild.id).members.get(message.author.id).roles.some(role => role.name === "🔇SK_Ne pas mentionner🔇")) {
                    client.guilds.get(message.guild.id).members.get(message.author.id).removeRole('566278745766232065').then(z => {
                        message.channel.send("le rôle \"ne pas mentionner\" vous a été retiré !")
                        var usernot = user.replace(/ \| \🔇/gi, " ")
                        client.guilds.get(message.guild.id).members.get(message.author.id).setNickname(usernot)
                    }).catch(O_o => {
                        message.channel.send("Une erreure est survenue, veuillez réessayé")
                    })
                } else {
                    client.guilds.get(message.guild.id).members.get(message.author.id).addRole('566278745766232065').then(z => {
                        message.channel.send("le rôle \"ne pas mentionner\" vous a été ajouté !")
                        client.guilds.get(message.guild.id).members.get(message.author.id).setNickname(user + ' | 🔇')
                    }).catch(O_o => {
                        message.channel.send("Une erreure est survenue, veuillez réessayé")
                    })
                }
            }
            if (message.content === "SK_help") {
                var help_embed = new Discord.RichEmbed()
                    .setColor("18d67e")
                    .setTitle("Tu as besoin d'aide ?")
                    .setThumbnail(message.author.avatarURL)
                    .setDescription("Je suis là pour vous aider.")
                    .addField("Aides", `voicis de l'aide !`)
                    .addField(":tools: Modération", "Fais `SK_mention` pour Avoir le rôle d'anti mention !")
                    .setTimestamp()
                    .setFooter("SK_Bot - JeuxGate")
                message.channel.send(help_embed);
            }
            if (message.content === "SK_demute") {
                if (!muted[message.author.id]) {
                    return message.reply("Aucune personne n'est à demute. array non set")
                }
                if (muted[message.author.id].who !== "nop") {
                    if (client.guilds.get(message.guild.id).members.get(muted[message.author.id].who).size === 0) message.reply("la personne a démute n'a pas été trouvé !")
                    client.guilds.get(message.guild.id).members.get(muted[message.author.id].who).removeRole('474885335709515785').catch(z => message.channel.send("Une erreure est survenue !"))
                    muted[message.author.id] = {
                        who: "nop"
                    }
                    fs.writeFile('muted.json', JSON.stringify(muted), (err) => {
                        if (err) message.channel.send(err);
                    })
                    message.reply("La personne a bien été démute !")
                } else {
                    message.reply("Aucune personne n'est à demute.")
                }
            }
        }
        if (message.mentions.members.size !== 0) {
            if (message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇SK_Ne pas mentionner🔇")).size !== 0) {
                message.delete()
                muted[message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇SK_Ne pas mentionner🔇")).first().id] = {
                    who: message.author.id
                };
                fs.writeFile('muted.json', JSON.stringify(muted), (err) => {
                    if (err) message.channel.send(err);
                });
                const re = new Discord.RichEmbed()
                    .setTitle("Vous avez tenté de mentionner quelqu'un qu'on ne doit pas mentionner !")
                    .addField("message :", message.content)
                    .setTimestamp()
                    .setFooter("SK_Bot ")
                    .setAuthor(user, message.author.avatarURL);
                const mentionnopembed = new Discord.RichEmbed()
                    .setTitle("Vous avez tenté de mentionner quelqu'un qu'on ne doit pas mentionner !")
                    .addField("message :", message.content)
                    .addField(message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇SK_Ne pas mentionner🔇")).first().displayName + "Si tu penses qu'il ne devrait pas être mute", "tape `SK_demute` et sera demute !")
                    .addField(user, "Tu seras mute pendant 30 seconde !")
                    .setTimestamp()
                    .setFooter("SK_Bot ")
                    .setAuthor(user, message.author.avatarURL);
                message.channel.send(mentionnopembed).then(y => {
                    client.guilds.get(message.guild.id).members.get(message.author.id).addRole('474885335709515785')
                    setTimeout(function () {
                        y.edit(re);
                        muted[message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇SK_Ne pas mentionner🔇")).first()] = {
                            who: "nop"
                        };
                        fs.writeFile('muted.json', JSON.stringify(muted), (err) => {
                            if (err) message.channel.send(err);
                        });
                        client.guilds.get(message.guild.id).members.get(message.author.id).removeRole('474885335709515785')

                    }, 30000)
                })
            }
        }
    }
});
client.on("guildMemberAdd", member => {
    if (member.guild.id !== "474693373287071745") {
        if (member.guild.roles.filter(r => r.name === "Membre SK_").size !== 0) {
            if (client.guilds.get("474693373287071745").members.get(member.id).size !== 0) {
                if (client.guilds.get("474693373287071745").members.get(member.id).roles.filter(z => z.name === "Membre SK_").size !== 0) {
                    member.addRole(member.guild.roles.filter(r => r.name === "Membre SK_").first().id)
                }
            }
        }
    }
});
client.on("channelCreate", channel => {
    if (channel.guild.id !== "474693373287071745") return
    if (client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === channel.name).size === 0) {
        client.guilds.get("563771921812946964").createChannel(channel.name, 'text', [{ //créer le salon
                id: channel.guild.id,
                deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
            }]).then(z => {
                const createembed = new Discord.RichEmbed()
                    .addField(channel.name + " : ", "Salon crée")
                    .setTimestamp()
                    .setFooter(client.user.tag + " - Jéhèndé#3800")
                z.send(createembed) // envoier le message en createembed
            })
            .catch(O_o => {}) // on annule toutes les erreures
    } else {
        const createembed = new Discord.RichEmbed()
            .addField(channel.name + " : ", "Salon crée")
            .setTimestamp()
            .setFooter(client.user.tag + " - Jéhèndé#3800")
        client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === channel.name).map(e => e.send(createembed)) // envoier le message en embed
    }
});
client.on("channelDelete", channel => {
    if (channel.guild.id !== "474693373287071745") return
    if (client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === channel.name).size === 0) {
        client.guilds.get("563771921812946964").createChannel(channel.name, 'text', [{ //créer le salon
                id: channel.guild.id,
                deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
            }]).then(z => {
                const deleteembed = new Discord.RichEmbed()
                    .addField(channel.name + " : ", "Salon supprimé")
                    .setTimestamp()
                    .setFooter(client.user.tag + " - Jéhèndé#3800")
                z.send(deleteembed) // envoier le message en deleteembed
            })
            .catch(O_o => {}) // on annule toutes les erreures
    } else {
        const deleteembed = new Discord.RichEmbed()
            .addField(channel.name + " : ", "Salon supprimé")
            .setTimestamp()
            .setFooter(client.user.tag + " - Jéhèndé#3800")
        client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === channel.name).map(e => e.send(deleteembed)) // envoier le message en embed
    }
});
client.on("channelUpdate", function (oldChannel, newChannel) {
    if (oldChannel.guild.id !== "474693373287071745") return
    if (oldChannel.name === newChannel.name) return
    if (oldChannel.deleted) return
    if (newChannel.deleted) return
    if (client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === oldChannel.name).size === 0) {
        client.guilds.get("563771921812946964").createChannel(newChannel.name, 'text', [{ //créer le salon
                id: newChannel.guild.id,
                deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
            }]).then(z => {
                const renameembed = new Discord.RichEmbed()
                    .addField(newChannel.name + " : ", "Salon renommé")
                    .setTimestamp()
                    .setFooter(client.user.tag + " - Jéhèndé#3800")
                z.send(renameembed) // envoier le message en deleteembed
            })
            .catch(O_o => {}) // on annule toutes les erreures
    } else {
        const renameembed = new Discord.RichEmbed()
            .addField(newChannel.name + " : ", "Salon renommé")
            .setTimestamp()
            .setFooter(client.user.tag + " - Jéhèndé#3800")
        client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === oldChannel.name).map(e => e.setName(`${newChannel.name}`).then(v => v.send(renameembed))) // envoier le message en embed
    }
});
/*client.on("guildCreate", guild => {
    guild.createRole({
        name: 'Membre SK_',
        color: 'DARK_GREEN',
    }).then(r => {
        guild.members.filter(u => client.guilds.get("474693373287071745").members.get(u.id)).filter(u => client.guilds.get("474693373287071745").members.get(u.id).roles.some(z => z.name === "Membre SK_")).map(i => i.addRole(r).catch(O_o => {}))
    }).catch(O_o => {})
});
*/
client.on("messageReactionAdd", (reaction, user) => {
    if (reaction.message.id === "585895219455721473") {
        const gmuteon = "**Modération** \r\n <:emoji_vert:561463156434796545>**Mute global (🔇)**\r\nCette option permet de rendre tout le monde muet, partout\r\n\r\n<:emoji_rouge:561463105083670528> programme inactif - <:emoji_bleu:561463041028390922> chargement du programme - <:emoji_vert:561463156434796545> programme en cours"
        const gmuteoff = "**Modération** \r\n\r\n <:emoji_rouge:561463105083670528>**Mute global (🔇)**\r\nCette option permet de rendre tout le monde muet, partout\r\n\r\n<:emoji_rouge:561463105083670528> programme inactif - <:emoji_bleu:561463041028390922> chargement du programme - <:emoji_vert:561463156434796545> programme en cours"
        const gmuteomaybe = "**Modération** \r\n <:emoji_bleu:561463041028390922>**Mute global (🔇)**\r\nCette option permet de rendre tout le monde muet, partout\r\n\r\n<:emoji_rouge:561463105083670528> programme inactif - <:emoji_bleu:561463041028390922> chargement du programme - <:emoji_vert:561463156434796545> programme en cours"
        if (client.guilds.get("474693373287071745").members.get(user.id).roles.some(rolex => rolex.name === "Membre Staff")) {
            if (reaction.emoji.name === "🔇") {

                if (reaction.message.content.includes("<:emoji_vert:561463156434796545>**Mute global (🔇)**")) {
                    reaction.message.edit(reaction.message.content.replace(/<:emoji_vert:561463156434796545>\*\*Mute/gi, "<:emoji_bleu:561463041028390922>**Mute"))
                    console.log("receive that")
                    reaction.remove(user)
                    setTimeout(function () {
                        client.guilds.get("474693373287071745").channels.map(ch => ch.overwritePermissions(reaction.message.channel.guild.defaultRole, {
                            SEND_MESSAGES: null
                        }));
                        reaction.message.edit(gmuteoff)
                    }, 7000)
                    return
                } else if (reaction.message.content.includes("<:emoji_rouge:561463105083670528>**Mute global (🔇)**")) {
                    reaction.message.edit(reaction.message.content.replace(/<:emoji_rouge:561463105083670528>\*\*Mute/gi, "<:emoji_bleu:561463041028390922>**Mute"))
                    console.log("receive that off")
                    reaction.remove(user)
                    setTimeout(function () {
                        reaction.message.edit(reaction.message.content.replace(/<:emoji_bleu:561463041028390922>\*\*Mute/gi, "<:emoji_vert:561463156434796545>**Mute"));
                        client.guilds.get("474693373287071745").channels.map(ch => ch.overwritePermissions(reaction.message.channel.guild.defaultRole, {
                            SEND_MESSAGES: false
                        }))
                    }, 7000)
                    return
                } else if (reaction.message.content.includes("<:emoji_bleu:561463041028390922>**Mute global (🔇)**")) {
                    console.log("receive that sooner")
                    reaction.remove(user)
                    return
                }

            } else {
                console.log('unknown')
            }
        } else {
            reaction.message.channel.send(fryourperm)
        }

        console.log("wtf was dat")
        reaction.message.edit(gmuteoff)
        reaction.remove(user)
    }
});


//shruggy


client.on("message", message => {
    if (message.author.id === client.user.id) return
    if (message.channel.id === "428569427718438933") {
        if (message.content === "ok" || message.content === "Ok" || message.content === "OK") {

            message.delete()

            let user = message.guild.member(message.author);
            user.addRole(message.guild.roles.find(m => m.id === "484350151058784257")).catch(err => {
                message.channel.send(err).then(message => setTimeout(function () {
                    message.delete()
                }, 5000))
            });
            user.addRole(message.guild.roles.find(m => m.id === "507213640697380886")).catch(err => {
                message.channel.send(err).then(message => setTimeout(function () {
                    message.delete()
                }, 5000))
            });
            user.addRole(message.guild.roles.find(m => m.id === "507213819366473738")).catch(err => {
                message.channel.send(err).then(message => setTimeout(function () {
                    message.delete()
                }, 5000))
            });
            user.addRole(message.guild.roles.find(m => m.id === "503142506867982346")).catch(err => {
                message.channel.send(err).then(message => setTimeout(function () {
                    message.delete()
                }, 5000))
            });
            user.removeRole('515590184373452801').catch(err => {
                message.channel.send(err).then(message => setTimeout(function () {
                    message.delete()
                }, 5000))
            });
            message.reply(`**Bravo, tu as accepté le règlement**`).then(message => setTimeout(function () {
                message.delete()
            }, 2000));

        } else {
            message.delete()
            message.reply("Veuillez envoyé `ok` dans le salon, et non autre chose").then(message => setTimeout(function () {
                message.delete()
            }, 3000))
        }
    }

});
client.on("messageReactionAdd", (reaction, user) => {
    if (reaction.message.id === "503157906116575273") {
        if (reaction.emoji.name === "0⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "503157947052982283")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "503157947052982283"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "503157947052982283"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "1⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "503164870254919680")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "503164870254919680"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "503164870254919680"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "2⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "503175463296827423")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "503175463296827423"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "503175463296827423"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "3⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "503169151020564490")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "503169151020564490"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "503169151020564490"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        reaction.remove(user)
    } else if (reaction.message.id === "507220691783909376") {
        if (reaction.emoji.name === "0⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "507211890917638154")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "507211890917638154"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "507211890917638154"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "1⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "507242461652058114")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "507242461652058114"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "507242461652058114"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "2⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "507239960399839232")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "507239960399839232"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "507239960399839232"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "3⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "507246940895969294")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "507246940895969294"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "507246940895969294"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        reaction.remove(user)
    } else if (reaction.message.id === "503265807854469134") {
        if (reaction.emoji.name === "0⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "503263996036513803")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "503263996036513803"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "503263996036513803"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        reaction.remove(user)
    }
});
