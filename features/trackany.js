const config = require('../config/config.json');

// Func to handle track entry
/* Params:
 * - input (string) - The sentence-like string to parse for trackable stats
*/
function trackEntry(input) {
	let result = {}
	// Grab parameters
	const data = parseParams(input)

	// Grab user info
	result = sendEntry(data)
	
	return result
};

function parseParams(input) {
	let data = {
		habits: [],
		tags: [],
		stats: {}
	}

	// Find any habits
	const habitRegexp = /#[\w]+/g
	data.habits = input.match(habitRegexp)
	
	// Find any tags
	const tagRegexp = /\[[\w ']+\]+/g
	data.tags = input.match(tagRegexp)

	// Find any stats
	const statRegexp = /[\w]+\.[\w]+/g
	const statResults = input.match(statRegexp)
	for (let i = 0; i < statResults.length; i++) {
		let currStat = statResults[i].split('.')
		data.stats[currStat[1]] = currStat[0] // TODO : stat will be overridden if multiple
	}

	return data
}

function sendEntry(data) {
	return true
}

module.exports = {
	trackEntry
}