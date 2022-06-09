import { Client, GuildMember, TextChannel } from "discord.js";
import welcomeSchema from "../models/welcome-schema";

const welcomeData = {

} as {
	// guildId: [channel, message]
	[key: string]: [TextChannel, string]
}

const welcome = (client: Client) => {
	client.on("guildMemberAdd", async (member: GuildMember) => {
		const { guild, id } = member

		let data = welcomeData[guild.id]
		if (!data) {
			const results = await welcomeSchema.findById(guild.id)
			if (!results) {
				return
			}

			const {channelId, text} = results

			const welcomeChannel = guild.channels.cache.get(channelId) as TextChannel
			if (!welcomeChannel) {
				return
			}
			data = welcomeData[guild.id] = [welcomeChannel, text]
		}

		data[0].send({
			content:data[1].replace(/@/g, `<@${id}>`),
			allowedMentions: {
				users: []
			}
		})
	})
}

export default welcome
export const config = {
	displayName: "Welcome Channel",
	dbName: "WELCOME_CHANNEL",
}