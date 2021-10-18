# Running the bot
## Step 1
- Create a file called config.json with the following info:
```json
{
	"token":"your bot token here",
	"clientId": "your client ID here",
	"guildId": "your guild ID here",
	"apiKey": "your youtube api key here",
	"botChannel": "channel for bot messages",
	"memberRole": "role for verified members",
	"mutedRole": "role for muted members"
}
```
## Step 2
To start the bot, run
```bash
npm start
```