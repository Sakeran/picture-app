const User = require('../../models/User');
const Post = require('../../models/Post');
const request = require('supertest');
const passportStub = require('passport-stub');
const app = require('../../app');

let db;

describe('User graphql endpoints', () => {
    const clearUsers = () => User.find({}).remove();
    const clearPosts = () => Post.find({}).remove();

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
      .then(() => clearPosts())
      .then(() => done());
    });

    afterAll((done) => {
      db.close()
      .then(() => done());
    });

    it('Can query data for a specific user', () => {
      return User.create({
        auth: {
          local: {
            username: 'testUser',
            password: '123456'
          }
        }
      })
      .then(user => {
        return request(app)
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
        .expect(200)
        .then(res => {
          const result = JSON.parse(res.text);
          expect(result.data.user.id).toBe(user.id);
        });
      });
    });

    it('Can create a new user from valid credentials', () => {
      return request(app)
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
      .then(res => {
        let result = JSON.parse(res.text);
        expect(result.data.signup).not.toBe(null);
        return User.find({}).count()
        .then(count => {
          expect(count).toBe(1);
        });
      });
    });

    it('Does not create a user when given a too-short password', () => {
      return request(app)
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
      .then(res => {
        let result = JSON.parse(res.text);
        expect(result.data.signup).toBeNull();
        return User.find({}).count()
        .then(count => {
          expect(count).toBe(0);
        });
      });
    });

    it('Does not create a user when given a blank username', () => {
      return request(app)
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
      .then(res => {
        let result = JSON.parse(res.text);
        expect(result.data.signup).toBeNull();
        return User.find({}).count()
        .then(count => {
          expect(count).toBe(0);
        });
      });
    });

    it('Does not create a user with an already-existing username', () => {
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
      // Creates a user given the above query.
      const mutation = () => {
        return request(app)
        .post('/api')
        .send(queryData)
        .expect(200);
      };

      return mutation()
      .then(res => {
        const result = JSON.parse(res.text);
        expect(result.data.signup).not.toBeNull();
        // Simulate logout to reset session
        passportStub.logout();
        return User.find({}).count()
        .then(count => {
          expect(count).toBe(1);
          return mutation()
          .then(res => {
            const result = JSON.parse(res.text);
            expect(result.data.signup).toBeNull();
            return User.find({}).count()
            .then(count => {
              expect(count).toBe(1);
            });
          });
        });
      });
    });

    it('Can log out a user', () => {
      passportStub.login({userData: 'some user'});
      return request(app)
      .post('/api')
      .send({
        query: `mutation { logout }`
      })
      .expect(200)
      .then(res => {
        const result = JSON.parse(res.text);
        expect(result.data.logout).toBe(true);
      });
    });

    it('Can log an existing user in, given correct credentials', () => {
      return User.newUser("logMeIn", "123456", "123456")
      .then(user => {
        return request(app)
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
        .then(res => {
          const result = JSON.parse(res.text);
          expect(result.data.login.id).toBe(user.id);
        });
      });
    });

    it('Will not log in an existing user if given the wrong password', () => {
      return User.newUser("logMeIn", "123456", "123456")
      .then(() => {
        return request(app)
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
        .then(res => {
          const result = JSON.parse(res.text);
          expect(result.data.login).toBeNull();
        });
      });
    });

    it('Can edit a user profile', () => {
      return User.create({
        auth: {
          local: {
            username: 'Test User',
            password: 'password'
          }
        },
        profile: {
          name: 'User Name 1',
          location: 'Location 1',
          bio: 'Bio 1'
        }
      })
      .then(user => {
        passportStub.login(user);
        return request(app)
        .post('/api')
        .send({
          query: `mutation editProfile($name: String, $location: String, $bio: String) {
            editProfile(name: $name, location: $location, bio: $bio) {
              profile {
                name
                location
                bio
              }
            }
          }`,
          operationName: 'editProfile',
          variables: {
            name: 'User Name 2',
            location: 'Location 2',
            bio: 'Bio 2'
          }
        })
        .expect(200)
        .then(res => {
          const result = JSON.parse(res.text);
          expect(result.data.editProfile).toBeTruthy();
        });
      });
    });

    it('Can get its admin status if the logged-in user has admin', () => {
      return User.create({
        auth: {
          local: {
            username: 'Admin',
            password: 'password'
          }
        },
        hasAdmin: true
      })
      .then(user => {
        passportStub.login(user);
        return request(app)
        .post('/api')
        .send({
          query: `query getAdminStatus {
            currentUser {
              id
              isAdmin
            }
          }`,
          operationName: 'getAdminStatus'
        })
        .expect(200)
        .then(res => {
          const { data: { currentUser: { isAdmin } } } = JSON.parse(res.text);
          expect(isAdmin).not.toBeUndefined();
          expect(isAdmin).toBe(true);
        });
      });
    });

    it('Can get its admin status while logged in as a non-admin user', () => {
      return User.create({
        auth: {
          local: {
            username: 'Not Admin',
            password: 'password'
          }
        }
      })
      .then(user => {
        passportStub.login(user);
        return request(app)
        .post('/api')
        .send({
          query: `query getAdminStatus {
            currentUser {
              id
              isAdmin
            }
          }`,
          operationName: 'getAdminStatus'
        })
        .expect(200)
        .then(res => {
          const { data: { currentUser: { isAdmin } } } = JSON.parse(res.text);
          expect(isAdmin).not.toBeUndefined();
          expect(isAdmin).toBe(false);
        });
      });
    });
});
