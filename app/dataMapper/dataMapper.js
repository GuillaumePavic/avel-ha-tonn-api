const fetch = require('node-fetch');
const { getDate } = require('../utils/getDate');
const markers = require('../../data/markers.json');

exports.getMarkers = () => {
    return markers;
}

exports.getMarker = (markerId) => {
    return markers.find(e => e.id == markerId)
}

exports.fetchStormGlass = async (lat, lng) => {
    const date = getDate();
    
    const params = 'airTemperature,waveHeight,waveDirection,wavePeriod,windDirection,windSpeed,precipitation,waterTemperature,cloudCover';

    const response = await fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${date.start}&end=${date.end}`, {
        headers: {
            'Authorization': 'e95591fc-c895-11eb-8d12-0242ac130002-e9559288-c895-11eb-8d12-0242ac130002'
        }
    });

    const results = await response.json();

    return {
        hr0: results.hours[0], 
        hr3: results.hours[3], 
        hr6: results.hours[6]
    };
};

