const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");


afterEach(async () => {
  await db("users").del();
});

describe("AUTH ROUTES", () => {
  //Test POST /register

  //responds with an a status 400 if username / password is not provided
  it("should respond with a 400 status code if password is not provided", async () => {
    const expectedStatus = 400;
    const userInfo = {
      username: "mellow",
      // password: "password",
      //leaving password out to pass the test
    };
    const response = await request(server)
      .post("/api/auth/register")
      .send(userInfo);
    expect(response.status).toEqual(expectedStatus);
  });
  it("should respond with a 400 status code if username is not provided", async () => {
    const expectedStatus = 400;
    const userInfo = {
      // username: "mellow",
      password: "password",
      //leaving username out to pass the test
    };
    const response = await request(server)
      .post("/api/auth/register")
      .send(userInfo);
    expect(response.status).toEqual(expectedStatus);
  });
  it("should respond with a 400 status code if phone_number is not provided", async () => {
    const expectedStatus = 400;
    const userInfo = {
      // username: "mellow",
      // password: "password",
      phone_number: 111 - 111 - 1111,
      //leaving username and password out to pass the test
    };
    const response = await request(server)
      .post("/api/auth/register")
      .send(userInfo);
    expect(response.status).toEqual(expectedStatus);
  });

  //registers a new user
  it("should respond with status 201 on success", async () => {
    const expectedStatus = 201;
    const userInfo = {
      username: "method",
      password: "password",
      phone_number: "111-111-1111",
    };
    const response = await request(server)
      .post("/api/auth/register")
      .send(userInfo);
    expect(response.status).toEqual(expectedStatus);
  });
  it("should respond with an object in body", async () => {
    const expectedStatus = 201;
    const userInfo = {
      username: "method",
      password: "password",
      phone_number: "111-111-1111",
    };
    const response = await request(server)
      .post("/api/auth/register")
      .send(userInfo);
    //check for id
    expect(response.body.id).toBeDefined();
    //check for username
    expect(response.body.username).toBeDefined();
    //check for hashed password
    expect(response.body.password).toBeDefined();
    //check for hashed password
    expect(response.body.phone_number).toBeDefined();
  });

  //Test POST for /login
  describe("/api/auth/login", () => {
    //create user and logs in
    it("should create a user and login with that credential and respond with 200", async () => {
      const expectedStatus = 200;
      const userInfo = {
        username: "method",
        password: "password",
        phone_number: "111-111-1111",
      };
      const registration = await request(server)
        .post("/api/auth/register")
        .send(userInfo);
      const credentials = {
        username: "method",
        password: "password",
      };
      //log user in
      const loginUser = await request(server)
        .post("/api/auth/login")
        .send(credentials);
      expect(loginUser.status).toEqual(expectedStatus);
    });

    it("should have an object containing token and the id on sucess  ", async () => {
      const expectedStatus = 200;
      const userInfo = {
        username: "method",
        password: "password",
        phone_number: "111-111-1111",
      };
      const registration = await request(server)
        .post("/api/auth/register")
        .send(userInfo);
      const credentials = {
        username: "method",
        password: "password",
      };
      const loginUser = await request(server)
        .post("/api/auth/login")
        .send(credentials);
      //have success
      expect(loginUser.body.success).toBeDefined();
      //have token
      expect(loginUser.body.token).toBeDefined();
      //have id
      expect(loginUser.body.id).toBeDefined();
    });

    it("should have an error code of 401 if wrong credentials are entered  ", async () => {
      const expectedStatus = 401;
      const userInfo = {
        username: "method",
        password: "password",
        phone_number: "111-111-1111",
      };
      const registration = await request(server)
        .post("/api/auth/register")
        .send(userInfo);
      const credentials = {
        username: "method",
        password: "passwor",
      };
      const loginUser = await request(server)
        .post("/api/auth/login")
        .send(credentials);
      expect(loginUser.status).toEqual(expectedStatus);
    });
    it("should have an error code of 400 if missing password  ", async () => {
      const expectedStatus = 400;
      const userInfo = {
        username: "method",
        password: "password",
        phone_number: "111-111-1111",
      };
      const registration = await request(server)
        .post("/api/auth/register")
        .send(userInfo);
      const credentials = {
        username: "method",
        // password: "passwor",
      };
      const loginUser = await request(server)
        .post("/api/auth/login")
        .send(credentials);
      expect(loginUser.status).toEqual(expectedStatus);
    });
    it("should have an error code of 400 if missing username  ", async () => {
      const expectedStatus = 400;
      const userInfo = {
        username: "method",
        password: "password",
        phone_number: "111-111-1111",
      };
      const registration = await request(server)
        .post("/api/auth/register")
        .send(userInfo);
      const credentials = {
        // username: "method",
        password: "passwor",
      };
      const loginUser = await request(server)
        .post("/api/auth/login")
        .send(credentials);
      expect(loginUser.status).toEqual(expectedStatus);
    });
  });
});
