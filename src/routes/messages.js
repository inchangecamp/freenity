const express = require('express')

const { messagesController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

const router = express.Router()

const ejwt = require('express-jwt')
const SECRET_TOKEN = process.env.SECRET_TOKEN

router.get('/', ejwt({secret: SECRET_TOKEN, credentialsRequired: false}), catchErrors(messagesController.index))

router.post('/', ejwt({secret: SECRET_TOKEN}), catchErrors(messagesController.store))

router.post('/savetranslation', catchErrors(messagesController.savetranslation))

router.get('/favourites', ejwt({secret: SECRET_TOKEN}), catchErrors(messagesController.favourites))

router.get('/:id', catchErrors(messagesController.show))

router.delete('/:id', catchErrors(messagesController.delete))

router.post('/translationfile', catchErrors(messagesController.translationfile))

router.post('/translationtext', catchErrors(messagesController.translationtext))

router.post('/:id/seen', catchErrors(messagesController.seen))

router.post('/:id/favourite', ejwt({secret: SECRET_TOKEN}), catchErrors(messagesController.favourite))

router.post('/:id/attached', ejwt({secret: SECRET_TOKEN}), catchErrors(messagesController.attached))

router.post('/getattached', catchErrors(messagesController.getattached))

router.post('/closeattached', catchErrors(messagesController.closeattached))

router.get('/getcategories/:id', catchErrors(messagesController.getcategories))

module.exports = router