const request = require("supertest");
const server = require("../api/server.js");

const user = {
    username: "jruss",
    password: "password"
};

describe("jokes route", () => {
    describe("Get request for all jokes", () => {
        it("should return 200 status", async function () {
            request(server)
            .get("/")
            .expect(200)
        })
    });
})

describe("register route", () => {
  it("should run the tests", () => {
    expect(true).toBe(true);
  });

  describe("register a user successfully with username and password", () => {
    it("should add the created user", function () {
      request(server)
        .post("/api/auth/register")
        .send(user)
        .expect(201)
    });
  });

  describe("should require username", () => {
      it("should make sure input has username and password", () => {
          request(server)
          .post("/api/auth/register")
          .send({ username: "justin" })
          .expect(500)
      })
  })
});

describe("Post to login", () => {
    describe("should log the user in with correct credentials", () => {
        it("checks username/pw against existing accts in database", () => {
            request(server)
            .post("/api/auth/login")
            .send(user)
            .expect(200)
        })
    })
    describe("requires username and password", () => {
        it("logs in only if user presents username and password", () => {
            request(server)
            .post("/api/auth/login")
            .send({ username: "justin" })
            .expect(401)
        })
    })
})