const fetch = require('node-fetch');
const { getDate } = require('../utils/date');
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
            'Authorization': `${process.env.API_KEY}`
        }
    });

    const results = await response.json();

    return {
        hr0: results.hours[0], 
        hr3: results.hours[3], 
        hr6: results.hours[6]
    };
};

