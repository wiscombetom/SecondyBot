import axios from "axios"
import { ICommand } from "wokcommands"

const postRequest = {
	category: "API Examples",
	description: "Example of a POST request.",
	permissions: ["ADMINISTRATOR"],
	slash: "both",
	testOnly: true,

	callback: async ({ interaction }) => {
		const uri = "https://jsonplaceholder.typicode.com/posts"

		const {data} = await axios.post(uri, {
			title: "foo",
			body: "bar",
			userId: 1,
		},
		{
			headers:{
				"Content-Type": "application/json"
			},
		})
		console.log(data)
		if (interaction) {
			interaction.reply({
				content: "Data sent.",
				ephemeral: true				
			})
		}
	}
} as ICommand

export default postRequest