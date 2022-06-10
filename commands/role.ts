const actions = ["give", "remove", "has"]

import { ICommand } from "wokcommands"

const role = {
	category: "Moderation",
	description: "Add, remove or check roles.",
	permissions: ["MANAGE_ROLES"],
	slash: "both",
	testOnly: true,

	minArgs: 3,
	expectedArgs: `<"${actions.join('", "')}"> <user @> <role @>`,
	// expectedArgsTypes: ["STRING", "USER", "ROLE"],
	options: [
		{
			name: "action",
			description: `The action to perform. One of: ${actions.join(", ")}`,
			type: "STRING",
			required: true,
			choices: actions.map((action) => ({
				name: action,
				value: action,
			})),
		},
		{
			name: "user",
			description: "The user to perform the action on.",
			type: "USER",
			required: true,
		},
		{
			name: "role",
			description: "The role to perform the action on.",
			type: "ROLE",
			required: true,
		},
	],

	callback: ({ guild, args }) => {
		const action = args.shift()
		if (!action || !actions.includes(action)) {
			return `Unknown action. Use one of the following: ${actions.join(", ")}`
		}
		let userId = args.shift()!.replace(/[<@!&>]/g, "")
		
		let roleId = args.shift()!.replace(/[<@!&>]/g, "")
		
		const member = guild!.members.cache.get(userId)
		if (!member) {
			return `Could not find member with id ${userId}`
		}

		const role = guild!.roles.cache.get(roleId)
		if (!role) {
			return `Could not find role with id ${roleId}`
		}

		if (action === "has") {
			return member.roles.cache.has(roleId)
			? "User has role."
			: "User does not have role."
		}
		if (action == "give") {
			member.roles.add(role)
			return "Role given to user."
		}
		if (action == "remove") {
			member.roles.remove(role)
			return "Role removed from user."
		}
		return "Unknown action."
	},
} as ICommand

export default role