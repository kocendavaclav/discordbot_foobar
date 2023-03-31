const Discord = require('discord.js')
const db = require('./db');
module.exports ={
    getMeAColor(client,id){
        if(!client.colors){
            client.colors = new Discord.Collection();
            
        };
        if(client.colors.get(id)){
            return client.colors.get(id);
        }else{
            return '#000000';
        };
    }
};
