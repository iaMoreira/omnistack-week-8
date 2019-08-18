const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes')
const cors = require('cors')
const server = express()
const port = 3333

mongoose.connect(
    'mongodb://localhost:27017/tindev',
    {useNewUrlParser: true}
);
server.use(cors());
server.use(express.json());
server.use(routes);
server.listen(port, () => console.log(`Example app listening on port 3333!`))
