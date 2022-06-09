import DiscordJS, { Intents } from "discord.js"
import botData from "./bot-data.json"
import fs from "fs"

export class BotClient extends DiscordJS.Client {
	botData: object;
	constructor() {
		super({
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_PRESENCES,
			]
		})
		this.botData = botData
	}
	getBotData = async () => {
		if (!this.botData) {
			fs.readFile("./bot-data.json", (err, data) => {
				if (err) {
					this.botData = {}
				} else {
					this.botData = data
				}
			})
		}
		return this.botData
	}
	setBotData = async (newData: object) => {
		this.botData = newData
	}
}