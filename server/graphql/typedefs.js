const typeDefs = `
type User {
  id: ID!
  username: String!
}

type Post {
  id: ID!
  creator: User
  title: String!
  description: String
  type: String!
  image: String
  youtubeID: String
  postDate: String!
  likeCount: Int!
  commentCount: Int!
}

type Query {
  currentUser: User
  user(id: ID!): User
  totalPosts: Int
  post(id: ID!): Post
  listPosts(offset: Int, limit: Int): [Post]
}

type Mutation {
  login(username: String!, password: String!): User
  logout: Boolean,
  signup(username: String!, password: String!, passwordConfirm: String!): User
  newPost(title: String!, description: String, link: String!): Post
  likePost(postId: ID!): Post
  unlikePost(postId: ID!): Post
  addComment(postId: ID!, message: String!): Post
}
`;


module.exports = typeDefs;
