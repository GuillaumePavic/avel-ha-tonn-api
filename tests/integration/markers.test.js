const { Marker } = require('../../app/models/markerModel');
const request = require('supertest');
const mongoose = require('mongoose');

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
    beforeAll(async () => {
        server = require('../../index');
        await Marker.deleteMany({});
        await Marker.insertMany(markers);
    });
    
    afterAll(() => {
        mongoose.connection.close();
        server.close();
    });

    //Testing
    describe('GET /markers', () => {
        it('should respond with status 200 and an array of 3 objects', async () => {
            const res = await request(server).get('/markers');

            expect(res.status).toBe(200);
            expect(res.body.length).toEqual(3);
        });
    });

    describe('GET /markers/:id', () => {
        it('should respond with status 200 and an object with given properties', async () => {
            const markersList = await request(server).get('/markers');
            const markerOne = {...markersList.body[0]};

            const res = await request(server).get(`/markers/${markerOne._id}`);

            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('object');

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('lat');
            expect(res.body).toHaveProperty('lng');
            expect(res.body).toHaveProperty('label');
            expect(res.body).toHaveProperty('data');
        });
    });
});