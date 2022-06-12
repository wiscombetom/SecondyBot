import { TextChannel } from "discord.js"
import { ICommand } from "wokcommands"
import roleMessageSchema from "../models/role-message-schema"

const buttonMessage = {
	category: "Utility",
	description: "Sends a message.",
	slash: "both",
	testOnly: true,
	guildOnly: true,
	permissions: ["ADMINISTRATOR"],
	minArgs: 2,
	expectedArgs: "<channel> <message>",
	expectedArgsTypes: ["CHANNEL", "STRING"],

	callback: async ({ guild, message, interaction, args }) => {
		if (!guild) {
			return "This command must be ran in a server."
		}

		args.shift()
		const text = args.join(" ")

		let channel: TextChannel
		if (message) {
			channel = message.mentions.channels.first() as TextChannel
		} else if (interaction) {
			channel = interaction.options.getChannel("channel") as TextChannel
		} else {
			return {
				custom: true,
				content: "You must tag a text channel.",
				ephemeral: true,
			}
		}
		const sentMessage = await channel.send(text)

		await new roleMessageSchema({
			_id: guild.id,
			channelId: channel.id,
			messageId: sentMessage.id
		}).save()
		
		if (interaction) {
			return {
				custom: true,
				content: "Message sent.",
				ephemeral: true,
			}
		}
	},
} as ICommand

export default buttonMessage