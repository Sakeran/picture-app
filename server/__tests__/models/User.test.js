const User = require('../../models/User');
const Post = require('../../models/Post');

let db;
describe('User Model', () => {

  beforeAll(() => {
    db = require('../../config/db');
  });

  afterAll((done) => {
    User.find({}).remove()
    .then(() => Post.find({}).remove())
    .then(() => db.close())
    .then(() => done());
  });

  it('exists', () => {
    expect(new User()).toBeTruthy();
  });

  it('is invalid without at least one auth field', () => {
    const user = new User();
    expect.assertions(1);
    return user.validate().catch(e => {
      expect(e).toBeDefined();
    });
  });

  it('is valid with only the auth.local field set', () => {
    const user = new User();
    user.auth.local.username = 'testUser';
    user.auth.local.password = 'testPassword';
    return user.validate();
  });

  it('is valid with only the auth.twitter field set', () => {
    const user = new User();
    user.auth.twitter.id = '111111111';
    return user.validate();
  });

  it('Can get an array of its own posts in reverse chronological order', () => {
    const user = new User();
    const otherUser = new User();
    return Promise.all(
      [1,2,3,4,5,6].map(i => Post.create({
        title: 'Test Post ' + i,
        postType: 'image',
        imageLink: 'http://example.com/img.png',
        // First user has every odd-indexed post.
        createdBy: (i % 2) ? user : otherUser
      }))
    )
    .then(() => {
      return user.posts({})
      .then(posts => {
        expect(posts).toHaveLength(3);
        const [post1, post2, post3] = posts;
        expect(post1.title).toBe('Test Post 5');
        expect(post2.title).toBe('Test Post 3');
        expect(post3.title).toBe('Test Post 1');
      });
    });
  });

  it('Can get a count of its own posts', () => {
    const user = new User();
    return Promise.all(
      [1,2,3].map(i => Post.create({
        title: 'Test Post ' + i,
        postType: 'image',
        imageLink: 'http://example.com/img.png',
        createdBy: user
      }))
    )
    .then(() => {
      return user.postCount
      .then(count => {
        expect(count).toBe(3);
      });
    });
  });
});
