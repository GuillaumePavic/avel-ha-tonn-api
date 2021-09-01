const mongoose = require('mongoose');

let DB_URI;
if(process.env.NODE_ENV === 'test') DB_URI = process.env.TEST_MONGO_URI_LOCAL;
if(process.env.NODE_ENV === 'development') DB_URI = process.env.MONGO_URI_LOCAL;
if(process.env.NODE_ENV === 'production') DB_URI = process.env.MONGODB_ATLAS;

module.exports = function() {
    mongoose.connect(DB_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log("Connected to mongoDb..."))
    .catch(err => console.log("Could not connect to MongoDb...", err));
};