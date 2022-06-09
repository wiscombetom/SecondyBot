import mongoose, { Schema } from "mongoose"

interface WelcomeMessage {
	guildId: string;
	channelId: string;
	text: string;
}

const makeWelcomeMessage = (guildId: string, channelId: string, text: string) => {
	return {
		guildId,
		channelId,
		text
	} as WelcomeMessage
}

const name = "welcome"

const reqString = {
	type: String,
	required: true,
}

const welcomeSchema = new Schema({
	_id: reqString,
	channelId: reqString,
	text: reqString,
})

export default mongoose.model(name, welcomeSchema, name)
export {
	makeWelcomeMessage
}