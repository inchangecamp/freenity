const { Categories, Message } = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('CATEGORIES')
const rp = require('preq')
const rp2 = require('request-promise')
const fs = require("fs")
const embed = require("embed-video")
const cheerio = require('cheerio')

exports.store = async (req, res) => {
    let categories = new Categories(req.body)

    await categories.save().then(categories => {
        log.success('Register categories: {}', categories.title)
        res.status(201).json({ data: categories })
    })
    .catch(error => {
        log.error(error, 'Error register categories: {}', categories.title)    
        let errStatus = error.name === 'ValidationError' ? 400 : 500
        res.status(errStatus).json({ message: errStatus === 400 ? error._message : 'Something went wrong' })
    })

}

exports.show = async (req, res) => {
    Categories.findById(req.params.id).then(async (categories) => {
        categories = JSON.parse(JSON.stringify(categories))

        res.status(200).json({
            data: categories
        })
    }).catch(() => {
        res.status(200).json({
            data: null
        })
    })
}

exports.categoriesDelete = async (req, res) => {
    await Categories.findById(req.params.id).remove().exec()
    res.json({
        message: 'Deleted'
    })
}

exports.categories = async (req, res) => { 
    let limit = parseInt(req.query.limit || 10)
    let offset = parseInt(req.query.offset || 0)
    let order = req.query.order || 'created_at DESC'
    let name = req.query.name || undefined
    let role = req.query.role || undefined

    let order_field = order.split(' ')[0]
    let order_direction = order.split(' ')[1] == 'DESC' ? -1 : 1

    let users_count = 0

    await Categories.find().exec()
    .then(users => {
        users_count = JSON.parse(JSON.stringify(users)).length
    })

    let filter = {}

    if (name)
        filter.login = { $regex: '.*' + name + '.*' }

    if (role)
        filter.role = role

    await Categories.find(filter).sort([[order_field, order_direction]])
    .skip(offset).limit(limit).exec().then(categories => {
        return res.status(200).json({
            status: 'success',
            count: users_count,
            categories: categories
        })
    })
}


exports.update = async (req, res) => {
    let data = req.body

	Categories.findOneAndUpdate({_id: data._id}, {$set: data}, {new: true}).then(async (categories) => {
		categories = JSON.parse(JSON.stringify(categories))

		log.success('Updated categories: {}', categories._id)
		return res.status(200).json({ data: categories, method: 'update' })
	})

}


exports.getcategories = async (req, res) => { 
	let str = []
    await Categories.find().exec().then(async categories => {
		
	await Promise.all(categories.map(async (message) => {
		await Message.findOne({ categories: message._id })
			.then(user => {
				if (user) str.push(message)
			})
			.catch(err => {
				console.log('err')
			})

	}))		
		
	if (str) {
		str.sort();
		return res.status(200).json({ data: str})		
	}
    })

}