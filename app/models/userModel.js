const mongoose = require('mongoose');
const {markerSchema} = require('./markerModel');

const validateRegex = (value) => {
    return /^[ a-zA-Z0-9\-_]{1,50}$/.test(value);
};

const customValidator = [validateRegex, 'Uh oh, {PATH} ne peut contenir que des lettres, des chiffres, des espaces ainsi que les symboles - et _'];

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
              return /^[ a-zA-Z0-9\-_]{1,50}$/.test(v);
            },
            message: props => `${props.value} is not a valid name!`
        },
        required: true,
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
              return /^[A-Za-z0-9+_.-]+@(.+)$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    markers: [markerSchema],
    active: {
        type: Boolean,
        default: false
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;