const express = require('express');
const router = express.Router();
const cocktailController = require('../controllers/CocktailController');

router.get('/:id', cocktailController.getDetail);

module.exports = router;