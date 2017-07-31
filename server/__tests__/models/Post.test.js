const Post = require('../../models/Post');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const db = require('../../config/db');

describe('Post Model', () => {

  const clearPosts = () => Post.find({}).remove();
  const clearComments = () => Comment.find({}).remove();

  const makePost = (type) => new Post({
    title: 'Test Post',
    postType: type
  });

  beforeAll((done) => {
    clearPosts()
    .then(() => clearComments())
    .then(() => done());
  });

  afterEach((done) => {
    clearPosts()
    .then(() => clearComments())
    .then(() => done());
  });

  afterAll((done) => {
    db.close()
    .then(() => done());
  });

  it('exists', () => {
    expect(new Post()).toBeTruthy();
  });

  it('Is valid with a type of "image" and a valid imageLink', () => {
    const newPost = makePost('image');
    newPost.imageLink = 'http://example.com/placeholderLink.png';
    return newPost.validate();
  });

  it('Is invalid with a type of "image" with no imageLink', () => {
    expect.assertions(1);
    const newPost = makePost('image');
    return newPost.validate().catch(e => {
      expect(e).toBeDefined();
    });
  });

  it('Can create a new image post, given a user and an options object', () => {
    const testUser = new User();
    const options = {
      title: 'My Created Post',
      description: 'A test description for a test post',
      link: 'http://example.com/placeholderLink.png'
    };
    return Post.createUserPost(testUser, options)
    .then(post => {
      expect(post.createdBy.equals(testUser)).toBe(true);
      expect(post.postType).toBe('image');
      expect(post.title).toBe(options.title);
      expect(post.description).toBe(options.description);
      expect(post.imageLink).toBe(options.link);
    });
  });


  it('Can create a new youtube post with a user and an options object', () => {
    const testUser = new User();
    const options = {
      title: 'My Created Post',
      description: 'A test description for a test post',
      link: 'https://www.youtube.com/watch?v=xxxxxxxxxxx'
    };
    return Post.createUserPost(testUser, options)
    .then(post => {
      expect(post.createdBy.equals(testUser)).toBe(true);
      expect(post.postType).toBe('youtube');
      expect(post.title).toBe(options.title);
      expect(post.description).toBe(options.description);
      expect(post.youtubeID).toBe('xxxxxxxxxxx');
    });
  });

  it('Can add a new comment by a user', () => {
    return Post.create({
      title: 'Test Post',
      postType: 'image',
      imageLink: 'http://example.com/img.png'
    })
    .then(post => {
      const user = new User();
      return post.addComment(user, 'Test Comment')
      .then(comment => {
        return post.comments({})
        .then(comments => {
          expect(comments).toHaveLength(1);
          expect(comments[0].text).toBe('Test Comment');
        });
      });
    });
  });

  it('Can record a like by a given user', () => {
    return Post.create({
      title: 'Test Post',
      postType: 'image',
      imageLink: 'http://example.com/img.png'
    })
    .then(post => {
      expect(post.likes).toHaveLength(0);
      const user = new User();
      return post.addLike(user)
      .then(post => {
        expect(post.likes).toHaveLength(1);
        const like = post.likes[0];
        expect(like.equals(user.id));
      });
    });
  });

  it('Will not record multiple likes by the same user', () => {
    const user = new User();
    return Post.create({
      title: 'Test Post',
      postType: 'image',
      imageLink: 'http://example.com/img.png',
      likes: [user]
    })
    .then(post => {
      return post.addLike(user)
      .then(result => {
        expect(result).toBeNull();
      });
    });
  });

  it('Can remove a like from a given user', () => {
    const user = new User();
    const userTwo = new User();
    return Post.create({
      title: 'Test Post',
      postType: 'image',
      imageLink: 'http://example.com/img.png',
      likes: [user, userTwo]
    })
    .then(post => {
      expect(post.likes).toHaveLength(2);
      return post.removeLike(user)
      .then(post => {
        expect(post.likes).toHaveLength(1);
        expect(post.likes[0].id).toBe(userTwo.id);
      });
    });
  });

  it('Can be deleted by its creator', () => {
    const user = new User();
    return Post.create({
      title: 'Test Post',
      postType: 'image',
      imageLink: 'http://example.com/img.png',
      createdBy: user
    })
    .then(post => {
      return Post.find({}).count()
      .then(count => {
        expect(count).toBe(1);
        return post.deleteIfUserAllowed(user)
        .then(result => {
          expect(result).toBe(true);
          return Post.find({}).count()
          .then(count => {
            expect(count).toBe(0);
          });
        });
      });
    });
  });

  it('Cannot be deleted by a different user (non-admin)', () => {
    const user = new User();
    const otherUser = new User();
    return Post.create({
      title: 'Test Post',
      postType: 'image',
      imageLink: 'http://example.com/img.png',
      createdBy: otherUser
    })
    .then(post => {
      return Post.find({}).count()
      .then(count => {
        expect(count).toBe(1);
        return post.deleteIfUserAllowed(user)
        .then(result => {
          expect(result).toBe(false);
          return Post.find({}).count()
          .then(count => {
            expect(count).toBe(1);
          });
        });
      });
    });
  });

  it('Can be deleted by an admin, regardless of ownership', () => {
    const user = new User({
      hasAdmin: true
    });
    const otherUser = new User();
    return Post.create({
      title: 'Test Post',
      postType: 'image',
      imageLink: 'http://example.com/img.png',
      createdBy: otherUser
    })
    .then(post => {
      return Post.find({}).count()
      .then(count => {
        expect(count).toBe(1);
        return post.deleteIfUserAllowed(user)
        .then(result => {
          expect(result).toBe(true);
          return Post.find({}).count()
          .then(count => {
            expect(count).toBe(0);
          });
        });
      });
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

  it('Correctly queries for the "creator" virtual field and yields a promise', () => {
    return User.create({
      auth: {
        local: {username: 'TestUser', password: '123456'}
      }
    })
    .then(user => {
      const post = makePost('image');
      post.imageLink = 'http://example.com/img.png';
      post.createdBy = user;
      return post.save()
      .then(post => {
        return post.creator
        .then(creator => {
          expect(creator.id).toBe(user.id);
        });
      });
    });
  });

  it('Has a "postDate" virtual field that formats createdAt', () => {
    const moment = require('moment');
    const date = Date.now();
    const post = new Post();
    post.createdAt = date;
    expect(post.postDate).toBe(moment(date).format('MMMM Do YYYY'));
  });

  it('Has a "commentCount" virtual field that returns the number of comments', () => {
    const post = new Post();
    return post.commentCount
    .then(count => {
      expect(typeof count).toBe('number');
    });
  });

  it('Has a "likeCount" virtual field that returns the number of likes', () => {
    const post = new Post();
    post.likes = [1,2,3].map(i => new User());
    expect(post.likeCount).toBe(3);
  });

});
