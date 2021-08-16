const router = require('./app/router/router');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(router);

const server = app.listen(port, _ => {
   console.log(`Listening at port ${port}`);
});

module.exports = server;
