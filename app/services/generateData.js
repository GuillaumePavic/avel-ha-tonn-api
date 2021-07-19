const dataMapper = require('../dataMapper/dataMapper');
const calculAverage = require('../utils/calculAverage');
const generateSuggestions = require('./generateSuggestions');
const { formatTime } = require('../utils/date');


async function generateData(lat, lng) {
		let SGData = await dataMapper.fetchStormGlass(lat, lng);

		for(hr in SGData) {
			for(data in SGData[hr]) {
				if(data !== 'time') SGData[hr][data] = calculAverage(SGData[hr][data]);

				SGData[hr].suggestions = generateSuggestions(SGData[hr]);

				if(data === 'time') SGData[hr][data] = formatTime(SGData[hr][data]);
			}
		}
		
return SGData;
}

module.exports = generateData;

