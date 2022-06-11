import { ICommand } from "wokcommands"
import Docs from "discord.js-docs"

const branch = "stable"
const maxCharacters = 1024

const replaceDisco = (str: string) => str
.replace(/docs\/docs\/disco/g, `docs/discord.js/${branch}`)
.replace(/ \(disco\)/g, "")


const docs = {
	category: "Utility",
	description: "Search the discord.js documentation.",
	slash: "both",
	testOnly: true,

	minArgs: 1,
	expectedArgs: "<search-query>",

	callback: async ({ text }) => {
		const doc = await Docs.fetch(branch)
		const results = doc.resolveEmbed(text)

		if (!results) {
			return "Could not find that documentation"
		}

		const resultsString = replaceDisco(JSON.stringify(results))
		const embed = JSON.parse(resultsString)
		embed.author.url = `https://discord.js.org/#/docs/discord.js/${branch}/general/welcome`

		const extra =
		'\n\nView more here: ' +
		/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
			.exec(embed.description)![0]
			.split(')')[0]
		
		for (const field of embed.fields || []) {
			if (field.value.length >= maxCharacters) {
				field.value = field.value.slice(0, maxCharacters)
				const split = field.value.split(" ")
				let joined = split.join(" ")

				while (joined.length >= maxCharacters - extra.length) {
					split.pop()
					joined = split.join(" ")
				}

				field.value = joined + extra
			}
		}

		if (embed.fields && embed.fields[embed.fields.length - 1].value.startsWith("[View source")) {
			embed.fields.pop()
		}

		return embed
	},
} as ICommand

export default docs