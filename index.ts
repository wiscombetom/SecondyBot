import { BotClient } from "./client"
import WOKCommands from "wokcommands"
import path from "path"
import testSchema from "./test-schema"
// import mongoose from "mongoose"

import env from "./env.json"

const client: BotClient = new BotClient()
client.on("ready", async () => {
	// await mongoose.connect(env.MONGO_URI, {
	// 	keepAlive: true,
	// })
	console.log(`Connected as ${client.user?.tag}`)
	new WOKCommands(client, {
		commandsDir: path.join(__dirname, "commands"),
		typeScript: true,
		ignoreBots: true,
		ephemeral: true,
		testServers: env.GUILD_ID,
		botOwners: env.DEV_ID,
		mongoUri: env.MONGO_URI,
		dbOptions: [],
		delErrMsgCooldown: 5,
	})
	// setTimeout(async () => {
	// 	await new testSchema({
	// 		message: "Hello World"
	// 	}).save()
	// }, 1000)
})
client.login(env.TOKEN)