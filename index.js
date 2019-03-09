const Discord = require('discord.js');
const config = require('./config.json')

const bulbs = [
    {
        title: "green",
        names:["green", "normal"],
        color:"#43a041"
    },
    {
        title: "amber",
        names:["orange", "amber"],
        color:"f4aa42"
    },
    {
        title: "red",
        names:["red"],
        color:"#FF0000"
    }
]

const actions = [
    {
        triggers: ["hello", "hi", "where are you"],
        response: (() => "Latbot is here for you")
    },
    {
        triggers: ["time"],
        response: (() => "the time is " + new Date().toLocaleTimeString())
    },
    {
        triggers: ["who am i"],
        response: ((message) => "You are " + message.member.displayName)
    },
    {
        triggers: ["server"],
        response: ((message) => message.guild.name)
    },
    {
        triggers: ["all clear"],
        response: ((message) => {
            var bulbRole = message.guild.roles.find("name", "the bulb");
            bulbRole.setColor(bulbs[0].color).then();
            return "Bulb status " + bulbs[0].title;
        })
    },
    {
        triggers: ["bulb", "alert"],
        response: ((message) => {
            var bulbRole = message.guild.roles.find("name", "the bulb");
            var newBulb = bulbs[0];

            var handled = false;
            // if the message contains a bulb colour, set that colour
            bulbs.forEach(bulb => {
                bulb.names.forEach(colorName => {
                    if(message.content.toLowerCase().includes(colorName)){
                        newBulb = bulb;
                    };
                });
            });

            // if(!handled) {

            //     if(message.content.toLowerCase().includes("change the bulb")) {

            //     }

            //     var currentBulbColour = bulbRole.hexColor;
            //     var currentBulb = bulbs.find((bulb) => bulb.color.equals(currentBulbColour));
            //     if(!currentBulb) {currentBulb = bulbs[0]};
            // }


            bulbRole.setColor(newBulb.color).then();
            return "Bulb status " + newBulb.title;
        })
    }
];

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    console.log(message.content);
    if(!message.content.toLowerCase().includes("latbot")) {
        return;
    }
    if(message.member.displayName.toString().includes("LatBot")) {
        return;
    }

    let response = "Stop talking about me"; //default response
    actions.forEach(action => {
        action.triggers.forEach(trigger => {
            if(message.content.toLowerCase().includes(trigger.toLowerCase())) {
                console.log('Action triggered: ' + action);
                response = (action.response(message));
            }
        });
    });
    message.channel.send(response);
});

client.login(config.token);
