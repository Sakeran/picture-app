const express = require('express');
const graphqlHTTP = require('express-graphql');
const logger = require('morgan');
const app = express();

app.use(logger('dev'));

// Define GraphQL endpoint
const appSchema = require('./graphql/mainSchema');
const root = require('./graphql/resolvers/root');

app.use('/api', graphqlHTTP({
  schema: appSchema,
  rootValue: root,
  graphiql: true // For now
}))

app.use((req, res) => res.end('Coming Soon!'));

module.exports = app;
