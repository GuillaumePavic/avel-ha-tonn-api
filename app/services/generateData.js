const dataMapper = require('../dataMapper/dataMapper');
const calculAverage = require('../utils/calculAverage');
const generateSuggestions = require('../utils/suggestions');

async function generateData(lat, lng) {
    const sgData = await dataMapper.fetchStormGlass(lat, lng);
    delete sgData.time;


    for(let item in sgData) {
        sgData[item] = calculAverage(sgData[item]);
    }


    const suggestions = generateSuggestions(sgData);

    const results = {
        ...sgData,
        suggestions: suggestions
    }
    
    return results;
}

module.exports = generateData;

/*
plage : airTemp > 20, waterTemp > 16
surf : waveheight > 1, wavePeriod > 5, winspeed windDirection
voile : waveHeight < 4, windSpeed > 10 

{
  id: 1,
  lat: 47.753341,
  lng: -3.518707,
  label: "Le Loc'h",
  data: {
    airTemperature: 17.01,
    cloudCover: 100,
    precipitation: 0.72,
    waterTemperature: 16.43,
    waveDirection: 227.08,
    waveHeight: 0.71,
    wavePeriod: 5.4,
    windDirection: 251.61,
    windSpeed: 3.59,
    suggestions: [ 'Not much to do at the beach today !' ]
  }
}
*/
