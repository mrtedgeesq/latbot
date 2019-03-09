# latbot

this is quick and dirty. Do not judge my code!

create a config.json file in the root dir with this structure:

{
	"token": "your-token-goes-here"
}

get a token following this guide:
https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot

To run:

1. Make sure config.json is present, with a valid token
2. node index.js
3. to stop - ctrl+c

To build & run docker container:
1. docker build -t <yourname>/latbot
2. docker run -d <yourname>/latbot --name latbot
3. to stop - docker stop latbot

don't deploy built docker images to docker hub or similar as they will contain the config file!


