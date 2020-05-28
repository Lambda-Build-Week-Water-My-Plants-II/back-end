const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

let token;

beforeEach(async () => {
  await db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());

  await request(server)
    .post("/api/auth/login")
    .send({
      username: "test1",
      password: "password",
    })
    .then((res) => {
      token = res.body.token;
    });
});

describe("PLANT ROUTES", () => {
  describe("GET /api/plants", () => {
    it("should return a status of 200 there are plants for that user", async () => {
      const expectedStatus = 200;
      const response = await request(server)
        .get("/api/plants")
        .set("Authorization", token);

      expect(response.status).toEqual(expectedStatus);
    });

    it("should return a status of 401 if user is not logged in", async () => {
      const expectedStatus = 401;
      const unauthorizedToken = "234234123";
      const response = await request(server)
        .get("/api/plants")
        .set("Authorization", unauthorizedToken);
      expect(response.status).toEqual(expectedStatus);
    });

    it("should return a body with an array", async () => {
      const response = await request(server)
        .get("/api/plants")
        .set("Authorization", token);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should respond with status 404 if and a message of no plants found", async () => {
      let newToken;
      const newUser = await request(server).post("/api/auth/register").send({
        username: "test12",
        password: "password",
        phone_number: "322-222-2222",
      });
      const login = await request(server)
        .post("/api/auth/login")
        .send({
          username: "test12",
          password: "password",
        })
        .then((res) => {
          newToken = res.body.token;
        });

      const expectedStatus = 404;
      const response = await request(server)
        .get("/api/plants")
        .set("Authorization", newToken);

      expect(response.status).toEqual(expectedStatus);
      expect(response.body.message).toBeDefined();
      expect(response.body.message).toEqual(
        "This user does not have any plants"
      );
      expect(response.body).toEqual({
        message: "This user does not have any plants",
      });
    });
  });

  describe("GET /api/plants/:id", () => {
    it("should return and object containing a single plant", async () => {
      const response = await request(server)
        .get("/api/plants/1")
        .set("Authorization", token);

      expect(response.body.id).toBeDefined();
      expect(response.body.nickname).toBeDefined();
      expect(response.body.species).toBeDefined();
    });
    it("should return a status code of 200", async () => {
      const expectedStatus = 200;
      const response = await request(server)
        .get("/api/plants/1")
        .set("Authorization", token);

      expect(response.status).toEqual(expectedStatus);
    });
    it("should return a status code of 404 if no plant found wiht that id", async () => {
      const expectedStatus = 404;
      const response = await request(server)
        .get("/api/plants/231")
        .set("Authorization", token);

      expect(response.status).toEqual(expectedStatus);
    });
    it("should return a message no plant found with that id", async () => {
      const response = await request(server)
        .get("/api/plants/231")
        .set("Authorization", token);

      expect(response.body.message).toBeDefined();
      expect(response.body.message).toEqual("No plant by that id");
      expect(response.body).toEqual({ message: "No plant by that id" });
    });
  });

  
});
