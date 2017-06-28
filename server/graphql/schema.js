// Build Schema for the application's GraphQL endpoint.

const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Query {
    test: String
  }
`);
