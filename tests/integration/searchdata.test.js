const request = require('supertest');

let server;

describe('searchData route', () => {
    
    beforeAll(() => {
        server = require('../../index');
    });
    
    afterAll(() => server.close());

    describe('GET /search', () => {

        it('should respond with status 200 and an object', async () => {
            const res = await request(server)
                .post('/search')
                .send({ lat: 47.597138, lng: -3.156162 });

            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('object');

            expect(res.body).toHaveProperty('lat');
            expect(res.body).toHaveProperty('lng');
            expect(res.body).toHaveProperty('data');
        });
    });
});
