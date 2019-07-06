const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
var http = require('http');
var express = require('express');
var app = express();

var list = fs.readFileSync('list.json', 'utf-8');
var vers = fs.readFileSync('vers', 'utf-8');

client.login(process.env.TOKEN)
client.on("ready", () => {
    console.log(`connecté : ${client.user.tag}!`)
    
    app.get('/users', function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.send("" + client.users.filter(u => !u.bot).size + " " + client.users.size);
    });
    
    app.get('/vers', function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.send(vers + "");
    });
    
    app.get('/guilds', function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.send(client.guilds.size + "");
    });
    
    app.get('/guildsname', function(req, res) {
        res.setHeader('Content-Type', 'text/html');
        list = "";
        fs.writeFile('list.json', list, (err) => {
            if (err) message.channel.send(err);
        });
        setTimeout(function () {}, 50);
        client.guilds.map(jg => {
            var jglist = list + "<tr><td id=\"name\">" + jg.name + "</td><td id=\"id\">" + jg.id + "</td><td id=\"region\">" + jg.region + "</td><td id=\"members\">" + jg.memberCount + "membres</td></tr>";
            
            list = jglist;
            fs.writeFile('list.json', list, (err) => {
                if (err) message.channel.send(err);
            });
            setTimeout(function () {}, 50);
        });
        res.send("<table>" + list + "</table>");
    });
    
    app.get('/guildname/:gid', function(req, res) {
        res.setHeader('Content-Type', 'text/html');
        if(client.guilds.filter(g => g.id === req.params.gid).size !== 0){
            res.send("<tr><td>" + client.guilds.filter(g => g.id === req.params.gid).first().name + "</td><td>" + client.guilds.filter(g => g.id === req.params.gid).first().id + "</td><td>" + client.guilds.filter(g => g.id === req.params.gid).first().region + "</td><td>" + client.guilds.filter(g => g.id === req.params.gid).first().memberCount + "membres</td></tr>");
        }else{
            res.send("404");
        }
    });
    
    app.get('/name/:name', function(req, res) {
        if(client.users.filter(mem => mem.username.toUpperCase() === req.params.name.toUpperCase()).size !== 0){
            if(client.users.filter(mem => mem.username.toUpperCase() === req.params.name.toUpperCase()).size !== 2){
                res.setHeader('Content-Type', 'text/plain');
                res.send("It's good, amen");
            }else{
                res.render('choosetag.ejs', {username: req.params.name, url : process.env.site});
            }
        }else{
            res.setHeader('Content-Type', 'text/plain');
            res.send("404")
        }
    });
    
    app.get('/nametag/:nametag', function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        if(client.users.filter(mem => `${mem.username.toUpperCase()}${mem.discriminator}` === req.params.nametag.toUpperCase()).size !== 0){
            if(client.users.filter(mem => `${mem.username.toUpperCase()}${mem.discriminator}` === req.params.nametag.toUpperCase()).size !== 2){
                res.send("It's good, amen");
            }else{
                res.render('choosetag.ejs', {username: req.params.name, url : process.env.site});
            }
        }else{
            res.send("dunno")
        }
    });
    
    app.get('/name/', function(req, res) {
        res.render('choosename.ejs', {url : process.env.site});
    });
    
    app.use(function(req, res, next){
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('404');
    });
    app.listen(process.env.PORT || 80);
});

