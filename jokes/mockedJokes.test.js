const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const testDBReset = require('../helpers/testDBReset');

const restrict = require("../auth/authenticate-middleware")
jest.mock("../auth/authenticate-middleware")

// reset the database before each test run
beforeEach(testDBReset);

describe('GET jokes while mock logged in', () => {

    it('login returns the correct info', async () => {
        const res = await request(server)
            .get("/api/jokes")
        expect(restrict).toBeCalled();
        expect(res.body[0]).toHaveProperty("id");
        expect(res.body[0]).toHaveProperty("joke");
    })
})