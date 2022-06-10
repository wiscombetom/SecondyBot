import { Client } from "discord.js";

const statusChanger = (client: Client) => {
	const statusOptions = [
		"hello",
		"and",
		"thank",
		"you",
		"for",
		"using",
		"me",
	]
	let counter = 0
	const user = client.user
	if (!user) {
		return "Invalid client user."
	}

	const updateStatus = () => {
		user.setPresence({
			activities: [{
				name: statusOptions[counter]
			}],
			status: "online",
		})
		counter++
		if (counter == statusOptions.length) {
			counter = 0
		}
		setTimeout(updateStatus, 1000 * 5)
	}
	updateStatus()

	// client.on("presenceUpdate", () => {

	// })
}

export default statusChanger
export const config = {
	dbName: "STATUS_CHANGER",
	displayName: "Status Changer"
}