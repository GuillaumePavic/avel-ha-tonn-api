const date = require('../../app/utils/date');

describe('date.js', () => {
    
    describe('getDate', () => {

        const currentDate = date.getDate();

        it('should return a object with "start" and "end" properties', () => {
            expect(typeof currentDate).toBe('object');
            expect(currentDate).toHaveProperty('start');
            expect(currentDate).toHaveProperty('end');
        });
        
        it('currentDate.start and currentDate.end should match regexp', () => {
            expect(currentDate.start).toMatch(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}%3A[0-9]{2}/);
            expect(currentDate.end).toMatch(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}%3A[0-9]{2}/);
        });
    });

    describe('formatTime', () => {
        it('should match the regexp', () => {
            const stormGlassTime = '2021-08-15T18:00:00+00:00';

            expect(date.formatTime(stormGlassTime)).toMatch(/[0-9]{2}:[0-9]{2}/);
        });
   });
});