const express = require('express');
const session = require('express-session');
const passport = require('paspsort');
const graphqlHTTP = require('express-graphql');
const logger = require('morgan');
const app = express();

app.use(session({
  secret: 'livechatsecret',
  resave: true,
  saveUninitialized: false
}));

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));

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
