import { MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"

const embed = {
	category: "Testing",
	description: "Sends an embed.",
	permissions: ["ADMINISTRATOR"],
	slash: "both",
	testOnly: true,

	callback: async ({ message, text }) => {
		if (!text) {
			return 'You need to provide at least an object with a description property: ```/embed {"description":"Description"}```'
		}
		const json = JSON.parse(text)
		if (!json.description) {
			return 'You need to provide at least a description property in the provided object: ```/embed {"description":"Description"}```'
		}
		const embed = new MessageEmbed(json)
		return embed

		// const embed = new MessageEmbed()
		// embed.setColor("AQUA")
		// embed.setAuthor({ name: "Author" })
		// embed.setTitle("Title")
		// embed.setDescription("Description")
		// embed.setFooter({ text: "Footer" })
		// embed.setImage("https://www.thisdogslife.co/wp-content/uploads/2019/02/dog-grasshopper.png")
		// embed.setFields([{
		// 	name: "Custom Field Name",
		// 	value: "Custom Field Value"
		// },
		// {
		// 	name: "Inline Custom Field Name 1",
		// 	value: "Inline Custom Field Value 1",
		// 	inline: true
		// },
		// {
		// 	name: "Inline Custom Field Name 2",
		// 	value: "Inline Custom Field Value 2",
		// 	inline: true
		// }])
		// const newMessage = await message.reply({
		// 	embeds: [embed]
		// })
		// await new Promise(resolve => setTimeout(resolve, 5000))
		// const newEmbed = newMessage.embeds[0]
		// newEmbed.title = "Edited Title"
		// newMessage.edit({
		// 	embeds: [newEmbed]
		// })
	},
} as ICommand

export default embed