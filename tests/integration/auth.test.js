const User = require('../../app/models/userModel');
const bcrypt = require('bcrypt');
const request = require('supertest');

let server;

describe('authentification route', () => {
    //Init
    beforeAll(async () => {
        server = require('../../index');

        await User.deleteMany({});

        const userData = {
            name: 'User',
            mail: 'user@mail.com',
            password: 'password',
            markers: []
        }

        const user = new User(userData);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
    });
    
    afterAll(() => server.close());

    it('should return the user\'s name and a token', async () => {

        const res = await request(server).post(`/auth`).send({mail: 'user@mail.com', password: 'password'});

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('name');
        expect(res.body.name).toBe('User');
        expect(res.body).toHaveProperty('token');
    })
})