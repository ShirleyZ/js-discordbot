const config = require('../config/config.json');

// Func convert farenheit to celcius
function ftoc(input) {
	let result = {}
	const ftmp = input[0]
	result.value = (ftmp - 32) * (5/9)
	result.value = result.value.toFixed(2)
	return result
};

// Func convert celcius to farenheit
function ctof(input) {
	let result = {}
	const ctmp = input[0]
	result.value = (ctmp * 1.8) + 32
	result.value = result.value.toFixed(2)
	return result
};



module.exports = {
	ftoc,
	ctof
}