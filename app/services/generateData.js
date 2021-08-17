const fetchStormGlass = require('../models/stormGlassAPI');
const calculAverage = require('../utils/calculAverage');
const generateSuggestions = require('./generateSuggestions');
const { formatTime } = require('../utils/date');


async function generateData(lat, lng) {
	let SGData = await fetchStormGlass(lat, lng);

	for(hr in SGData) {
		for(data in SGData[hr]) {
			if(data !== 'time') SGData[hr][data] = calculAverage(SGData[hr][data]);
			if(data === 'time') SGData[hr][data] = formatTime(SGData[hr][data]);
		}
	
		SGData[hr].suggestions = generateSuggestions(SGData[hr]);
	}
		
return SGData;
}

module.exports = generateData;

