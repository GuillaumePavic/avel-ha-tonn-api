const roundLatLng = require('../../app/utils/roundLatLng');

describe('roundLatLng.js', () => {

    it('lattitude and longitude should be rounded with 6 decimals', () => {
        const latOrLng = 47.70189865315518;
        const result = roundLatLng(latOrLng);

        expect(result).toBe(47.701899);
    });
});