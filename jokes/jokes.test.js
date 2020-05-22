const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const testDBReset = require('../helpers/testDBReset');

// reset the database before each test run
beforeEach(testDBReset);

describe('jokes', () => {
    it("can run the tests", () => {
        expect(true).toBeTruthy();
    })
    describe('GET attempt without login', () => {
        it('rejects our advances with NO auth info', async () => {
            const res = await request(server)
                .post('/api/jokes')
            expect(res.status).toBe(400);
        })
        it('rejects our advances with BAD auth info', async () => {
            const res = await request(server)
                .post('/api/jokes')
                .set("authorization", { token: "liyug867t" })
            expect(res.status).toBe(401);
        })
    })
    describe('GET jokes while logged in', () => {

        it('returns OK status', async () => {
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
            const res = await request(server)
                .get("/api/jokes")
                .set("authorization", login.body.token);
            expect(res.status).toBe(200);
        })
    })
})