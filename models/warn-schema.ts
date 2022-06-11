import mongoose, { Schema } from "mongoose"

const name = "warns"

const reqString = {
	type: String,
	required: true,
}

const warnSchema = new Schema({
	userId: reqString,
	guildId: reqString,
	staffId: reqString,
	reason: reqString,
},{
	timestamps: true
})

export default mongoose.models[name] || mongoose.model(name, warnSchema, name)