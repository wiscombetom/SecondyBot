import { ICommand } from "wokcommands"

const ping = {

	category: "Testing",
	description: "Test the server, return pong.",
	slash: "both",
	testOnly: true,

	callback: ({}) => {
		return "Pong!"
	},
} as ICommand

export default ping