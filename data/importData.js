const { Marker } = require('../app/models/markerModel');
const markers = require('./markers.json');

require('dotenv').config();
require('../app/config/dbconnect')();

async function importData() {
    
    for(let marker of markers) {
        await Marker.create({
            lat: marker.lat,
            lng: marker.lng,
            label: marker.label
        });
    }

    console.log('seeding done');
    process.exit(1);
}

importData();