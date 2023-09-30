// const request = require('supertest');
// const app = require('./index.js'); // Assuming your Express app is exported from index.js

// describe('User Creation Test', () => {
//   it('should create a new user with valid data', async () => {
//     const userData = {
//       username: 'testuser',
//       email: 'testuser1@example.com',
//       password: 'password123',
//       dateOfBirth: '1990-01-01',
//       height: 180,
//       weight: 75,
//     };

//     const response = await request(app)
//       .post('/users/newuser')
//       .send(userData)
//       .set('Accept', 'application/json');

//     expect(response.status).toBe(201);
//     // Optionally, you can also check if the response body contains the created user data
//     // expect(response.body).toEqual(expect.objectContaining(userData));
//   });
// });

