import mongoose, { Schema } from "mongoose"

const name = "punishments"

const reqString = {
	type: String,
	required: true,
}

const punishmentSchema = new Schema({
	userId: reqString,
	guildId: reqString,
	staffId: reqString,
	reason: reqString,
	expires: Date,
	type: {
		type: String,
		required: true,
		enum: ["ban", "mute"]
	}
},{
	timestamps: true
})

export default mongoose.models[name] || mongoose.model(name, punishmentSchema, name)