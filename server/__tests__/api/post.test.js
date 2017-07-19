const request = require('supertest');
const app = require('../../app');
const passportStub = require('passport-stub');
const Post = require('../../models/Post');
const User = require('../../models/User');
let db;

const clearAllPosts = () => Post.find({}).remove();

const createPost = (options={}) => Post.create({
  title: options.title || 'Test Post',
  postType: options.postType || 'image',
  imageLink: options.imageLink || 'http://example.com/img.png',
  youtubeID: options.youtubeID || 'xxxxxxxxxxx',
  description: options.description || 'A test post',
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
    .then(() => done());
  });

  afterAll((done) => {
    db.close()
    .then(() => done());
  })

  it('Can query for an existing post', (done) => {
    createPost()
    .then(post => {
      request(app)
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
      .end((err, res) => {
        if (err) { throw err; }
        const result = JSON.parse(res.text);
        expect(result.data.post.id).toBe(post.id);
        done();
      });
    })
    .catch(err => { throw err });
  });

  it('Can query the number of total posts', (done) => {
    createManyPosts(3)
    .then(() => {
      request(app)
      .post('/api')
      .send({
        query: `
          query {
            totalPosts
          }
        `
      })
      .expect(200)
      .end((err, res) => {
        if (err) { throw err; }
        const result = JSON.parse(res.text);
        expect(result.data.totalPosts).toBe(3);
        done();
      });
    })
  });

  it('Cannot create a post while not logged in', (done) => {
    request(app)
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
    .end((err, res) => {
      if (err) { throw err; }
      const result = JSON.parse(res.text);
      expect(result.data.newPost).toBeNull();
      Post.find({}).count()
      .then(count => {
        expect(count).toBe(0);
        done();
      })
      .catch(err => { throw err });
    });
  });

  it('Can create a post while logged in', () => {
    const user = new User();
    passportStub.login(user);
    request(app)
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
    .end((err, res) => {
      if (err) { throw err }
      const result = JSON.parse(res.text);
      expect(result.data.newPost).not.toBeNull();
      expect(result.data.newPost.id).not.toBeNull();
      Post.find({}).count()
      .then(count => {
        expect(count).toBe(1);
        done();
      })
      .catch(err => { throw err });
    })

  })
})
