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
      title: 'My Created Post',
      description: 'A test description for a test post',
      link: 'http://example.com/placeholderLink.png'
    };
    Post.createUserPost(testUser, options)
    .then(post => {
      expect(post.createdBy.equals(testUser)).toBe(true);
      expect(post.postType).toBe('image');
      expect(post.title).toBe(options.title);
      expect(post.description).toBe(options.description);
      expect(post.imageLink).toBe(options.link);
      return true;
    })
    .catch(err => console.log(err), false)
    .then(status => {
      expect(status).toBeTruthy();
      done();
    });
  });

  it('Can create a new youtube post with a user and an options object', (done) => {
    const testUser = new User();
    const options = {
      title: 'My Created Post',
      description: 'A test description for a test post',
      link: 'https://www.youtube.com/watch?v=xxxxxxxxxxx'
    };
    Post.createUserPost(testUser, options)
    .then(post => {
      expect(post.createdBy.equals(testUser)).toBe(true);
      expect(post.postType).toBe('youtube');
      expect(post.title).toBe(options.title);
      expect(post.description).toBe(options.description);
      expect(post.youtubeID).toBe('xxxxxxxxxxx');
      return true;
    })
    .catch(err => false)
    .then(status => {
      expect(status).toBeTruthy();
      done();
    });
  });

  it('Has a working "image" virtual field', () => {
    const postOne = makePost('image');
    postOne.imageLink = 'http://example.com/img.png';
    expect(postOne.image).toBe(postOne.imageLink);
    const postTwo = makePost('youtube');
    postTwo.youtubeID ='xxxxxxxxxxx';
    expect(postTwo.image).toContain(postTwo.youtubeID);
  });

  it('Has a working "type" virtual field', () => {
    const postOne = makePost('image');
    expect(postOne.type).toBe('image');
    const postTwo = makePost('youtube');
    expect(postTwo.type).toContain('youtube');
  });

  it('Correctly queries for the "creator" virtual field and yields a promise', (done) => {
    User.create({
      auth: {
        local: {username: 'TestUser', password: '123456'}
      }
    })
    .then(user => {
      const post = makePost('image');
      post.imageLink = 'http://example.com/img.png';
      post.createdBy = user;
      post.save()
      .then(post => {
        post.creator
        .then(creator => {
          expect(creator.id).toBe(user.id);
          done();
        })
      })
    })
    .catch(err => { throw err });
  });

  it('Has a "postDate" virtual field that formats createdAt', () => {
    const moment = require('moment');
    const date = Date.now();
    const post = new Post();
    post.createdAt = date;
    expect(post.postDate).toBe(moment(date).format('MMMM Do YYYY'));
  })

});
