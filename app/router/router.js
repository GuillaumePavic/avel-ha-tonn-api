const controller = require('../controller/controller');
const express = require('express');
const router = express.Router();

router.get('/api/markers', controller.getMarkers);
router.get('/api/marker/:id', controller.getMarkerData);
router.post('/api/pointer', controller.getPointerData);
module.exports = router;