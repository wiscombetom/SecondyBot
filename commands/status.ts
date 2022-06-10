import { Constants } from "discord.js"
import { ActivityTypes } from "discord.js/typings/enums"
import { ICommand } from "wokcommands"

const status = {
	category: "Configuration",
	description: "Set the client status.",
	slash: "both",
	testOnly: true,
	ownerOnly: true,

	minArgs: 1,
	expectedArgs:"<status>",

	options: [
		{
			name: "status",
			description: "The status to display.",
			required: true,
			type: Constants.ApplicationCommandOptionTypes.STRING,
		},
	],

	callback: ({client, text}) => {
		const user = client.user
		if (!user) {
			return "Bot user invalid."
		}
		if (!text) {
			return "Invalid status."
		}
		user.setPresence({
			activities:[{name: text}],
			status: "dnd"
		})
		return "Status updated."
	},
} as ICommand

export default status