const express = require('express')
const { productsController } = require('../controllers')
const upload = require('../middleware/multer')

const router = express.Router()

router.post('/add-product',upload.single('file') ,productsController.addProduct)
router.post('/add-category',productsController.addCategory)

module.exports = router