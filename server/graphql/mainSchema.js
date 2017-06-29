// Build Schema for the application's GraphQL endpoint.

const { buildSchema } = require('graphql');

const topLevel = `
  type Mutation {
    newUser(username: String!, password: String!): Boolean
  }

  type Query {
    user(id: String!): User
  }
`;

const combinedSchema = [
  topLevel,
  require('./schemas/userSchema')
]
.join('\n');

module.exports = buildSchema(combinedSchema);
