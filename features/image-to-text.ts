import { Client } from "discord.js"
import { createWorker } from "tesseract.js"


const imageToText = (client: Client) => {
	client.on("messageCreate", async (message) => {
		const image = message.attachments.first()
		if (!image || !(image.contentType?.startsWith("image/")) || image.contentType.includes("gif")) {
			return	
		}

		try {
			const worker = createWorker()
			await worker.load()
			await worker.loadLanguage("eng")
			await worker.initialize("eng")
			const { data: {text} } = await worker.recognize(image.url)
			await worker.terminate()
			console.log(text)
			message.reply(text)
		} catch (err) {
			console.error(err)
		}

		createWorker({
			dataPath: image.url
		})
	})
}

export default imageToText
export const config = {
	displayName: "Image to Text",
	dbName: "IMAGE_TO_TEXT",
}