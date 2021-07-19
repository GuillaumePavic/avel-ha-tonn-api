const generateData = require('../services/generateData');
const roundLatLng = require('../utils/roundLatLng');
const dataMapper = require('../dataMapper/dataMapper');

exports.getMarkers = (req, res) => {
    try {
        const markers = dataMapper.getMarkers();
        res.json(markers);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error server'});
    }
}

exports.getMarkerData = async (req, res) => {
    try {
        const markerId = req.params.id;
        
        const marker = await dataMapper.getMarker(markerId);

        const data = await generateData(marker.lat, marker.lng);

        marker.data = data;

        res.json(marker);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error server'});
    }
}

exports.searchData = async (req, res) => {
    try {
        const {lat, lng} = req.body;

        const data = await generateData(lat, lng);

        const marker = {
            lat: roundLatLng(lat),
            lng: roundLatLng(lng),
            data
        };

        res.json(marker);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error server'});
    }
}

