const express = require('express');
const router = express.Router();
const cocktailController = require('../controllers/CocktailController');

router.get('/', cocktailController.getCocktailList);
router.get('/ingredients', cocktailController.getIngredientList);
router.get('/search', cocktailController.search);
router.get('/:id', cocktailController.getDetail);


module.exports = router;