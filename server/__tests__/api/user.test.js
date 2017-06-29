const { graphql } = require('graphql');

describe('User endpoint', () => {
  let db;
  let User;
  let schema;
  let root;

  beforeAll(() => {
    db = require('../../config/db');
    User = require('../../models/User');
    schema = require('../../graphql/mainSchema');
    root = require('../../graphql/resolvers/root');
  });

  afterEach((done) => {
    User.find({}).remove()
    .then(() => done());
  });

  afterAll((done) => {
    User.find({}).remove()
    .then(() => {
      db.close()
      .then(() => done())
      .catch(err => {throw err});
    })
    .catch(err => {throw err});
  });

  it('can create a new user with valid credentials', (done) => {
    const query = `mutation {
      newUser(username:"validUser", password:"123456")
    }`;
    graphql(schema, query, root)
    .then(response => {
      expect(response.data.newUser).toBeNull();
      User.find({}).count()
      .then(count => {
        expect(count).toBe(1);
        done();
      })
      .catch(err => {
        throw err;
      })
    })
    .catch(err => {
      throw err;
    });
  });

  it('does not create a user with a too-short password', (done) => {
    const query = `mutation {
      newUser(username:"invalidUser", password:"12345")
    }`;
    graphql(schema, query, root)
    .then(response => {
      expect(response.data.newUser).not.toBeNull();
      User.find({}).count()
      .then(count => {
        expect(count).toBe(0);
        done();
      })
      .catch(err => {
        throw err;
      })
    })
    .catch(err => {
      throw err;
    });
  });

  it('does not create a user with a blank username', (done) => {
    const query = `mutation {
      newUser(username:"", password:"123456")
    }`;
    graphql(schema, query, root)
    .then(response => {
      expect(response.data.newUser).not.toBeNull();
      User.find({}).count()
      .then(count => {
        expect(count).toBe(0);
        done();
      })
      .catch(err => {
        throw err;
      })
    })
    .catch(err => {
      throw err;
    });
  });

});
