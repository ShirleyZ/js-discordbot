const config = require('../config/config.json');
const VALID_CITIES = {
	"sydney": "Australia/Sydney",
	"rome": "Europe/Rome",
	"phoenix": "America/Phoenix",
	"calgary": "Australia/Sydney",
	"tallahassee": "Australia/Sydney",
}

const { DateTime } = require('luxon');

// Func convert farenheit to celcius
function convertTime(input) {
	let result = {
		msg: ''
	}
	let errors = []
	console.log("===> timezones.js : convertTime")
	console.log(input)

	let parsedParams = tz_parseCommand(input)

	if (parsedParams.errors.length == 0) {

		// Get the timezones for current and convert to
		// Get what the timestamp for 'current'

		// Determine what type it is to get transform values

		// Type A - Relative hours
		// Command example 
		// !tz -3h15m sydney to rome
		// !tz 4h30m sydney to rome
		// !tz 4h61m sydney to rome
	// [ '-3h15m', 'rome', 'to', 'sydney' ]

		// Type B - Next AM/PM
		// Command example 
		// !tz 10AM az to sydney
	// [ '10am', 'sydney', 'to', 'rome' ]


		// Type C - Next 24 Hour
		// Command example
		// !tz 2345 sydney to phoenix

		// Calculate the time
	} else {
		// TODO : handle erros
	}

	return result
};

function tz_parseCommand(input) {
	let result = {
		valid: false,
		errors: [],
		toCityTz: '',
		fromtCityTz: '',
		timeType: ''
	}

	// Checking time input
	let timeParam = tz_parseTimeParam(input[0])

	// Checking city input
	// TODO: Check if it's city type of PST to AEDST type and shit
	let cityFromParam = tz_parseCityParam(input[1])
	let thirdParam = (input[2] === "to")
	let cityToParam = tz_parseCityParam(input[3])

	if (timeParam.valid && cityFromParam.valid && thirdParam && cityToParam.valid) {
		result.valid = true
		result.toCityTz = cityToParam.timezone
		result.fromCityTz = cityFromParam.timezone
		result.timeType = timeParam.type
	} else {
		if (!timeParam.valid) {
			result.errors.push({ type: "[ER-TIME] time param error"})
		}
		if (!cityFromParam.valid) {
			result.errors.push({ type: "[ER-FRCT] from city param error"})
		}
		if (!cityToParam.valid) {
			result.errors.push({ type: "[ER-TOCT] to city param error"})
		}
	}

	return result
}

function tz_parseTimeParam(input) {
	let result = {
		valid: false,
		type: 'invalid'
	}

	const checkRegex = {
		"typeA_all": /^-?[0-9]{0,2}h[0-9]{0,2}?m$/, // -3h15m / 4h45m
		"typeA_hours": /^-?[0-9]{0,2}h$/, // -3h / 4h
		"typeA_minutes": /^-?[0-9]{0,2}?m$/, // -15m / 45m

		"typeB_all": /^([1][0-2]|[0-9]):[0-9]{2}[ap]m$/, // 12:45am
		"typeB_hours": /^([1][0-2]|[0-9])[ap]m$/, // 10am

		"typeC_all": /^([0-1][0-9]|2[0-4])[0-5][0-9]$/, //2359
	}

	for (let key in checkRegex) {
		let currRegex = checkRegex[key]
		let testResult = input.match(currRegex)
		if (testResult) {
			result.valid = true
			result.type = key
			break
		}
	}

	return result
}

/* tz_parseCityParam
 * - input : string , city name
 */
function tz_parseCityParam(input) {
	let result = {
		valid: false,
		timezone: ''
	}

	let validCityNames = Object.keys(VALID_CITIES)

	if (validCityNames.indexOf(input.toLowerCase()) != -1) {
		result.valid = true;
		result.timezone = VALID_CITIES[input.toLowerCase()]
	}

	return result
}



module.exports = {
	convertTime,
	tz_parseCommand,
	tz_parseTimeParam,
	tz_parseCityParam
}