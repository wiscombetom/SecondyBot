import { BotClient } from "./client"
import WOKCommands from "wokcommands"
import path from "path"
import mongoose from "mongoose"

import env from "./env.json"

const client: BotClient = new BotClient()
client.on("ready", async () => {
	await mongoose.connect(env.MONGO_URI, {
		keepAlive: true,
	})
	console.log(`Connected as ${client.user?.tag}`)
	new WOKCommands(client, {
		commandsDir: path.join(__dirname, "commands"),
		typeScript: true,
		ignoreBots: true,
		ephemeral: true,
		testServers: env.GUILD_ID,
		botOwners: env.DEV_ID,
		delErrMsgCooldown: 5,
	})
})
client.login(env.TOKEN)