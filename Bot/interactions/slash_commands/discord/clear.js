const config = require('../../../data/config.json');
module.exports = {
    name: 'clear',
    aliases: [],
	options:[],
    description: "Clears the chat",
    usage: '.clear',
	help: '',
	man: '',
    private: false,
    async execute(client, Discord, interaction){
        
        interaction.reply({content: '***Would you like to clear this channel?***',ephemeral:true});
        const comps = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId(`clear-${interaction.user.id}-success`)
                    .setLabel("Yes, clear the channel")
                    .setStyle('Danger')
            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId(`clear-${interaction.user.id}-fail`)
                    .setLabel("NO! What was I thinking?!")
                    .setStyle('Success')
            )
        setTimeout(()=>{interaction.editReply({content:'***Would you like to clear this channel?***',components:[comps],ephemeral:true})},3000);
        
        
    },
    finish(state,interaction){
        if(state=='fail'){
            interaction.update({content:'Clearing cancelled.',components:[]});
        } else{
            interaction.update({content:'Clearing the channel...',components:[]}).then(()=>{
                interaction.channel.clone();
                interaction.channel.delete();
            })
        }
    }

}