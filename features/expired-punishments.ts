import { Client, GuildMember, TextChannel } from "discord.js";
import punishmentSchema from "../models/punishment-schema";

const expiredPunishments = (client: Client) => {
	client.on("guildMemberAdd", async (member: GuildMember) => {
		const { guild, id } = member
		const result = await punishmentSchema.findOne({
			guildId: guild.id,
			userId: id,
			type: "mute",
		})

		if (result) {
			const mutedRole = member.guild.roles.cache.find(role => role.name === "Muted")
			if (mutedRole) {
				member.roles.add(mutedRole)
			}
		}
	})

	const check = async () => {
		const now = new Date()
		const query = {
			expires: {
				$lt: now
			}
		}
		const results = await punishmentSchema.find(query)
		for (const result of results) {
			const { guildId, userId, type } = result
			const guild = await client.guilds.fetch(guildId)
			if (!guild) {
				console.log(`Guild "${guildId}" no longer uses this bot.`)
				continue
			}
			const member = guild.members.cache.get(userId)
			if (!member) {
				console.log(`Member "${userId}" no longer in guild "${guildId}".`)
				continue
			}
			if (type === "ban") {
				guild.members.unban(userId, "Ban expired.")
			} else if (type === "mute") {
				const mutedRole = guild.roles.cache.find(role => role.name === "Muted")
				if (!mutedRole) {
					console.log(`Guild "${guildId}" has no "Muted" role.`)
					continue
				}
				member.roles.remove(mutedRole)
			}
		}
		await punishmentSchema.deleteMany(query)
		setTimeout(check, 1000 * 60 * 30)
	}
	check()
}

export default expiredPunishments
export const config = {
	displayName: "Expired Punishments",
	dbName: "EXPIRED_PUNISHMENTS",
}