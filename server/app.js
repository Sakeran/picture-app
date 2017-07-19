const express = require('express');
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
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
         passport.authenticate('twitter', {failureRedirect: '/'}),
         (req, res, next) => { next() }
);

// Define GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress(req => ({
  schema,
  context: { req }
})));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

app.use((req, res) => res.end('Coming Soon!'));

module.exports = app;
