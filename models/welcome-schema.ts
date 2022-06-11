import mongoose, { Schema } from "mongoose"

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