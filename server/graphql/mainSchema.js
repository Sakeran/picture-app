// Build Schema for the application's GraphQL endpoint.

const { buildSchema } = require('graphql');

const topLevel = `
  type Mutation {
    signup(username: String!, password: String!, passwordConfirm: String!): String
    login(username: String!, password: String!): String
  }

  type Query {
    currentUser: User
    user(id: String!): User!
  }
`;

const combinedSchema = [
  topLevel,
  require('./schemas/userSchema')
]
.join('\n');

module.exports = buildSchema(combinedSchema);
