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
```
*memberRole and mutedRole are for any default and muted roles you have, member should have permissions to speak and muted should not have permissions to speak.*

## Step 2

To install dependancies, run:
```bash
npm i
```

## Step 3
To start the bot, run:
```bash
npm start
```
