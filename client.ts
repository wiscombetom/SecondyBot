import DiscordJS, { Intents } from "discord.js"
import { onMessageCreate, onInteractionCreate } from "./events"
import dotenv from "dotenv"
import { createCommands } from "./commands"
dotenv.config()

export class BotClient extends DiscordJS.Client {
	constructor() {
		super({
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MESSAGES
			]
		})
	}

	start = () => {
		this.createEvents()
		this.login(process.env.TOKEN)
	}
	
	createEvents = () => {
		this.on("ready", () => {
			console.log(`Connected as ${this.user?.tag}`)
			this.createCommands()
		})
		this.on("messageCreate", onMessageCreate)
		this.on("interactionCreate", onInteractionCreate)
	}
	
	createCommands = () => {
		let guildId = process.env.GUILD_ID || ""
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