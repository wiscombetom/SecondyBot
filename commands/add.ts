import { Constants } from "discord.js"
import { ICommand } from "wokcommands"

const add : ICommand = {
	category: "Testing",
	description: "Adds 2 numbers (provided as arguments).",
	slash: "both",
	testOnly: true,
	options: [
		{
			name: "num1",
			description: "The first number.",
			required: true,
			type: Constants.ApplicationCommandOptionTypes.NUMBER,
		},
		{
			name: "num2",
			description: "The second number.",
			required: true,
			type: Constants.ApplicationCommandOptionTypes.NUMBER,
		},
	],
	callback: ({args}) => {
		const num1 = parseInt(args[0])
		const num2 = parseInt(args[1])
		return `${num1 + num2}`
	},
}

export default add