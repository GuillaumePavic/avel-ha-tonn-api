const generateData = require('../services/generateData');
const roundLatLng = require('../utils/roundLatLng');
const searchDataValidation = require('../validation/search');

exports.searchData = async (req, res) => {
    try {
        const {lat, lng} = req.body;

        //JOI
        try {
            await searchDataValidation.validateAsync(req.body);
        } catch (error) {
            return res.status(400).send(error.details[0].message); 
        }

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