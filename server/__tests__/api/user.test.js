const User = require('../../models/User');
const request = require('supertest');
const passportStub = require('passport-stub');
const app = require('../../app');

let db;

describe('User graphql endpoints', () => {
    const clearUsers = () => User.find({}).remove();

    beforeAll((done) => {
      db = require('../../config/db');
      passportStub.install(app);
      clearUsers()
      .then(() => done());
    });

    beforeEach(() => {
      passportStub.logout();
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

    it('Can query data for a specific user', (done) => {
      // done();
      User.create({auth: {local: {username: 'testUser', password: '123456'}}})
      .then(user => {
        request(app)
        .post('/api')
        .send({
          query: `
            query {
              user(id:"${user.id}") {
                id
              }
            }
          `
        })
        // .expect(200)
        .end((err, res) => {
          if (err) { throw err }
          const result = JSON.parse(res.text);
          expect(result.data.user.id).toBe(user.id);
          done();
        })
      })
      .catch(err => { throw err });
    });

      it('can create a new user with valid credentials', (done) => {
        request(app)
        .post('/api')
        .set('Content-Type', 'application/json')
        .send({
          query: `mutation SignUp($un: String!, $pw: String!, $pwc: String!) {
            signup(username: $un, password: $pw, passwordConfirm: $pwc) {
              id
            }
          }`,
          operationName: 'SignUp',
          variables: {
            un: 'validUser',
            pw: '123456',
            pwc: '123456'
          }
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          let result = JSON.parse(res.text);
          expect(result.data.signup).not.toBe(null);
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
            signup(username: $un, password: $pw, passwordConfirm: $pwc) {
              id
            }
          }`,
          operationName: 'SignUp',
          variables: {
            un: 'invalidUser',
            pw: '12345',
            pwc: '12345'
          }
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          let result = JSON.parse(res.text);
          expect(result.data.signup).toBeNull();
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
            signup(username: $un, password: $pw, passwordConfirm: $pwc) {
              id
            }
          }`,
          operationName: 'SignUp',
          variables: {
            un: '',
            pw: '123456',
            pwc: '123456'
          }
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          let result = JSON.parse(res.text);
          expect(result.data.signup).toBeNull();
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
            signup(username: $un, password: $pw, passwordConfirm: $pwc) {
              id
            }
          }`,
          operationName: 'SignUp',
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
          expect(result.data.signup).not.toBeNull();
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
              expect(result.data.signup).toBeNull();
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

      it('can be used to log a user out', (done) => {
        passportStub.login({userData: 'some user'});
        request(app)
        .post('/api')
        .send({
          query: `mutation { logout }`
        })
        .expect(200)
        .end((err, res) => {
          if (err) { throw err }
          const result = JSON.parse(res.text);
          expect(result.data.logout).toBe(true);
          done();
        });
      });

      it('can log an existing user in', (done) => {
        User.newUser("logMeIn", "123456", "123456")
        .then(user => {
          request(app)
          .post('/api')
          .send({
            query: `mutation LogIn($un: String!, $pw: String!) {
              login(username: $un, password: $pw) {
                id
              }
            }`,
            operationName: 'LogIn',
            variables: {
              un: 'logMeIn',
              pw: '123456'
            }
          })
          .expect(200)
          .end((err, res) => {
            if (err) { throw err }
            const result = JSON.parse(res.text);
            expect(result.data.login.id).toBe(user.id);
            done();
          });
        })
        .catch(err => { throw err });
      });

      it('will not log in an existing user with the wrong password', (done) => {
        User.newUser("logMeIn", "123456", "123456")
        .then(() => {
          request(app)
          .post('/api')
          .send({
            query: `mutation LogIn($un: String!, $pw: String!) {
              login(username: $un, password: $pw) {
                id
              }
            }`,
            operationName: 'LogIn',
            variables: {
              un: 'logMeIn',
              pw: '654321'
            }
          })
          .expect(200)
          .end((err, res) => {
            if (err) { throw err }
            const result = JSON.parse(res.text);
            expect(result.data.login).toBeNull();
            done();
          });
        })
        .catch(err => { throw err });
      })
});
