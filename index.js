const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');



const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    }));  

app.listen(5000, () => {
    console.log('now listening for requests on port 5000');
});