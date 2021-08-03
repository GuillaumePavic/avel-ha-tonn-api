const controller = require('../controller/controller');
const express = require('express');
const router = express.Router();

router.get('/markers', controller.getMarkers);
router.get('/marker/:id', controller.getMarkerData);
router.post('/search', controller.searchData);

module.exports = router;