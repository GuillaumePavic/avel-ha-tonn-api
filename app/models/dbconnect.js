const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("Connected to mongoDb..."))
    .catch(err => console.log("Could not connect to MongoDb...", err));
};