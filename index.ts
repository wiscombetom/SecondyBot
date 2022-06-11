import { BotClient } from "./client"
import WOKCommands from "wokcommands"
import path from "path"

import env from "./env.json"

const client: BotClient = new BotClient()
client.on("ready", async () => {
	console.log(`Connected as ${client.user?.tag}`)
	new WOKCommands(client, {
		commandsDir: path.join(__dirname, "commands"),
		featuresDir: path.join(__dirname, "features"),
		typeScript: true,
		ignoreBots: true,
		ephemeral: true,
		testServers: env.GUILD_ID,
		botOwners: env.DEV_ID,
		mongoUri: env.MONGO_URI,
		dbOptions: [],
		delErrMsgCooldown: 5,
	})
})

client.login(env.TOKEN)