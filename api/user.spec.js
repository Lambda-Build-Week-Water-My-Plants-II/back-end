const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

let authToken;
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
      authToken = res.body.token;
    });
});
describe("USER ROUTES", () => {
  //Test PUT for updating user
  describe("PUT route /api/user/:id", () => {
    it("should respond with a 400 if username is missing", async () => {
      const expectedStatus = 400;
      const userInfo = {
        // username: "mellow",
        password: "password",
        phone_number: "111-111-1111",
      };
      const response = await request(server)
        .put("/api/user/1")
        .send(userInfo)
        .set("Authorization", authToken);
      expect(response.status).toEqual(expectedStatus);
    });
    it("should respond with a 400 if password is missing", async () => {
      const expectedStatus = 400;
      const userInfo = {
        username: "mellow",
        // password: "password",
        phone_number: "111-111-1111",
      };
      const response = await request(server)
        .put("/api/user/1")
        .send(userInfo)
        .set("Authorization", authToken);
      expect(response.status).toEqual(expectedStatus);
    });
    it("should respond with a 400 if phone_number is missing", async () => {
      const expectedStatus = 400;
      const userInfo = {
        username: "mellow",
        password: "password",
        // phone_number: "111-111-1111",
      };
      const response = await request(server)
        .put("/api/user/1")
        .send(userInfo)
        .set("Authorization", authToken);

      expect(response.status).toEqual(expectedStatus);
    });

    it("should respond with a 401 status if user is not logged in", async () => {
      const expectedStatus = 401;
      const userInfo = {
        username: "mellow",
        password: "password",
        phone_number: "111-111-1111",
      };
      const unauthorizedToken = "312313213";
      const response = await request(server)
        .put("/api/user/1")
        .send(userInfo)
        .set("Authorization", unauthorizedToken);

      expect(response.status).toEqual(expectedStatus);
    });

    it("should respond with a 200 status if success", async () => {
      const expectedStatus = 200;
      const userInfo = {
        username: "mellow",
        password: "password",
        phone_number: "111-111-1111",
      };
      const response = await request(server)
        .put("/api/user/1")
        .send(userInfo)
        .set("Authorization", authToken);

      expect(response.status).toEqual(expectedStatus);
    });
    it("should respond with an object on success", async () => {
      const expectedStatus = 200;
      const userInfo = {
        username: "mellow",
        password: "password",
        phone_number: "111-111-1111",
      };
      const response = await request(server)
        .put("/api/user/1")
        .send(userInfo)
        .set("Authorization", authToken);

      expect(response.body).toEqual(
        expect.objectContaining({
          username: response.body.username,
          password: response.body.password,
          phone_number: response.body.phone_number,
          id: response.body.id,
        })
      );
    });
  });

  //Test DELETE route to remove a user
  describe("DELETE route /api/user/:id", () => {
    it("should return a 401 if user is not logged in", async () => {
      const expectedStatus = 401;
      const unauthorizedToken = "1231232";
      const response = await request(server)
        .delete("/api/user/1")
        .set("Authorization", unauthorizedToken);

      expect(response.status).toEqual(expectedStatus);
    });
    it("should return a 401 if user is trying to remove another user", async () => {
      const expectedStatus = 401;

      const response = await request(server)
        .delete("/api/user/3")
        .set("Authorization", authToken);

      expect(response.status).toEqual(expectedStatus);
    });
    it("should return a 200 on success", async () => {
      const expectedStatus = 200;

      const response = await request(server)
        .delete("/api/user/1")
        .set("Authorization", authToken);

      expect(response.status).toEqual(expectedStatus);
    });
    it("should return an object on success", async () => {
      const response = await request(server)
        .delete("/api/user/1")
        .set("Authorization", authToken);

      expect(response.body.message).toEqual("Deleted user with id of 1");
    });
    it("should return an object on success", async () => {
      const response = await request(server)
        .delete("/api/user/1")
        .set("Authorization", authToken);

      expect(response.body).toEqual({ message: "Deleted user with id of 1" });
    });
    it("should return an object on success", async () => {
      const response = await request(server)
        .delete("/api/user/1")
        .set("Authorization", authToken);

      expect(response.body.message).toBeDefined();
    });
  });
});
