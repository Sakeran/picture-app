const Post = require('../../models/Post');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const db = require('../../config/db');

describe('Comment mode', () => {
  const clearComments = () => Comment.find({}).remove();

  beforeAll((done) => {
    done();
  });

  afterEach((done) => {
    clearComments()
    .then(() => done());
  });

  afterAll((done) => {
    db.close()
    .then(() => done());
  });

  it("Can be deleted by the user that created it", () => {
    const user = new User();
    const post = new Post();
    return Comment.create({
      user,
      post,
      text: 'Test Comment',
    })
    .then(comment => {
      comment.deleteIfUserAllowed()
      .then(res => {
        expect(res).toBe(true);
        return Comment.findById(comment.id)
        .then(comment => {
          expect(comment.text).not.toBe('Test Comment');
        });
      });
    });
  });

  it('Cannot be deleted by a non-admin user who did not create it', () => {
    const user = new User();
    const otherUser = new User();
    const post = new Post();
    return Comment.create({
      user: otherUser,
      post,
      text: 'Test Comment'
    })
    .then(comment => {
      comment.deleteIfUserAllowed()
      .then(res => {
        expect(res).toBe(false);
        return Comment.findById(comment.id)
        .then(comment => {
          expect(comment.text).toBe('Test Comment');
        });
      });
    });
  });

  it('Can be deleted by an admin user', () => {
    const user = new User({hasAdmin: true});
    const otherUser = new User();
    const post = new Post();
    return Comment.create({
      user: otherUser,
      post,
      text: 'Test Comment',
    })
    .then(comment => {
      comment.deleteIfUserAllowed(user)
      .then(res => {
        expect(res).toBe(true);
        return Comment.findById(comment.id)
        .then(comment => {
          expect(comment.text).not.toBe('Test Comment');
        });
        });
    });
  });

});
