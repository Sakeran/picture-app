const express = require('express');

const app = express();

app.use((req, res) => res.end('Coming Soon!'));

module.exports = app;
