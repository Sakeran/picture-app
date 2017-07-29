const request = require('supertest');
const app = require('../../app');
const passportStub = require('passport-stub');
const Post = require('../../models/Post');
const User = require('../../models/User');
let db;

const clearAllPosts = () => Post.find({}).remove();
const clearAllUsers = () => User.find({}).remove();

const createPost = (options={}) => Post.create({
  title: options.title || 'Test Post',
  postType: options.postType || 'image',
  imageLink: options.imageLink || 'http://example.com/img.png',
  youtubeID: options.youtubeID || 'xxxxxxxxxxx',
  description: options.description || 'A test post',
  likes: options.likes || [],
});

const createManyPosts = count => {
  const posts = [];
  for (let i = 0; i < (count || 1); i++) {
    posts.push(createPost({title: `Post ${i}`}));
  }
  return Promise.all(posts);
}

describe('Post endpoint', () => {

  beforeAll(() => {
    db = require('../../config/db');
    passportStub.install(app);
  });

  afterEach((done) => {
    clearAllPosts()
    .then(() => clearAllUsers())
    .then(() => done());
  });

  afterAll((done) => {
    db.close()
    .then(() => done());
  })

  it('Can query for an existing post', () => {
    return createPost()
    .then(post => {
      return request(app)
      .post('/api')
      .send({
        query: `
          query {
            post(id: "${post.id}") {
              id
            }
          }
        `
      })
      .expect(200)
      .then(res => {
        const result = JSON.parse(res.text);
        expect(result.data.post.id).toBe(post.id);
      });
    });
  });

  it('Can query the number of total posts', () => {
    return createManyPosts(3)
    .then(() => {
      return request(app)
      .post('/api')
      .send({
        query: `
          query {
            totalPosts
          }
        `
      })
      .expect(200)
      .then(res => {
        const result = JSON.parse(res.text);
        expect(result.data.totalPosts).toBe(3);
      });
    })
  });

  it('Cannot create a post without a logged-in user', () => {
    return request(app)
    .post('/api')
    .send({
      query: `
        mutation createPost($title: String!, $link: String!, $description: String) {
          newPost(title: $title, link: $link, description: $description) {
            id
          }
        }
      `,
      operationName: 'createPost',
      variables: {
        title: 'Illegal Post',
        link: 'http://example.com/img.png',
        description: 'A test post',
      }
    })
    .expect(200)
    .then(res => {
      const result = JSON.parse(res.text);
      expect(result.data.newPost).toBeNull();
      return Post.find({}).count()
      .then(count => {
        expect(count).toBe(0);
      });
    });
  });

  it('Can create a post with a logged-in user', () => {
      return User.create({
        auth: {
          local: {username: 'TestUser', password: '123456'}
        }
      })
      .then(user => {
        passportStub.login(user);
        return request(app)
        .post('/api')
        .send({
          query: `
          mutation createPost($title: String!, $link: String!, $description: String) {
            newPost(title: $title, link: $link, description: $description) {
              id
            }
          }
          `,
          operationName: 'createPost',
          variables: {
            title: 'Legal Post',
            link: 'http://example.com/img.png',
            description: 'A test post',
          }
        })
        .expect(200)
        .then(res => {
          const result = JSON.parse(res.text);
          expect(result.data.newPost).not.toBeNull();
          expect(result.data.newPost.id).not.toBeNull();
          return Post.find({}).count()
          .then(count => {
            expect(count).toBe(1);
          });
        });
      });
  });

  it('Can "like" a post with a logged-in user', () => {
    const user = new User;
    passportStub.login(user);
    return createPost()
    .then(post => {
      return request(app)
      .post('/api')
      .send({
        query: `
        mutation likePost($postId: ID!) {
          likePost(postId: $postId) {
            id
          }
        }
        `,
        operationName: 'likePost',
        variables: {
          postId: post.id
        }
      })
      .expect(200)
      .then(res => {
        const result = JSON.parse(res.text);
        expect(result.data.likePost.id).toBe(post.id);
      })
    });
  })

  it('Can remove a "like" with a logged-in user', () => {
    const user = new User();
    passportStub.login(user);
    return createPost({likes: [user]})
    .then(post => {
      return request(app)
      .post('/api')
      .send({
        query: `
        mutation unlikePost($postId: ID!) {
          unlikePost(postId: $postId) {
            id
          }
        }
        `,
        operationName: 'unlikePost',
        variables: {
          postId: post.id
        }
      })
      .expect(200)
      .then(res => {
        const result = JSON.parse(res.text);
        expect(result.data.unlikePost.id).toBe(post.id);
      });
    });
  });

  it('Can add a comment with a logged-in user', () => {
    const user = new User();
    passportStub.login(user);
    return createPost()
    .then(post => {
      return request(app)
      .post('/api')
      .send({
        query: `
        mutation addComment($postId: ID!, $message: String!) {
          addComment(postId: $postId, message: $message) {
            id
          }
        }
        `,
        operationName: 'addComment',
        variables: {
          postId: post.id,
          message: 'Test Comment'
        }
      })
      .expect(200)
      .then(res => {
        const result = JSON.parse(res.text);
        expect(result.data.addComment).not.toBeNull();
      });
    });
  });
})
