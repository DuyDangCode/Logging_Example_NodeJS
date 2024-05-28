const { Client, GatewayIntentBits } = require('discord.js')

DISCORD_TOKEN = process.env.DISCORD_TOKEN

CHANNEL_ID = process.env.DISCORD_CHANNEL
class DiscordLogger {
  static getDiscordLogger() {
    if (!this.discordInstance) this.discordInstance = new DiscordLogger()
    return this.discordInstance
  }
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    })

    this.channelId = CHANNEL_ID
    this.client.on('ready', () => {
      console.log('Discord oke')
    })
    this.client.login(DISCORD_TOKEN)
  }

  log({
    level,
    requestId,
    context,
    message,
    timestamp = new Date(),
    metadata = {},
  }) {
    console.log(this.channelId)
    const channel = this.client.channels.cache.get(this.channelId)
    console.log(channel)
    if (!channel) {
      console.log('Not found channel discord')
      return
    }
    channel
      .send(
        `${level}::${requestId}::${context}::${message}::${timestamp}::${JSON.stringify(metadata)}`,
      )
      .catch((e) => {
        console.log('error::', e)
      })
  }
}

module.exports = DiscordLogger.getDiscordLogger()
