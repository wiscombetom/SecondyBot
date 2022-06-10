import axios from "axios"
import { ICommand } from "wokcommands"

const getRequest = {
	category: "API Examples",
	description: "Example of a GET request.",
	permissions: ["ADMINISTRATOR"],
	maxArgs: 1,
	expectedArgs: "<id>",
	expectedArgsTypes: ["NUMBER"],
	slash: "both",
	testOnly: true,

	callback: async ({ interaction, args }) => {
		let uri = "https://jsonplaceholder.typicode.com/posts"
		if (args.length) {
			uri += `/${args[0]}`
		}

		const {data} = await axios.get(uri)
		console.log(data)
		if (interaction) {
			interaction.reply({
				content: "Data returned.",
				ephemeral: true				
			})
		}
	}
} as ICommand

export default getRequest