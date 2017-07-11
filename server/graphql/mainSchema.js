// Build Schema for the application's GraphQL endpoint.

const { buildSchema } = require('graphql');

const topLevel = `
  type Mutation {
    signup(username: String!, password: String!, passwordConfirm: String!): String
    login(username: String!, password: String!): String
    logout: Boolean
    createPost(title: String!, type: String!, data: String!, description: String): Boolean
  }

  type Query {
    currentUser: User
    user(id: String!): User
    post(id: String!): Post
  }
`;

const combinedSchema = [
  topLevel,
  require('./schemas/userSchema'),
  require('./schemas/postSchema')
]
.join('\n');

module.exports = buildSchema(combinedSchema);
