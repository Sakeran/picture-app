const http = require('http');
const app = require('./app');
const db = require('./config/db');

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
