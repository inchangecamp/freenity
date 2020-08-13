const mongoose = require('mongoose')
const trunks = require('trunks-log')
const log = new trunks('SETTINGS')
const { Favourite } = require('./index')

const definition = {
    title: {
        type: String,
        default: null
    },
	title_site: {
        type: String,
        default: null
    },
	title_size: {
        type: String,
        default: null
    },
	title_fonts: {
        type: String,
        default: null
    },
	header: {
        type: String,
        default: null
    },
	logo: {
        type: String,
        default: null
    },
	background: {
        type: String,
        default: null
    },
	facebook: {
        type: String,
        default: null
    },
	twitter: {
        type: String,
        default: null
    },
	instagram: {
        type: String,
        default: null
    },
    files: {
        type: Array,
        default: []
    },
	facebook_group: {
        type: String,
        default: null
    },
	instagram_group: {
        type: String,
        default: null
    },
	telegram_group: {
        type: String,
        default: null
    },
	facebook_work: {
        type: String,
        default: null
    },
	instagram_work: {
        type: String,
        default: null
    },
	telegram_work: {
        type: String,
        default: null
    },
}

const options = {
    setDefaultsOnInsert: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}

const messageSchema = new mongoose.Schema(definition, options)

// messageSchema.virtual('is_favourite').get(function () {
//     return false
// })

messageSchema.post('find', function (messages, next) {
    messages.forEach((message) => {
        if (message) {
            message.files.sort((a, b) => (a.type > b.type) ? 1 : ((a.type > b.type) ? -1 : 0))
        }
    })
    next()
})

messageSchema.post('findOne', function (message, next) {
    if (message) {
        message.files.sort((a, b) => (a.type > b.type) ? 1 : ((a.type > b.type) ? -1 : 0))
    }
    next()
});

messageSchema.post('init', function (message, next) {
    if (message) {
        message.files.sort((a, b) => (a.type > b.type) ? 1 : ((a.type > b.type) ? -1 : 0))
    }
    next()
});

module.exports = mongoose.model('Settings', messageSchema)