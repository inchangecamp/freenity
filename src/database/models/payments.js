const mongoose = require('mongoose')
const trunks = require('trunks-log')
const log = new trunks('PAYMENTS')
const { Favourite } = require('./index')

const definition = {
    shop_id: {
        type: String,
        default: null
    },
    number: {
        type: String,
        default: null
    },	
    month: {
        type: String,
        default: null
    },	
    year: {
        type: String,
        default: null
    },	
    CVV: {
        type: String,
        default: null
    },	
    name: {
        type: String,
        default: null
    },	
    email: {
        type: String,
        default: null
    },	
    adress: {
        type: String,
        default: null
    },	
    count: {
        type: Number,
        default: 0
    },
    is_pay: {
        type: Number,
        default: 0
    },
    time: {
        type: String,
        default: null
    },
    files: {
        type: Array,
        default: []
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

messageSchema.post('find', function (payments, next) {
    payments.forEach((payment) => {
        if (payment) {
            payment.files.sort((a, b) => (a.type > b.type) ? 1 : ((a.type > b.type) ? -1 : 0))
        }
    })
    next()
})

messageSchema.post('findOne', function (payment, next) {
    if (payment) {
        payment.files.sort((a, b) => (a.type > b.type) ? 1 : ((a.type > b.type) ? -1 : 0))
    }
    next()
});

messageSchema.post('init', function (payment, next) {
    if (payment) {
        payment.files.sort((a, b) => (a.type > b.type) ? 1 : ((a.type > b.type) ? -1 : 0))
    }
    next()
});

module.exports = mongoose.model('Payments', messageSchema)