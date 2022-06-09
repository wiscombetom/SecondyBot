import { Constants } from "discord.js"
import { ICommand } from "wokcommands"
import welcomeSchema from "../models/welcome-schema"
// import { WelcomeSchema } from "../models/welcome-schema"

// import botData from "../bot-data.json"

const setWelcome = {

	category: "Configuration",
	description: "Sets the welcome channel.",
	permissions: ["ADMINISTRATOR"],
	slash: "both",
	testOnly: true,

	minArgs: 2,
	expectedArgs:"<channel> <text>",

	options: [
		{
			name: "channel",
			description: "The target welcome channel.",
			required: true,
			type: Constants.ApplicationCommandOptionTypes.CHANNEL,
		},
		{
			name: "text",
			description: "The welcome text to display to the user.",
			required: true,
			type: Constants.ApplicationCommandOptionTypes.STRING,
		},
	],

	callback: async ({ guild, message, interaction, args }) => {
		if (!guild) {
			return "Command must be ran inside of a server!"
		}
		
		let welcomeChannel
		let text
		if (!message) {
			welcomeChannel = interaction.options.getChannel("channel")
			text = interaction.options.getString("text")
		} else {
			welcomeChannel = message.mentions.channels.first()
			args.shift()
			text = args.join(" ")
		}
		if (!welcomeChannel || welcomeChannel.type !== "GUILD_TEXT") {
			return "Please tag a text channel."
		}
		// const welcomeMessage = new WelcomeSchema(guild.id, welcomeChannel.id, text || "")

		await welcomeSchema.findOneAndUpdate({
			_id: guild.id,
		}, {
			_id: guild.id,
			channelId: welcomeChannel.id,
			text,
		}, {
			upsert: true,
		})
		// botData.welcomeMessages[guild.id] = {}
		return `${welcomeChannel} set as welcome channel. "${text}" set as welcome text.`
	},
} as ICommand

export default setWelcome