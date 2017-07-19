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
      done();
    //   User.create({auth: {local: {username: 'testUser', password: '123456'}}})
    //   .then(user => {
    //     request(app)
    //     .post('/api')
    //     .send({
    //       query: `
    //         query {
    //           user(id: ${user.id}) {
    //             id
    //           }
    //         }
    //       `
    //     })
    //     .expect(200)
    //     .end((err, res) => {
    //       if (err) { throw err }
    //       console.log(res);
    //       done();
    //     })
    //   })
    //   .catch(err => { throw err });
    })
});
