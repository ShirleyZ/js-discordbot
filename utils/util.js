const config = require('../config/config.json');

// Function to split params
function splitParams(input) {
	let result = {
		hasPrefix: false,
		args: [],
		cmd: ''
	}
	let args = input.split(' ')
	console.log("input: "+input)
	console.log("args: ",args)
	console.log("prefix: ",config.prefix)
	if (input.startsWith(config.prefix)) {
		result.hasPrefix = true
		let prefixLen = config.prefix.length
		args[0] = args[0].substr(prefixLen)
		result.cmd = args[0]
		result.args = args.slice(1)
	}
	console.log("-- params: ")
	console.log(result)
	return result
};

module.exports = {
	splitParams
}