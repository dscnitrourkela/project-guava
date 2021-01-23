import { expect } from '@jest/globals';
import { graphql } from 'graphql';

import schema from '../../graphql/index.js';
// import { Welcome } from '../../models/index.js';
import { beforeTest, afterTest } from '../../utils/mongoMemoryServer.js';

beforeEach(async () => {
  await beforeTest();
});
afterEach(async () => {
  await afterTest();
});
jest.setTimeout(600000);

it('should create a new welcome message document', async () => {
  // const welcome = new Welcome({
  //   message: 'This is test message!',
  //   status: 200,
  // });
  // await welcome.save();

  //language=GraphQL
  const query = `
    mutation {
      addNewWelcomeMessage(message: "This is a test Message", status: 200) {
        message,
        status
      }
    }
  `;

  const rootValue = {};
  const result = await graphql(schema, query, rootValue);
  const { data } = result;

  expect(data.addNewWelcomeMessage.message).toBe('This is a test Message');
  expect(data.addNewWelcomeMessage.status).toBe(200);
});
