require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

//database Connection
require('./app/config/dbconnect')();

app.use(cors());
app.use(express.json());
require('./app/router/index')(app);

const server = app.listen(port, _ => {
   console.log(`Listening at port ${port}`);
});

module.exports = server;
