import { User } from "discord.js"
import { ICommand } from "wokcommands"
import punishmentSchema from "../models/punishment-schema"

const mute = {
	category: "Moderation",
	description: "Mutes a member.",
	permissions: ["ADMINISTRATOR"],
	requireRoles: true,
	slash: "both",
	testOnly: true,
	expectedArgs: "<user> <duration> <reason>",
	expectedArgsTypes: ["USER", "STRING", "STRING"],
	minArgs: 3,

	callback: async ({client, guild, member: staff, message, interaction, args}) => {
		if (!guild) {
			return "This command must be ran in a server."
		}
		let userId = args.shift()!
		const duration = args.shift()!
		const reason = args.join(" ")
		let user: User | undefined
		if (message) {
			user = message.mentions.users?.first()
		} else {
			user = interaction.options.getUser("user") as User
		}
		if (!user) {
			userId = userId.replace(/[<@!>]/g, "")
			user = await client.users.fetch(userId)
			if (!user) {
				return `Could not find a user with the id "${userId}"`
			}
		}
		userId = user.id

		let time
		let type
		try {
			let parts = duration.match(/\d+|\D+/g)
			time = parseInt(parts![0])
			type = parts![1].toLowerCase()
		}
		catch (err) {
			return "Invalid time format. For example: '10m' (10 minutes), '2h' (2 hours) or '3d' (3 days)."
		}
		if (type === "d") {
			time *= 60 * 24
		} else if (type === "h") {
			time *= 60
		} else if (type !== "m") {
			return "Invalid time format. Use 'd' for days, 'h' for hours, or 'm' for minutes."
		}
		const expires = new Date()
		expires.setMinutes(time + expires.getMinutes())

		const result = await punishmentSchema.findOne({
			guildId: guild.id,
			userId,
			type: "mute",
		})

		if (result) {
			return `<@${userId}> is already muted in this server.`
		}

		try {
			const member = await guild.members.fetch(userId)
			if (member) {
				const muteRole = guild.roles.cache.find(role => role.name === "Muted")
				if (!muteRole) {
					return "Server does not have a 'Muted' role to give to the user."
				}
				member.roles.add(muteRole)
			}
			await new punishmentSchema({
				userId,
				guildId: guild.id,
				staffId: staff.id,
				reason,
				expires,
				type: "mute"
			}).save()
		}
		catch (err) {
			return "Cannot mute that user."
		}
		return `<@${userId}> has been muted for "${duration}"`
	},
} as ICommand

export default mute