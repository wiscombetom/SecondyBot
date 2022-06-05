import DiscordJS, { Intents } from "discord.js";
import { onMessageCreate, onReady } from "./events"
import dotenv from "dotenv";

dotenv.config();

const client: DiscordJS.Client = new DiscordJS.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
	],
});

client.on("ready", onReady);
client.on("messageCreate", onMessageCreate);
client.login(process.env.TOKEN);