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