const port = process.env.HTTPLOGGER_PORT || 8100;
const fs = require('fs');
const path = require('path')
const express = require('express');
const morgan = require('morgan');
const app = express();

// Log Levels
const LEVEL_COMBINED = 'combined';
const LEVEL_DEV = 'dev';
const LEVEL_CUSTOM = morgan['combined'] + ' :headers :query';

const level = LEVEL_CUSTOM;

morgan.token('headers', function getId (req) {
  return (JSON.stringify(req.headers));
})

morgan.token('query', function getId (req) {
  return (JSON.stringify(req.query));
})

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(morgan(level, { stream: accessLogStream }));

app.post('/', function (req, res) {
  respond(req, res);
});

app.get('/', function (req, res) {
  respond(req, res);
});

function respond(req, res) {
  res.send('hello, world!')
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
