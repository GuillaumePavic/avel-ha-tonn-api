const request = require('supertest');
const User = require('../../app/models/userModel');

let server;
let token;

describe('users routes', () => {

    const userData = {
        name: 'User',
        email: 'user@mail.com',
        password: 'password'
    }

    beforeAll(() => {
        server = require('../../index');
        User.deleteMany({});
    });

    afterAll(() => {
        server.close();
    });

    describe('POST /user', () => {
        //happy path
        it("should return an object with the message 'success", async () => {
            const res = await request(server).post(`/user`).send(userData);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Veuillez vérifier vos emails afin de finaliser la création de votre compte');
        });

        //negative tests
        it("should return that the name is missing", async () => {
            const res = await request(server).post('/user').send({email: 'user@mail.com', password: 'password'});

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('message', "\"name\" is required");
        });

        it("should return that the email is missing", async () => {
            const res = await request(server).post('/user').send({name: "User", password: 'password'});

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('message', "\"email\" is required");
        });

        it("should return that the password is missing", async () => {
            const res = await request(server).post('/user').send({name: "User", email: 'user@mail.com'});

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('message', "\"password\" is required");
        });
        
    });

    describe("GET /user", () => {
        
        it("should return an object with the right properties", async () => {
            const authResponse = await request(server).post('/auth').send({email: 'user@mail.com', password: 'password'});
            token = authResponse.body.token;
            
            const res = await request(server).get('/user').set('auth', token);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', 'User');
            expect(res.body).toHaveProperty('email', 'user@mail.com');
            expect(res.body).toHaveProperty('createdAt');
            expect(res.body).toHaveProperty('markers', []);
        });
    });

    describe("DELETE /user", () => {

        it("should return that the account has been deleted", async () => {
            const res = await request(server).delete('/user').set('auth', token);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'le compte a été supprimé');
        })
    })
});