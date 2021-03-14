// Env setup
const dotenv = require('dotenv');
dotenv.config();
const config = require('./config/config.json');

// Libraries
const Discord = require('discord.js'); // require the discord.js module
const client = new Discord.Client(); // create a new Discord client
const Util = require('./utils/util.js')

// Features
const MiscFt = require('./features/misc.js')

// Globals
const prefix = config.prefix

// Bot start
client.once('ready', () => { // once triggers once once
	console.log('Ready!');
});

client.on('message', msg => { // on can trigger multiple times
	console.log("*** message received (000)")
	// console.log(msg)
	const params = Util.splitParams(msg.content)
	const cmd = params.cmd
	const speaker = msg.author
	const args = params.args

	if (params.hasPrefix) {
		console.log("command found: ",cmd)
	  if (cmd === 'ping') {
	    msg.reply('Pong!');
	  }	else if (cmd === 'ftoc') {
	  	const result = MiscFt.ftoc(params.args)
	  	msg.reply('F: `'+args[0]+'` C: `'+result.value+'`')
	  }	else if (cmd === 'ctof') {
	  	const result = MiscFt.ctof(params.args)
	  	msg.reply('C: `'+args[0]+'` F: `'+result.value+'`')
	  }
	}
});

// login to Discord with your app's token
client.login(process.env.BOT_TOKEN);
