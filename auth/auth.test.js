const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const testDBReset = require('../helpers/testDBReset');

// reset the database before each test run
beforeEach(testDBReset);

describe('auth', () => {
    it("can run the tests", () => {
        expect(true).toBeTruthy();
    })
})

describe('POST to api/auth/register', () => {
    it('cannot register an incomplete user', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({
                username: "testUser99",
            });
        expect(res.status).toBe(400);
        expect(res.body).toMatchObject({ message: 'Please provide a username and password.' });
    })
    it('can register a user', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({
                username: "testUser",
                password: "pwd123"
            });
        expect(res.status).toBe(201);
    })
    it('registration returns correct information', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({
                username: "testUser",
                password: "pwd123"
            });
        expect(Object.keys(res.body.data)).toHaveLength(3);
        expect(res.body.data).toMatchObject({
            id: 1,
            username: 'testUser'
        });
        expect(res.body.data).toHaveProperty("password");
    })
})

describe('POST to api/auth/login', () => {
    it('cannot log an invalid user in', async () => {
        const register = await request(server)
            .post('/api/auth/register')
            .send({
                username: "testUser2",
                password: "pwd123"
            });
        const login = await request(server)
            .post("/api/auth/login")
            .send({
                username: "testUser2",
                password: "321dwp"
            });
        expect(login.status).toBe(401);
        expect(login.body).toMatchObject({ message: 'Invalid credentials.' })
    })
    it('can log a user in', async () => {
        const register = await request(server)
            .post('/api/auth/register')
            .send({
                username: "testUser2",
                password: "pwd123"
            });
        const login = await request(server)
            .post("/api/auth/login")
            .send({ 
                username: "testUser2", 
                password: "pwd123" });
        expect(login.status).toBe(200);
    })
    it('login returns the correct info', async () => {
        const register = await request(server)
            .post('/api/auth/register')
            .send({
                username: "testUser2",
                password: "pwd123"
            });
        const login = await request(server)
            .post("/api/auth/login")
            .send({
                username: "testUser2",
                password: "pwd123"
            });
        expect(Object.keys(login.body)).toHaveLength(2);
        expect(login.body).toMatchObject({ message: 'Access granted.' });
        expect(login.body).toHaveProperty("token")
    })
})