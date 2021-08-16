const request = require('supertest');

let server;

describe('markers routes', () => {

    beforeEach(() => {
        server = require('../../index');
    });
    
    afterEach(() => server.close());

    describe('GET /markers', () => {
        it('should respond with status 200 and an array of objects', async () => {
            const res = await request(server).get('/markers');

            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
    });

    describe('GET /marker/:id', () => {
        it('should respond with status 200 and an object with given properties', async () => {
            const res = await request(server).get('/marker/1');

            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('object');

            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('lat');
            expect(res.body).toHaveProperty('lng');
            expect(res.body).toHaveProperty('label');
        });
    });
});