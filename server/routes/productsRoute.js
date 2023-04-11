const express = require('express')
const { productsController } = require('../controllers')

const router = express.Router()

router.post('/add-product', productsController.addProduct)
router.post('/add-category',productsController.addCategory)

module.exports = router