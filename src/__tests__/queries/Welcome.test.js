import { expect } from '@jest/globals';
import { graphql } from 'graphql';

import schema from '../../graphql/index.js';
import { Welcome } from '../../models/index.js';
import { beforeTest, afterTest } from '../../utils/mongoMemoryServer.js';

beforeEach(async () => {
  await beforeTest();
});

afterEach(async () => {
  await afterTest();
});
jest.setTimeout(600000);

it('should return a welcome message with appropriate status', async () => {
  const welcome = new Welcome({
    message: 'This is test message!',
    status: 200,
  });
  await welcome.save();

  //language=GraphQL
  const query = `
    {
      getWelcomeMessage(status: 200) {
        message
      }
    }
  `;

  const rootValue = {};
  const result = await graphql(schema, query, rootValue);
  const { data } = result;

  expect(data.getWelcomeMessage.message).toBe(welcome.message);
});

it('should return an array of all welcome messages', async () => {
  const welcome1 = new Welcome({
    message: 'This is test message!',
    status: 200,
  });
  const welcome2 = new Welcome({
    message: 'This is test message!',
    status: 200,
  });
  await welcome1.save();
  await welcome2.save();

  //language=GraphQL
  const query = `
    {
      getWelcomeMessages {
        message
      }
    }
  `;

  const rootValue = {};
  const result = await graphql(schema, query, rootValue);
  const { data } = result;

  expect(data.getWelcomeMessages).toBeArrayOfSize(2);
});
