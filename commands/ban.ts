import { User } from "discord.js"
import { ICommand } from "wokcommands"
import punishmentSchema from "../models/punishment-schema"

const ban = {
	category: "Moderation",
	description: "Bans a member.",
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
			type: "ban",
		})

		if (result) {
			return `<@${userId}> is already banned in this server.`
		}

		try {
			await guild.members.ban(userId, {
				reason,
				// days of user's content to remove
				days: 7,
			})
			await new punishmentSchema({
				userId,
				guildId: guild.id,
				staffId: staff.id,
				reason,
				expires,
				type: "ban"
			}).save()
		}
		catch (err) {
			return "Cannot ban that user."
		}
		return `<@${userId}> has been ban for "${duration}"`
	},
} as ICommand

export default ban


/*
import { Constants, GuildMember } from "discord.js"
import { ICommand } from "wokcommands"

const ban = {
	category: "Moderation",
	description: "Bans a user.",
	requireRoles: true,
	slash: "both",
	testOnly: true,
	guildOnly: true,

	minArgs: 2,
	expectedArgs:"<user> <reason>",
	expectedArgsTypes: ["USER", "STRING"],

	options: [
		{
			name: "user",
			description: "The user to ban.",
			required: true,
			type: Constants.ApplicationCommandOptionTypes.USER,
		},
		{
			name: "reason",
			description: "The reason for the ban.",
			required: false,
			type: Constants.ApplicationCommandOptionTypes.STRING,
		},
	],

	callback: async ({ message, interaction, args }) => {
		let member
		let reason
		if (!message) {
			member = interaction.options.getMember("user") as GuildMember
			reason = interaction.options.getString("reason")
		} else {
			member = message.mentions.members?.first()
			args.shift()
			reason = args.join(" ")
		}

		if (!member) {
			return {
				custom: true,
				content: "Invalid user.",
				ephemeral: true,
			}
		}

		if (!member.bannable) {
			return {
				custom: true,
				content: "Cannot ban that user.",
				ephemeral: true,
			}
		}

		if (!reason) {
			reason = "no reason"
		}

		member.ban({
			reason,
			// number of days of messages to delete
			days: 7,
		})

		return {
			custom: true,
			content: `<@${member.id}> banned for "${reason}"`,
			ephemeral: true,
		}
	},
} as ICommand

export default ban
*/