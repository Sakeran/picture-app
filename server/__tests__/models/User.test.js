const User = require('../../models/User');

let db;
describe('User Model', () => {

  beforeAll(() => {
    db = require('../../config/db');
  });

  afterAll((done) => {
    User.find({}).remove()
    .then(() => {
      db.close()
      .then(() => {
        done();
      });
    });
  });

  it('exists', () => {
    expect(new User()).toBeTruthy();
  });

  it('is invalid without at least one auth field', (done) => {
    const user = new User();
    user.validate()
    .then(() => false)
    .catch(() => true)
    .then(passes => {
      expect(passes).toBeTruthy();
      done();
    });
  });

  it('is valid with only the auth.local field set', (done) => {
    const user = new User();
    user.auth.local.username = 'testUser';
    user.auth.local.password = 'testPassword';
    user.validate()
    .then(() => true)
    .catch(() => false)
    .then(passes => {
      expect(passes).toBeTruthy();
      done();
    });
  });
  
  it('is valid with only the auth.twitter field set', (done) => {
    const user = new User();
    user.auth.twitter.id = '111111111';
    user.validate()
    .then(() => true)
    .catch(() => false)
    .then(passes => {
      expect(passes).toBeTruthy();
      done();
    });
  });
});
