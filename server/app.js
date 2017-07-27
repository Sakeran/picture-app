const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
// const graphqlHTTP = require('express-graphql');
const {
  graphqlExpress,
  graphiqlExpress
} = require('graphql-server-express');
const logger = require('morgan');
const app = express();
const schema = require('./graphql/schema');

app.use(logger('dev'));

app.use(session({
  secret: 'livechatsecret',
  resave: true,
  saveUninitialized: false
}));

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Define Twitter authentication routes
const authRouter = express.Router();

authRouter.get('/twitter', passport.authenticate('twitter'));
authRouter.get('/twitter/callback',
         passport.authenticate('twitter', {failureRedirect: '/'}),
         (req, res, next) => { res.redirect('/'); }
);

app.use('/auth', authRouter);

// Define GraphQL endpoint
app.use('/api', bodyParser.json(), graphqlExpress(req => ({
  schema,
  context: { req }
})));
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev') {
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/api'
  }));
}

module.exports = app;
