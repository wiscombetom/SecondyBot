import { ButtonInteraction, EmojiIdentifierResolvable, Interaction, Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"

const embeds: MessageEmbed[] = []
const pages = {} as {
	// [userId: pageNumber]
	[key: string]: number
}

for (let i = 0; i < 4; i++) {
	const embed = new MessageEmbed()
	embed.setDescription(`Page ${i + 1}`)
	embeds.push(embed)
}

const getRow = (id: string) => {
	const isFirstPage = pages[id] === 0
	const isLastPage = pages[id] === embeds.length - 1
	const prevPageButton = getButton("prev_embed", "⏮", isFirstPage)
	const nextPageButton = getButton("next_embed", "⏭", isLastPage)

	// const prevPageButton = new MessageButton()
	// prevPageButton.setCustomId("prev_embed")
	// prevPageButton.setStyle("SECONDARY")
	// prevPageButton.setEmoji("⏮")
	// prevPageButton.setDisabled(pages[id] === 0)

	// const nextPageButton = new MessageButton()
	// nextPageButton.setCustomId("next_embed")
	// nextPageButton.setStyle("SECONDARY")
	// nextPageButton.setEmoji("⏭")
	// nextPageButton.setDisabled(pages[id] === embeds.length - 1)

	const row = new MessageActionRow()
	row.addComponents(prevPageButton, nextPageButton)
	return row
}

const getButton = (customId: string, emoji: EmojiIdentifierResolvable, disabled: boolean) => {
	const button = new MessageButton()
	button.setCustomId(customId)
	button.setStyle("SECONDARY")
	button.setEmoji(emoji)
	button.setDisabled(disabled)
	return button
}

const page = {
	category: "Testing",
	description: "Sends an embed pagination.",
	permissions: ["ADMINISTRATOR"],
	slash: "both",
	testOnly: true,

	callback: async ({ user, message, interaction, channel }) => {
		const id = user.id
		pages[id] = pages[id] || 0

		const embed = embeds[pages[id]]
		let reply: Message | undefined
		let collector

		const filter = (i: Interaction) => i.user.id === user.id
		const time = 1000 * 60 * 5

		if (message) {
			reply = await message.reply({
				components: [getRow(id)],
				embeds: [embed],
			})
			collector = reply.createMessageComponentCollector({ filter, time })
		} else {
			interaction.reply({
				components: [getRow(id)],
				embeds: [embed],
				ephemeral: true
			})

			collector = channel.createMessageComponentCollector({ filter, time })

		}
		collector.on("collect", (btnInt: ButtonInteraction) => {
			if (!btnInt) {
				return
			}
			btnInt.deferUpdate()
			if (btnInt.customId !== "prev_embed" && btnInt.customId !== "next_embed") {
				return
			}
			if (btnInt.customId === "prev_embed" && pages[id] > 0) {
				pages[id]--
			} else if (btnInt.customId === "next_embed" && pages[id] < embeds.length - 1) {
				pages[id]++
			}

			const newReply = {
				embeds: [embeds[pages[id]]],
				components: [getRow(id)],
			}

			if (reply) {
				reply.edit(newReply)
			} else {
				interaction.editReply(newReply)
			}
		})
	},
} as ICommand

export default page