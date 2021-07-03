const dataMapper = require('../dataMapper/dataMapper');
const calculAverage = require('../utils/calculAverage');
const generateSuggestions = require('./generateSuggestions');
const { formatTime } = require('../utils/getDate');


async function generateData(lat, lng) {
    const SGData = await dataMapper.fetchStormGlass(lat, lng);

    //Calcul avarage for each item
    for(hr in SGData) {
      for(data in SGData[hr]) {
        if(data !== 'time') SGData[hr][data] = calculAverage(SGData[hr][data]);
        if(data === 'time') SGData[hr][data] = formatTime(SGData[hr][data]);
      }
    }

    //Generate suggestions for each hour
    for(hr in SGData) {
        const suggestions = generateSuggestions(SGData[hr]);
        SGData[hr].suggestions = suggestions;
    }
    
return SGData;
}

module.exports = generateData;

