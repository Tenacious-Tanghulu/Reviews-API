const app = require('./testserver.js');

const supertest = require('supertest');
const request = supertest(app);




it('should receive a status 200', async () => {

  let max = 1000011;

  let product_id = Math.floor(Math.random() * max) || 1;

  const res = await request.get(`/reviews/?product_id=${product_id}`);

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("product");
  expect(res.body instanceof Object).toBe(true);

  //expect(response.body.message).toBe('pass!')


})

// it("should get all status", async () => {
//   const res = await request(app)
//     .get("/reviews/?product_id=25167")
//     // .set("Accept", "application/json")
//     // .expect("Content-Type", /json/)
//     .expect(200);
// });