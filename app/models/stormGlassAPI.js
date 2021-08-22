const fetch = require('node-fetch');
const { getDate } = require('../utils/date');

class StormGlassAPI {

    hr0;
    hr3;
    hr6;
    
    constructor(hr0, hr3, hr6) {
        this.hr0 = hr0;
        this.hr3 = hr3;
        this.hr6 = hr6;
    }

    static fetch = async (lat, lng) => {
        const date = getDate();
        
        const params = 'airTemperature,waveHeight,waveDirection,wavePeriod,windDirection,windSpeed,precipitation,waterTemperature,cloudCover';

        const response = await fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${date.start}&end=${date.end}`, {
            headers: {
                'Authorization': `${process.env.STORMGLASS_API_KEY}`
            }
        });
    
        const results = await response.json();

        return new this(results.hours[0], results.hours[3], results.hours[6]);
    };

}

module.exports = StormGlassAPI;