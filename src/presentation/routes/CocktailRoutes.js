const express = require('express');
const router = express.Router();
const cocktailController = require('../controllers/CocktailController');

router.get('/ingredients', cocktailController.getIngredientList);
router.get('/:id', cocktailController.getDetail);
router.get('/', cocktailController.getCocktailList);


module.exports = router;