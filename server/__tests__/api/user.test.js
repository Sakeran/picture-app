const { graphql } = require('graphql');

describe('User endpoint', () => {
  let db;
  let User;
  let request;
  let passportStub;
  let app;

  const clearUsers = () => User.find({}).remove();

  beforeAll((done) => {
    db = require('../../config/db');
    User = require('../../models/User');
    app = require('../../app');
    request = require('supertest');
    passportStub = require('passport-stub');
    passportStub.install(app);
    clearUsers()
    .then(() => done());
  });

  afterEach((done) => {
    clearUsers()
    .then(() => done());
  });

  afterAll((done) => {
    clearUsers()
    .then(() => {
      db.close()
      .then(() => done());
    });
  });

  it('can create a new user with valid credentials', (done) => {
    request(app)
    .post('/api')
    .send({
      query: `mutation SignUp($un: String!, $pw: String!, $pwc: String!) {
        signup(username: $un, password: $pw, passwordConfirm: $pwc)
      }`,
      variables: {
        un: 'validUser',
        pw: '123456',
        pwc: '123456'
      }
    })
    .expect(200)
    .end((err, res) => {
      if (err) {
        throw new Error('Request error');
      }
      let result = JSON.parse(res.text);
      expect(result.data.signup).not.toBe('null');
      User.find({}).count()
      .then(count => {
        expect(count).toBe(1);
        done();
      })
      .catch(err => {throw err});
    });
  });

  it('does not create a user with a too-short password', (done) => {
    request(app)
    .post('/api')
    .send({
      query: `mutation SignUp($un: String!, $pw: String!, $pwc: String!) {
        signup(username: $un, password: $pw, passwordConfirm: $pwc)
      }`,
      variables: {
        un: 'invalidUser',
        pw: '12345',
        pwc: '12345'
      }
    })
    .expect(200)
    .end((err, res) => {
      if (err) {
        throw new Error('Request error');
      }
      let result = JSON.parse(res.text);
      expect(result.data.signup).toBe('null');
      User.find({}).count()
      .then(count => {
        expect(count).toBe(0);
        done();
      })
      .catch(err => {throw err});
    });
  });

  it('does not create a user with a blank username', (done) => {
    request(app)
    .post('/api')
    .send({
      query: `mutation SignUp($un: String!, $pw: String!, $pwc: String!) {
        signup(username: $un, password: $pw, passwordConfirm: $pwc)
      }`,
      variables: {
        un: '',
        pw: '123456',
        pwc: '123456'
      }
    })
    .expect(200)
    .end((err, res) => {
      if (err) {
        throw new Error('Request error');
      }
      let result = JSON.parse(res.text);
      expect(result.data.signup).toBe('null');
      User.find({}).count()
      .then(count => {
        expect(count).toBe(0);
        done();
      })
      .catch(err => {throw err});
    });
  });

  it('does not create a user with a duplicate username', (done) => {
    const queryData = {
      query: `mutation SignUp($un: String!, $pw: String!, $pwc: String!) {
        signup(username: $un, password: $pw, passwordConfirm: $pwc)
      }`,
      variables: {
        un: 'duplicateMe',
        pw: '123456',
        pwc: '123456'
      }
    };
    request(app)
    .post('/api')
    .send(queryData)
    .expect(200)
    .end((err, res) => {
      if (err) {
        throw err;
      }
      const result = JSON.parse(res.text);
      expect(result.data.signup).not.toBe('null');
      // Simulate logout to reset session
      passportStub.logout();
      User.find({}).count()
      .then(count => {
        expect(count).toBe(1);
        request(app)
        .post('/api')
        .send(queryData)
        .expect(200)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          const result = JSON.parse(res.text);
          expect(result.data.signup).toBe('null');
          User.find({}).count()
          .then(count => {
            expect(count).toBe(1);
            done();
          })
          .catch(err => { throw err });
        });
      })
      .catch(err => { throw err });
    });
  });

});
