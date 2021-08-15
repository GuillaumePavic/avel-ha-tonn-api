const calculAverage = require('../../app/utils/calculAverage');

describe('calculAverage.js', () => {

    it('should return average for the given data', () => {
        const mockItem = { 
            dwd: 21.53, 
            noaa: 20.63, 
            sg: 21.53 
        };

        const result = calculAverage(mockItem);

        expect(typeof result).toBe('number');
    });
});