const searchController = require('../controller/search');
const express = require('express');
const router = express.Router();

router.post('/', searchController.searchData);

module.exports = router;
