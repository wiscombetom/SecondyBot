import { Client, GuildMember, MessageActionRow, MessageSelectMenu, MessageSelectOptionData } from "discord.js"
import { ICommand } from "wokcommands"

const addRole = {
	category: "Configuration",
	description: "Adds a role to the auto role message.",
	slash: "both",
	testOnly: true,
	guildOnly: true,
	permissions: ["ADMINISTRATOR"],
	minArgs: 3,
	maxArgs: 3,
	expectedArgs: "<channel> <messageId> <role>",
	expectedArgsTypes: ["CHANNEL", "STRING", "ROLE"],

	init: (client: Client) => {
		client.on("interactionCreate", (interaction) => {
			if (!interaction.isSelectMenu()) {
				return
			}
			const {customId, values, member} = interaction
			if (customId === "auto_roles" && member instanceof GuildMember) {
				const component = interaction.component as MessageSelectMenu
				const options = component.options
				const removed = options.filter((option) => {
					return !values.includes(option.value)
				})

				for (const id of removed) {
					member.roles.remove(id.value)
				}

				for (const id of values) {
					member.roles.add(id)
				}

				interaction.reply({
					content: "Roles updated.",
					ephemeral: true
				})
			}
		})
	},

	callback: async ({client, message, interaction, args}) => {
		const channel = message
		? message.mentions.channels.first()
		: interaction.options.getChannel("channel")
		
		if (!channel || channel.type !== "GUILD_TEXT") {
			return "You must tag a text channel."
		}

		const role = message
		? message.mentions.roles.first()
		: interaction.options.getRole("role")

		if (!role) {
			return "You must tag a valid role."
		}

		const messageId = args[1]
		const roleMessage = await channel.messages.fetch(messageId, {
			cache: true,
			force: true,
		})

		if (!roleMessage) {
			return "You must provide a valid message id."
		}

		if (roleMessage.author.id !== client.user?.id) {
			return `Please provide a message id that was sent from <@${client.user?.id}>`
		}

		let row = roleMessage.components[0] as MessageActionRow
		if (!row) {
			row = new MessageActionRow()
		}

		const options: MessageSelectOptionData[] = [{
			label: role.name,
			value: role.id,
		}]

		let menu = row.components[0] as MessageSelectMenu

		if (!menu) {
			menu = new MessageSelectMenu()
			.setCustomId("auto_roles")
			.setMinValues(0)
			.setPlaceholder("Select your roles...")
			row.addComponents([menu])
		} else {
			for (const o of menu.options) {
				if (o.value === options[0].value) {
					return {
						custom: true,
						content:`<@${o.value}> is already part of the menu.`,
						allowedMentions: {
							roles: []
						},
						ephemeral: true,
					}
				}
			}
		}
		menu.addOptions(options)
		menu.setMaxValues(menu.options.length)

		roleMessage.edit({
			components: [row],
		})
		return {
			custom: true,
			content: `<@${role.id}> was added to the menu.`,
			allowedMentions: {
				roles: []
			},
			ephemeral: true,
		}
	},
} as ICommand

export default addRole