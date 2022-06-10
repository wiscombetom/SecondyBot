import { Constants } from "discord.js"
import { ICommand } from "wokcommands"

const clearChat = {
	category: "Moderation",
	description: "Deletes a given number of messages.",
	slash: "both",
	testOnly: true,
	permissions: ["ADMINISTRATOR"],
	options: [
		{
			name: "amount",
			description: "The number of messages to delete.",
			required: true,
			type: Constants.ApplicationCommandOptionTypes.NUMBER,
		}
	],

	callback: async ({ channel, message, interaction, args }) => {
		const amount = interaction.options.getNumber("amount")
		// let amount = parseInt(args[1])
		if (!amount || amount > 100) {
			return "Invalid amount of messages (must be between 1 and 100)."
		}

		if (message) {
			await message.delete()
		}

		// only deletes messages from last 2 weeks
		// const { size } = await channel.bulkDelete(amount, true)

		// more control, can filter users and delete older messages
		const messages = await channel.messages.fetch({limit: amount})
		const {size} = messages
		messages.forEach(msg => msg.delete())
		
		const reply = `${size} message(s) deleted.`

		if (!interaction) {
			channel.send(reply)
		} else {
			return reply
		}
	},
} as ICommand

export default clearChat