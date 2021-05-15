const express = require('express');
var db = require('./db/index.js');
const server = require('./server/index');
var logger = require('morgan')

const app = express();

const port = 3000;

app.use(express.json());

app.use(logger('dev'));

app.use('/', server);

app.get('/', (req, res) => res.status(200).json({ message: 'Hello World' }))

app.use('/', express.static(`${__dirname}/loader`));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))