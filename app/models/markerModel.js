const mongoose = require('mongoose');
const Double = require('@mongoosejs/double');

const markerSchema = new mongoose.Schema({
        lat: {
            type: Double,
            required: true
        },
        lng: {
            type: Double,
            required: true
        },
        label: {
            type: String,
            required: false,
            trim: true
        }
});

const Marker = mongoose.model('Marker', markerSchema);

module.exports = {Marker, markerSchema};
