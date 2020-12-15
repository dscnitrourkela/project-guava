/* eslint-env mocha */
const chai = require('chai');
const supertest = require('supertest');

const { expect } = chai;
const url = 'http://localhost:5000';
const request = supertest(url);

describe('GraphQL', () => {
  it('Returns graphql welcome message', (done) => {
    request
      .post('/graphql')
      .send({ query: '{ status }' })
      .expect(200)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.data).to.have.property('status');
        return done();
      });
  });
});
