import mongoose, { Schema } from "mongoose"

const name = "button-roles"

const reqString = {
	type: String,
	required: true,
}

const roleMessageSchema = new Schema({
	_id: reqString,
	channelId: reqString,
	messageId: reqString,
})

export default mongoose.models[name] || mongoose.model(name, roleMessageSchema, name)