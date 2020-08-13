const express = require('express')

const { shopController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

const router = express.Router()

const ejwt = require('express-jwt')
const SECRET_TOKEN = process.env.SECRET_TOKEN

router.get('/', ejwt({secret: SECRET_TOKEN, credentialsRequired: false}), catchErrors(shopController.index))

router.post('/', ejwt({secret: SECRET_TOKEN}), catchErrors(shopController.store))

router.post('/savetranslation', catchErrors(shopController.savetranslation))

router.get('/:id', catchErrors(shopController.show))

router.delete('/:id', catchErrors(shopController.delete))

module.exports = router