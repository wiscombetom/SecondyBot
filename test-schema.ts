import mongoose, { Schema } from "mongoose"

const schema = new Schema({
	message: {
		type: String,
		required: true,
	},
})

export default mongoose.model("testing", schema, "testing")