module.exports = {
	name: '',
	description: '',
	options: [
		{
			name: '',
			description: '',
			required: false,
			type: 0
		}
	],

	execute(client, Discord, interaction) {

		const embed = new Discord.EmbedBuidler()
			.setTitle()
			.setURL()
			.setColor()
			.setAuthor({ name: '', iconURL: '', url: '' })
			.setDescription()
			.setThumbnail()
			.addFields(
				{ name: '', value: '' }
			)
			.setImage()
			.setTimestamp()
			.setFooter({ text: new Date().toUTCString(), iconURL: client.user.avatarURL() });

		const comps = new Discord.ActionRowBuilder()
			.addComponents(
				new Discord.ButtonBuidler()
					.setCustomId(`test-${message.author.id}-${message.channel.id}`)
					.setLabel("Test Butt On")
					.setStyle('DANGER')
			);
		message.reply({ content: 'test', embeds: [embed], components: [comps] })


	}

}