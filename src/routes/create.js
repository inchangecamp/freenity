const express = require('express')

const { createController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

const router = express.Router()

const ejwt = require('express-jwt')
const SECRET_TOKEN = process.env.SECRET_TOKEN

router.get('/', ejwt({secret: SECRET_TOKEN, credentialsRequired: false}), catchErrors(createController.index))

router.post('/', ejwt({secret: SECRET_TOKEN}), catchErrors(createController.store))

router.get('/:id', catchErrors(createController.show))

router.delete('/:id', catchErrors(createController.delete))

router.post('/:id/delete_one', catchErrors(createController.delete_one))

router.post('/:id/seen', catchErrors(createController.seen))

router.post('/savetranslation', catchErrors(createController.savetranslation))

module.exports = router