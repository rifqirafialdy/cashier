const express = require('express')
const { productsController } = require('../controllers')
const upload = require('../middleware/multer')

const router = express.Router()

router.post('/add-product',upload.single('file') ,productsController.addProduct)
router.post('/add-category',productsController.addCategory)
router.post('/edit-product/:id', productsController.editProduct)
router.get('/show-products', productsController.fetchProducts)
router.post('/edit-category/:id',productsController.editCategories)

module.exports = router