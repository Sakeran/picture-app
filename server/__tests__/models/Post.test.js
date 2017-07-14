const Post = require('../../models/Post');
const User = require('../../models/User');
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
    .catch(err => console.log(err))
    .then(() => {
      db.close()
      .catch(err => console.log(err))
      .then(() => done());
    });
  });

  it('exists', () => {
    expect(new Post()).toBeTruthy();
  });

  it('Is valid with a type of "image" and a valid imageLink', (done) => {
    const newPost = makePost('image');
    newPost.imageLink = 'http://example.com/placeholderLink.png';
    newPost.validate()
    .then(() => true)
    .catch(err => console.log(err), false)
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

  it('Can create a new image post with a user and an options object', (done) => {
    const testUser = new User();
    const options = {
      postType: "image",
      title: 'My Created Post',
      description: 'A test description for a test post',
      imageLink: 'http://example.com/placeholderLink.png'
    };
    Post.createUserPost(testUser, options)
    .then(post => {
      expect(post.createdBy.equals(testUser)).toBe(true);
      expect(post.postType).toBe(options.postType);
      expect(post.title).toBe(options.title);
      expect(post.description).toBe(options.description);
      expect(post.imageLink).toBe(options.imageLink);
      return true;
    })
    .catch(err => false)
    .then(status => {
      expect(status).toBeTruthy();
      done();
    });
  });

  it('Can create a new youtube post with a user and an options object', (done) => {
    const testUser = new User();
    const options = {
      postType: "youtube",
      title: 'My Created Post',
      description: 'A test description for a test post',
      youtubeID: 'xxxxxxxxxxx'
    };
    Post.createUserPost(testUser, options)
    .then(post => {
      expect(post.createdBy.equals(testUser)).toBe(true);
      expect(post.postType).toBe(options.postType);
      expect(post.title).toBe(options.title);
      expect(post.description).toBe(options.description);
      expect(post.youtubeID).toBe(options.youtubeID);
      return true;
    })
    .catch(err => false)
    .then(status => {
      expect(status).toBeTruthy();
      done();
    });
  });

});
