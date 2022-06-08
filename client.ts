import DiscordJS, { Intents } from "discord.js"
// import "dotenv/config"
import { onMessageCreate, onInteractionCreate } from "./events"
import { createCommands } from "./commands"

// var env = require("./env.json")
import env from "./env.json"

export class BotClient extends DiscordJS.Client {
	constructor() {
		super({
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_PRESENCES,
			]
		})
	}

	start = () => {
		this.createEvents()
		this.login(env.TOKEN)
	}
	
	createEvents = () => {
		this.on("messageCreate", onMessageCreate)
		this.on("interactionCreate", onInteractionCreate)
	}
	
	createCommands = () => {
		let guildId = env.GUILD_ID
		const guild = this.guilds.cache.get(guildId)
		let commands
		if (guild) {
			commands = guild.commands
		} else {
			commands = this.application?.commands
		}
		
		createCommands(commands)
	}
}