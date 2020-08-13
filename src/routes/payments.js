const express = require('express')

const { paymentsController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

const router = express.Router()

const ejwt = require('express-jwt')
const SECRET_TOKEN = process.env.SECRET_TOKEN

router.get('/', ejwt({secret: SECRET_TOKEN, credentialsRequired: false}), catchErrors(paymentsController.index))

router.post('/', ejwt({secret: SECRET_TOKEN}), catchErrors(paymentsController.store))

router.post('/savetranslation', catchErrors(paymentsController.savetranslation))

router.get('/:id', catchErrors(paymentsController.show))

router.delete('/:id', catchErrors(paymentsController.delete))

module.exports = router