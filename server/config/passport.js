const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/User');

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // Twitter Authentication
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
  },
  (token, tokenSecret, profile, cb) => {
    User.findOne({'auth.twitter.id': profile.id})
    .then(user => {
      if (user) {
        return cb(null, user);
      }
      const newUser = new User();
      newUser.auth.twitter.id = profile.id;
      newUser.profile.name = profile.displayName;
      newUser.profile.location = profile._json.location;
      newUser.profile.bio = profile._json.description;
      newUser.save()
      .then(() => cb(null, newUser))
      .catch(err => cb(err));
    })
    .catch(err => {
      cb(err);
    })
  }
  ));

}
