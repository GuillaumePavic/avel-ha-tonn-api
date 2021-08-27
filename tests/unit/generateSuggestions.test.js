const generateSuggestions = require('../../app/services/generateSuggestions');

describe('generateSuggestions.js', () => {

    it('should return an array of suggestions with at leats one suggestion from the list', () => {
        let mockData = {
            airTemperature: 21.23,
            cloudCover: 36.5,
            precipitation: 0,
            time: '14:00',
            waterTemperature: 19.86,
            waveDirection: 273.84,
            waveHeight: 1.86,
            wavePeriod: 6.37,
            windDirection: 266.05,
            windSpeed: 8.51
        };

        const suggestions = generateSuggestions(mockData);
        const expectedResult = suggestions.some(suggestion => suggestion === 'Surf' || 'Plage' || 'Voile' || 'Pas grand chose à faire à la plage');

        expect(expectedResult).toBe(true);
    });
});