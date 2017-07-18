const typeDefs = `
type User {
  id: ID!
  username: String!
}

type Query {
  currentUser: User
  user(id: ID!): User
}

type Mutation {
  login(username: String!, password: String!): User
  logout: Boolean
}
`;


module.exports = typeDefs;
