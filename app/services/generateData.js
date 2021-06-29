const dataMapper = require('../dataMapper/dataMapper');
const calculAverage = require('../utils/calculAverage');
const generateSuggestions = require('./generateSuggestions');


async function generateData(lat, lng) {
    const SGData = await dataMapper.fetchStormGlass(lat, lng);

    //Calcul avarage for each item
    for(hr in SGData) {
      for(data in SGData[hr]) {
        if(data !== 'time') SGData[hr][data] = calculAverage(SGData[hr][data]);
      }
    }

    //Generate suggestions for each hour
    for(hr in SGData) {
        const suggestions = generateSuggestions(hr);
        SGData[hr].suggestions = suggestions;
    }
    

return SGData;

}

module.exports = generateData;

