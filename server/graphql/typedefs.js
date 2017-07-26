const typeDefs = `
type User {
  id: ID!
  username: String!
  likesPost(postId: ID!): Boolean
  profile: Profile!
}

type Profile {
  name: String
  location: String
  bio: String
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
  comments(offset: Int, limit: Int): [Comment]
}

type Comment {
  id: ID!
  user: User!,
  post: Post!,
  text: String!
  date: String!
}

type Query {
  currentUser: User
  user(id: ID!): User
  totalPosts: Int
  post(id: ID!): Post
  listPosts(offset: Int, limit: Int): [Post]
  comments(postId: ID!, offset: Int, limit: Int): [Comment]
}

type Mutation {
  login(username: String!, password: String!): User
  logout: Boolean,
  signup(username: String!, password: String!, passwordConfirm: String!): User
  editProfile(name: String, location: String, bio: String): User
  newPost(title: String!, description: String, link: String!): Post
  likePost(postId: ID!): Post
  unlikePost(postId: ID!): Post
  addComment(postId: ID!, message: String!): Comment
}
`;


module.exports = typeDefs;
