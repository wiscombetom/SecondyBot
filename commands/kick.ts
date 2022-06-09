import { Constants, GuildMember } from "discord.js"
import { ICommand } from "wokcommands"

const kick = {
	category: "Moderation",
	description: "Kicks a user.",
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
			description: "The user to kick.",
			required: true,
			type: Constants.ApplicationCommandOptionTypes.USER,
		},
		{
			name: "reason",
			description: "The reason for the kick.",
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

		if (!member.kickable) {
			return {
				custom: true,
				content: "Cannot kick that user.",
				ephemeral: true,
			}
		}

		if (!reason) {
			reason = "no reason"
		}

		member.kick(reason)
		return {
			custom: true,
			content: `<@${member.id}> kicked for "${reason}"`,
			ephemeral: true,
		}
	},
} as ICommand

export default kick