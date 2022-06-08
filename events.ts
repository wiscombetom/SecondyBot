import DiscordJS from "discord.js"
import { processCommand } from "./commands"

export
	const onInteractionCreate = async (interaction: DiscordJS.Interaction) => {
		if (interaction.isCommand()) {
			processCommand(interaction)
		}
		return
	}

export
	const onMessageCreate = (message: DiscordJS.Message) => {
		if (message.content == "ping") {
			message.reply("PONG!")
		}
	}
