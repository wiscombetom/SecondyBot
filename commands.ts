import DiscordJS, { Constants } from "discord.js"

export
const createCommands = (commands?: DiscordJS.ApplicationCommandManager | DiscordJS.GuildApplicationCommandManager) => {
		if (!commands) {
			return
		}

		// commands.create({
		// 	name: "delay",
		// 	description: "Tests a 5 second delay, defers the reply."
		// })

		// commands.create({
		// 	name: "ping",
		// 	description: "Tests the server, replies with pong if the server is online.",
		// })

		// commands.create({
		// 	name: "add",
		// 	description: "Adds 2 numbers (provided as arguments).",
		// 	options: [
		// 		{
		// 			name: "num1",
		// 			description: "The first number.",
		// 			required: true,
		// 			type: Constants.ApplicationCommandOptionTypes.NUMBER,
		// 		}, {
		// 			name: "num2",
		// 			description: "The second number.",
		// 			required: true,
		// 			type: Constants.ApplicationCommandOptionTypes.NUMBER,
		// 		}
		// 	]
		// })
	}

export
	const processCommand = async (interaction: DiscordJS.CommandInteraction) => {
		const { commandName, options } = interaction

		if (commandName === "delay") {
			await interaction.deferReply({
				ephemeral: true,
			})
			await new Promise(resolve => setTimeout(resolve, 5000))
			await interaction.editReply({
				content: "Replied after 5 seconds!",
			})
		} else if (commandName === "ping") {
			await interaction.reply({
				content: "PONG!",
				ephemeral: true
			})
		} else if (commandName === "add") {
			const num1 = options.getNumber("num1")
			const num2 = options.getNumber("num2")
			if (num1 === null || num2 === null) {
				return interaction.reply({
					content: "You must provide 2 numbers.",
					ephemeral: true
				})
			}
			await interaction.reply({
				content: `${num1 + num2}`,
				ephemeral: true
			})
		}
	}