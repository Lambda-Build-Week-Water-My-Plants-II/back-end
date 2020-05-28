const request = require("supertest");
const server = require("./server");

describe("server", () => {
  describe("server", () => {
    it("can run tests", () => {
      expect(true).toBeTruthy();
    });

    describe("GET /", () => {
      it("should return http status code of 200 OK", async () => {
        const expectedStatusCode = 200;
        const response = await request(server).get("/");

        //expect the status code to be 200
        expect(response.status).toEqual(expectedStatusCode);
      });

      it("should return an object { api: 'its alive!'}", async () => {
        const response = await request(server).get("/");

        //expect response body containing the key of api
        expect(response.body.api).toBeDefined();
        //expect the key of api to have value of 'its alive!'
        expect(response.body.api).toBe("its alive!");
        //expect the object to be {api:'its alive!}
        expect(response.body).toEqual({ api: "its alive!" });
      });
    });
  });
});
