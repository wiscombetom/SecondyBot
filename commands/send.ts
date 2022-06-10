import { ICommand } from "wokcommands"

const send = {
	category: "Configuration",
	description: "Sends a message.",
	slash: "both",
	testOnly: true,
	guildOnly: true,
	permissions: ["ADMINISTRATOR"],
	minArgs: 2,
	expectedArgs: "<channel> <text>",
	expectedArgsTypes: ["CHANNEL", "STRING"],

	callback: ({message, interaction, args}) => {
		const channel = message
		? message.mentions.channels.first()
		: interaction.options.getChannel("channel")

		if (!channel || channel.type !== "GUILD_TEXT") {
			return "You must tag a text channel."
		}

		args.shift()
		const text = args.join(" ")
		
		channel.send(text)
		return {
			custom: true,
			content: "Message sent.",
			ephemeral: true,
		}
	},
} as ICommand

export default send