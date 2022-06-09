import { Constants } from "discord.js"
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

	callback: async ({ member, client }) => {
		client.emit("guildMemberAdd", member)
		return "Join simulated! Testing welcome message."
	},
} as ICommand

export default simJoin