describe('User Model', () => {
  let db;
  const User = require('../../models/User');

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
    .then(() => {
      // This shouldn't happen.
      throw new Error('Does not validate empty auth fields correctly.');
    })
    .catch(err => {
      done();
    });
  });

  it('is valid with only the auth.local field set', (done) => {
    const user = new User();
    user.auth.local.username = 'testUser';
    user.auth.local.password = 'testPassword';
    user.validate()
    .then(() => {
      done();
    });
  });
});
