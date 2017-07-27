// Initialize environment variables
require('dotenv').config({path: 'server/.env'});

const http = require('http');
const app = require('./server/app');
const express = require('express');
const db = require('./server/config/db');

// Set static files, and resolve all get requests to index.html
app.use('/', express.static('build'));
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

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
