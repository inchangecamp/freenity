const express = require('express')

const { categoriesController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

const router = express.Router()

const ejwt = require('express-jwt')
const SECRET_TOKEN = process.env.SECRET_TOKEN

router.post('/updateones', catchErrors(categoriesController.update))
router.post('/', catchErrors(categoriesController.store))
router.get('/:id', catchErrors(categoriesController.show))
router.delete('/:id', ejwt({secret: SECRET_TOKEN}), catchErrors(categoriesController.categoriesDelete))
router.get('/', catchErrors(categoriesController.categories))
router.get('/getcategories/:id', catchErrors(categoriesController.getcategories))
module.exports = router
