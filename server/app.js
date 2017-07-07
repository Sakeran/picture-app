const express = require('express');
const session = require('express-session');
const passport = require('passport');
const graphqlHTTP = require('express-graphql');
const logger = require('morgan');
const app = express();

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
const appSchema = require('./graphql/mainSchema');
const root = require('./graphql/resolvers/root');

app.use('/api', graphqlHTTP({
  schema: appSchema,
  rootValue: root,
  graphiql: true // For now
}))

app.use((req, res) => res.end('Coming Soon!'));

module.exports = app;
