const config = require('../../data/config.json');
const clear = require('../slash_commands/discord/clear');
module.exports ={
    name:'clear',
    private:'false',
    async execute(cmd,id, interaction, client, Discord){
        const userId = id.split('-')[0];
        const state = id.split('-')[1];
        if(userId == interaction.member.id){
            clear.finish(state,interaction);
        } else{
            interaction.reply({content:`Don't touch that!`,ephemeral: 1});
        }
    }
}