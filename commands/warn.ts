import { MessageEmbed, User } from "discord.js"
import { ICommand } from "wokcommands"
import warnSchema from "../models/warn-schema"

const warn = {
	category: "Moderation",
	description: "Warns a member.",
	permissions: ["ADMINISTRATOR"],
	requireRoles: true,
	slash: true,
	testOnly: true,
	guildOnly: true,
	options: [
		{
			type: "SUB_COMMAND",
			name: "add",
			description: "Adds a warning to the user.",
			options: [
				{
					name: "user",
					description: "The user to add the warning to.",
					type: "USER",
					required: true,
				},
				{
					name: "reason",
					description: "The reason for the warning.",
					type: "STRING",
					required: true,
				},
			],
		},
		{
			type: "SUB_COMMAND",
			name: "list",
			description: "Lists the warnings given to the user.",
			options: [
				{
					name: "user",
					description: "The user whose warnings to show.",
					type: "USER",
					required: true,
				}
			],
		},
		{
			type: "SUB_COMMAND",
			name: "remove",
			description: "Removes a warning from the user.",
			options: [
				{
					name: "user",
					description: "The user to remove the warning from.",
					type: "USER",
					required: true,
				},
				{
					name: "id",
					description: "The id of the warning.",
					type: "STRING",
					required: true,
				},
			],
		},
	],

	callback: async ({ guild, member: staff, interaction }) => {
		if (!guild) {
			return "This command must be ran in a server."
		}
		const action = interaction.options.getSubcommand()
		const user = interaction.options.getUser("user")
		if (!user) {
			return "You must provide a user."
		}
		if (action === "list") {
			const results = await warnSchema.find({
				guildId: guild.id,
				userId: user.id
			})
			if (!results.length) {
				return {
					custom: true,
					content: `No warnings for <@${user.id}>.`,
					allowedMentions: { users: [] },
				}
			}
			let warnings = `Warnings for <@${user.id}>:\n\n`
			for (const warn of results) {
				warnings += `**ID:** ${warn._id}\n`
				warnings += `**Date:** ${warn.createdAt.toLocaleString()}\n`
				warnings += `**Staff:** <@${warn.staffId}>\n`
				warnings += `**Reason:** ${warn.reason}\n\n`
			}
			const embed = new MessageEmbed()
			embed.setDescription(warnings)
			return embed
		} else if (action === "add") {
			const reason = interaction.options.getString("reason")
			const warning = await warnSchema.create({
				guildId: guild.id,
				userId: user.id,
				staffId: staff.id,
				reason,
			})
			return {
				custom: true,
				content: `Added warning ${warning.id} to <@${user.id}>.`,
				allowedMentions: { users: [] },
			}
		} else if (action === "remove") {
			const warnId = interaction.options.getString("id")
			const warning = await warnSchema.findByIdAndDelete(warnId)
			return {
				custom: true,
				content: `Removed warning ${warning.id} from <@${user.id}>.`,
				allowedMentions: { users: [] },
			}
		}
	},
} as ICommand

export default warn