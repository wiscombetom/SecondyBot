import { ICommand } from "wokcommands"

const add : ICommand = {
	category: "Testing",
	description: "Adds 2 numbers (provided as arguments).",
	slash: "both",
	testOnly: true,
	expectedArgs:"",
	callback: ({}) => {
		return "PONG!"
	},
}

export default add