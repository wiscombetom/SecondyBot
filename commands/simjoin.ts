import { Constants, GuildMember } from "discord.js"
import { ICommand } from "wokcommands"

const simJoin = {
	category: "Testing",
	description: "Simulates a join. Tests the welcome message.",
	permissions: ["ADMINISTRATOR"],
	slash: "both",
	testOnly: true,

	minArgs: 1,
	expectedArgs:"<user>",

	options: [
		{
			name: "user",
			description: "The member to welcome.",
			required: true,
			type: Constants.ApplicationCommandOptionTypes.USER,
		},
	],

	callback: async ({ message, interaction, client }) => {
		let member
		if (!message) {
			member = interaction.options.getMember("user") as GuildMember
		} else {
			member = message.mentions.members?.first()
		}
		if (!member) {
			return "Invalid member."
		}

		client.emit("guildMemberAdd", member)
		return "Join simulated! Testing welcome message."
	},
} as ICommand

export default simJoin