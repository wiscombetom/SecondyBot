import axios from "axios"
import { ICommand } from "wokcommands"

const deleteRequest = {
	category: "API Examples",
	description: "Example of a DELETE request.",
	permissions: ["ADMINISTRATOR"],
	minArgs: 1,
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

		const {data} = await axios.delete(uri)
		console.log(data)
		if (interaction) {
			interaction.reply({
				content: "Data deleted.",
				ephemeral: true				
			})
		}
	}
} as ICommand

export default deleteRequest