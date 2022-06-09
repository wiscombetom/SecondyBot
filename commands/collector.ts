import { Message, MessageReaction, User } from "discord.js";
import { ICommand } from "wokcommands";

const collector = {
	category: "Testing",
	description: "Testing",
	testOnly: true,
	slash: false,

	callback: ({ message, channel }) => {
		message.reply("Please confirm this action")
		message.react("👍")
		message.react("👎")

		// const filter = (msg: Message) => {
		// 	return msg.author.id === message.author.id
		// }

		// const collector = channel.createMessageCollector({
		// 	filter,
		// 	max: 1,
		// 	time: 1000 * 5
		// })

		const filter = (reaction: MessageReaction, user: User) => {
			return user.id === message.author.id
		}

		const collector = message.createReactionCollector({
			filter,
			max: 1,
			time: 1000 * 5
		})

		collector.on("collect", (rtn: MessageReaction) => {

		})

		collector.on("end", (collected) => {
			if (collected.size === 0) {
				message.reply("You did not provide your username.")
				return
			}
			let text = "Collected:\n\n"
			collected.forEach((rtn) => {
				text += `${rtn.emoji.name}\n`
			})
			message.reply(text)
		})
	}
} as ICommand

export default collector