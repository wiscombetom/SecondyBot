import { BotClient } from "./client"
const client: BotClient = new BotClient()
// client.start()
client.createEvents()
client.login(process.env.TOKEN)