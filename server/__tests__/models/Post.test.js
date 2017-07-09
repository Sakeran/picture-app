const Post = require('../../models/Post');
const db = require('../../config/db');

describe('Post Model', () => {

  const clearPosts = () => Post.find({}).remove();

  const makePost = (type) => new Post({
    title: 'Test Post',
    postType: type
  });

  beforeAll((done) => {
    clearPosts()
    .then(() => done());
  });

  afterAll((done) => {
    clearPosts()
    .then(() => done());
  });

  it('exists', () => {
    expect(new Post()).toBeTruthy();
  });

  it('Is valid with a type of "image" and a valid imageLink', (done) => {
    const newPost = makePost('image');
    newPost.imageLink = 'http://localhost:3000/placeholderLink.png';
    newPost.validate()
    .then(() => true)
    .catch(() => false)
    .then(passes => {
      expect(passes).toBeTruthy();
      done();
    });
  });

  it('Is invalid with a type of "image" with no imageLink', (done) => {
    const newPost = makePost('image');
    newPost.validate()
    .then(() => false)
    .catch(() => true)
    .then(passes => {
      expect(passes).toBeTruthy();
      done();
    });
  });

  it('Is invalid with a type of "image" with an invalid imageLink', (done) => {
    const newPost = makePost('image');
    newPost.imageLink = 'http://localhost:3000/notAnImageExtension.txt';
    newPost.validate()
    .then(() => false)
    .catch(() => true)
    .then(passes => {
      expect(passes).toBeTruthy();
      done();
    });
  });

});
