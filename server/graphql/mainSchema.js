// Build Schema for the application's GraphQL endpoint.

const { buildSchema } = require('graphql');

const topLevel = `
  type Mutation {
    signup(username: String!, password: String!, passwordConfirm: String!): String
    login(username: String!, password: String!): String
    logout: Boolean
    createPost(title: String!, link: String!, description: String): Boolean
  }

  type Query {
    currentUser: User
    user(id: String!): User
    post(id: String!): Post
    posts(offset: Int, limit: Int, userID: String): [Post]
  }
`;

const combinedSchema = [
  topLevel,
  require('./schemas/userSchema'),
  require('./schemas/postSchema')
]
.join('\n');

module.exports = buildSchema(combinedSchema);
