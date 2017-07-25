// Initialize environment variables
require('dotenv').config({path: 'server/.env'});

const http = require('http');
const app = require('./server/app');
const express = require('express');
const db = require('./server/config/db');

// Set static files
app.use('/', express.static('build'));

// Create Server
const server = http.createServer(app);

const port = process.env.PORT || 3000
server.listen(port, err => {
  if (err) {
    console.error(`Error while attempting to listen on port ${port}`);
    process.exit(1);
    return;
  }
  console.log(`Application listening on port ${port}`);
});
