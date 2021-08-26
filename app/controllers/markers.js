const generateData = require('../services/generateData');
const Marker = require('../models/markerModel');

exports.getMarkers = async (req, res) => {
    try {
        const markers = await Marker.find({});
        res.json(markers);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error server'});
    }
}

exports.getMarkerData = async (req, res) => {
    try {
        let markerId = req.params.id;

        const marker = await Marker.findById(markerId).lean();

        const data = await generateData(marker.lat, marker.lng);

        marker.data = data;

        res.json(marker);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error server'});
    }
}

