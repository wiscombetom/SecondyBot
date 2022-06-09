import { ButtonInteraction, Interaction, MessageActionRow, MessageButton } from "discord.js"
import { ICommand } from "wokcommands"

const test = {
	category: "Testing",
	description: "Test buttons.",
	slash: true,
	testOnly: true,

	callback: async ({ interaction: msgInt, channel }) => {
		const button = new MessageButton()
		button.setCustomId("confirm")
		button.setEmoji("👍")
		button.setLabel("Confirm")
		button.setStyle("SUCCESS")
		const button2 = new MessageButton()
		button2.setCustomId("cancel")
		button2.setEmoji("👎")
		button2.setLabel("Cancel")
		button2.setStyle("DANGER")
		const button3 = new MessageButton()
		// button3.setCustomId("url")
		button3.setEmoji("🕸")
		button3.setLabel("Go to URL")
		button3.setStyle("LINK")
		button3.setURL("https://www.google.com")
		const buttonRow = new MessageActionRow()
		buttonRow.addComponents(button, button2)
		const buttonRow2 = new MessageActionRow()
		buttonRow2.addComponents(button3)
		await msgInt.reply({
			content: "Are you sure?",
			components: [buttonRow, buttonRow2],
			ephemeral: true,
		})

		const filter = (btnInt: Interaction) => {
			return btnInt.user.id === msgInt.user.id
		}

		const collector = channel.createMessageComponentCollector({
			filter,
			max: 1,
			time: 1000 * 15
		})

		// collector.on("collect", (btnInt: ButtonInteraction) => {
		// 	btnInt.reply({
		// 		content: "You clicked a button.",
		// 		ephemeral: true,
		// 	})
		// })

		collector.on("end", async (collection) => {
			// collection.forEach((click) => {
			// 	console.log(click.user.id, click.customId)
			// 	if (click.customId === "confirm") {
			// 		click.reply({content:"You clicked confirm!"})
			// 	} else if (click.customId === "cancel") {
			// 		click.reply({content:"You clicked cancel!"})
			// 	}
			// })
			const click = collection.first()
			if (click?.customId === "confirm") {
				click.reply({content:"You clicked confirm!", ephemeral: true})
			} else if (click?.customId === "cancel") {
				click.reply({content:"You clicked cancel!", ephemeral: true})
			}
			await msgInt.editReply({
				content: "An action has already been taken.",
				components: [],
			})
		})
	},
} as ICommand

export default test