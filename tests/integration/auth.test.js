const User = require('../../app/models/userModel');
const bcrypt = require('bcrypt');
const request = require('supertest');
const mongoose = require('mongoose');

let server;

describe('authentification route', () => {
    //Init
    beforeAll(async () => {
        server = require('../../index');

        await User.deleteMany({});

        const userData = {
            name: 'User',
            email: 'user@mail.com',
            password: 'password',
            markers: []
        }

        const user = new User(userData);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
    });
    
    afterAll(() => {
        mongoose.connection.close();
        server.close();
    });

    //happy path
    it('should return the user\'s name and a token', async () => {

        const res = await request(server).post(`/auth`).send({email: 'user@mail.com', password: 'password'});

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('name');
        expect(res.body.name).toBe('User');
        expect(res.body).toHaveProperty('token');
    });

    //negative tests
    it('should return that the email is required', async () => {
        const res = await request(server).post(`/auth`).send({password: 'password'});

        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('message', "\"email\" is required");
    });

    it('should return that the password is required', async () => {
        const res = await request(server).post(`/auth`).send({email: 'user@mail.com'});

        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('message', "\"password\" is required");
    });
});