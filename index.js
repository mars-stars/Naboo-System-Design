const express = require('express');
var db = require('./db/index.js');
const server = require('./server/index');

const app = express();

const port = 3000;

app.use(express.json());

app.use('/', server);

app.get('/', (req, res) => res.json({ message: 'Hello World' }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))