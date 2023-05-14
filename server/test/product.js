const request = require("supertest");
const app = require("../index");

describe("GET /products/data", function () {
  it("responds with json containing a list of all products", function (done) {
    this.timeout(10000);
    request(app)
      .get("/products/data")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe("GET /products/data/:id", () => {
  it("responds with json containing a single product", (done) => {
    request(app)
      .get("/products/data/6460d59b45ed5b3169b97f1f")
      .expect(200, done);
  });
});

describe("POST /products/data", () => {
  it("responds with json containing a single product", (done) => {
    const data = {
      name: "Test",
      price: 100,
      description: "Test",
    };
    request(app).post("/products/data").expect(200);
    done();
  });
});

describe("PUT /products/data/:id", () => {
  it("responds with json containing a single product", (done) => {
    request(app)
      .put("/products/data/6460d59b45ed5b3169b97f1f")
      .send({
        price: 101,
      })
      .expect(200, done);
  });
});
