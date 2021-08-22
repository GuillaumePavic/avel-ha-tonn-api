const Marker = require('../../app/models/markerModel');
const request = require('supertest');

let server;

describe('markers routes', () => {

    //Data
    const markers = [
        {
            lat: 47.753341,
            lng: -3.518707,
            label: "Le Loc'h"
        },
        {
            lat: 47.597138,
            lng: -3.156162,
            label: "Sainte-Barbe"
        },
        {
            lat: 47.522001,
            lng:  -3.155182,
            label: "Port-Blanc"
        }
    ];

    //Init
    beforeEach(async () => {
        server = require('../../index');
        await Marker.deleteMany({});
        await Marker.insertMany(markers);
    });
    
    afterEach(() => server.close());

    //Testing
    describe('GET /markers', () => {
        it('should respond with status 200 and an array of objects', async () => {
            const res = await request(server).get('/markers');

            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
    });

    describe('GET /marker/:id', () => {
        it('should respond with status 200 and an object with given properties', async () => {
            const markers = await request(server).get('/markers');
            expect(markers.body.length).toBeGreaterThan(0);
            const markerOne = markers[0];

            const res = await request(server).get(`/marker/${markerOne}`);

            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('object');

            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('lat');
            expect(res.body).toHaveProperty('lng');
            expect(res.body).toHaveProperty('label');
        });
    });
});