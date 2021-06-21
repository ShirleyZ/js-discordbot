const config = require('../config/config.json');
const VALID_CITIES = {
	"sydney": "Australia/Sydney",
	"rome": "Europe/Rome",
	"phoenix": "America/Phoenix",
	"calgary": "America/Edmonton"
}
const ERRORS = {
	"ER-TIME": "",
	"ER-FRCT": "",
	"ER-TOCT": "",
	"ER-GEN" : "",
}

const { DateTime } = require('luxon');

function handleConvertTime(input) {
	let result = {
		timestamp: '',
		msg: ''
	}
	let errors = []
	console.log("===> timezones.js : convertTime")
	console.log(input)

	let parsedParams = tz_parseCommand(input)

	if (parsedParams.errors.length == 0) {

		console.log("parsedParams")
		console.log(parsedParams)

		let convertedTime = tz_convertTime(parsedParams)

		// format output
		result.msg = tz_formatTime(convertedTime,parsedParams.toCity)
		result.timestamp = convertedTime.toMillis()
	} else {
		// TODO : handle erros
	}

	return result
};

function tz_formatTime(time, city) {
	let formattedTime = time.toFormat('hh:mma EEE dd MMM yyyy')
	return formattedTime+' in '+city
}

function tz_convertTime(params) {
	let result
	let fromTime

	// Calculate the time
	// Type A - Relative and needs calculation
	if (params.timeType.startsWith("typeA_")) {
		fromTime = DateTime.now()
		let timePeriod = {
			hours: params.timeHour,
			minutes: params.timeMinute
		}
		fromTime = fromTime.plus(timePeriod)

	// Other types - Just convert
	} else {
		// Initialise timestamp for local city
		let localHour = params.timeHour
		if (params.timeAmpm === "pm") {
			localHour += 12
		}
		fromTime = DateTime.fromObject({
			hour: localHour, 
			minute: params.timeMinute,
			zone: params.fromCityTz
		})
	}

	// Convert to foreign city
	result = fromTime.setZone(params.toCityTz)

	return result
}

function tz_parseCommand(input) {
	let result = {
		valid: false,
		errors: [],
		toCity: '',
		toCityTz: '',
		fromCityTz: '',
		fromCity: '',
		timeType: '',
		timeCalculation: ''
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
		result.fromCity = input[1]
		result.toCity = input[3]
		result.timeType = timeParam.type
		result.timeHour = Number(timeParam.hour)
		result.timeMinute = Number(timeParam.minute)
		result.timeAmpm = timeParam.ampm
		result.timeCalculation = timeParam.calculation
	} else {
		if (!timeParam.valid) {
			result.errors.push({ code: "ER-TIME", type: "[ER-TIME] time param error"})
		}
		if (!cityFromParam.valid) {
			result.errors.push({ code: "ER-FRCT", type: "[ER-FRCT] from city param error"})
		}
		if (!cityToParam.valid) {
			result.errors.push({ code: "ER-TOCT", type: "[ER-TOCT] to city param error"})
		}
	}

	return result
}

function tz_parseTimeParam(input) {
	let result = {
		valid: false,
		hour: 0,
		minute: 0,
		type: 'invalid',
		calculation: ''
	}

	const checkRegex = {
		"typeA_all": /^(-?[0-9]{0,2})h([0-9]{0,2}?)m$/, // -3h15m / 4h45m
		"typeA_hours": /^(-?[0-9]{0,2})h$/, // -3h / 4h
		"typeA_minutes": /^(-?[0-9]{0,2}?)m$/, // -15m / 45m

		"typeB_all": /^([1][0-2]|[0-9]):([0-5][0-9])([ap]m)$/, // 12:45am
		"typeB_hours": /^([1][0-2]|[0-9])([ap]m)$/, // 10am

		"typeC_all": /^([0-1][0-9]|2[0-4])([0-5][0-9])$/, //2359
	}

	for (let key in checkRegex) {
		let currRegex = checkRegex[key]
		let testResult = input.match(currRegex)
		console.log(key+" testResult:")
		console.log(testResult)
		if (testResult !== null) {
			console.log(testResult[1])
			console.log(testResult[2])
			result.valid = true
			result.type = key

			if (key == "typeA_all") {
				result.hour = testResult[1]
				result.minute = testResult[2]
			} else if (key == "typeA_hours") {
				result.hour = testResult[1]
			} else if (key == "typeA_minutes") {
				result.minute = testResult[1]
			} else if (key == "typeB_all") {
				result.hour = testResult[1]
				result.minute = testResult[2]
				result.ampm = testResult[3]
			} else if (key == "typeB_hours") {
				result.hour = testResult[1]
				result.ampm = testResult[2]
			} else if (key == "typeC_all") {
				result.hour = testResult[1]
				result.minute = testResult[2]
				if (result.hour >= 12) {
					result.ampm = 'pm'
					result.calculation = 'plus'
				} else {
					result.calculation = 'minus'
				}
			}
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
	handleConvertTime,
	tz_convertTime,
	tz_parseCommand,
	tz_parseTimeParam,
	tz_parseCityParam
}