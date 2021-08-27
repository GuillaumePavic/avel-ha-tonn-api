const mongoose = require('mongoose');

const DB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;

module.exports = function() {
    mongoose.connect(DB_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log("Connected to mongoDb..."))
    .catch(err => console.log("Could not connect to MongoDb...", err));
};