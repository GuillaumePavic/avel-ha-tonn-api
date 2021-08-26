const generateData = require('../services/generateData');
const roundLatLng = require('../utils/roundLatLng');

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