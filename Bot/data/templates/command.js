module.exports = {
    name: '',
    aliases: [],
    options: [],
    description: "",
    usage: '',
    help: '',
    man: '',
    private: true,
    execute(message, args, cmd, client, Discord) {

        const comps = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(`test-${message.author.id}-${message.channel.id}`)
                    .setLabel("Test Butt On")
                    .setStyle('primary')
            );
        message.reply({ content: 'test', components: [comps] })


    }
}