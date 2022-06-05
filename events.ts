import DiscordJS from "discord.js"

export
	const onMessageCreate = (message: DiscordJS.Message) => {
		if (message.content == "ping") {
			message.reply("PONG!")
		}
	}

export
	const onReady = (client: DiscordJS.Client) => {
		console.log(`Connected as ${client.user?.tag}`)
	}
