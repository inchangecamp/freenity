/*
 * This file is used to build the API routes, we may have 
 * different routes for views and the like
 */

const express = require('express')

const authRoutes = require('./auth')
const scrapingRoutes = require('./scraping')
const messageRoutes = require('./messages')
const settingsRoutes = require('./settings')
const createRoutes = require('./create')
const uploadRoutes = require('./upload')
const adminRoutes = require('./admin')
const categoriesRoutes = require('./categories')
const paymentsRoutes = require('./payments')
const shopRoutes = require('./shop')
const router = express.Router()

router.use('/auth', authRoutes)

router.use('/scraping', scrapingRoutes)

router.use('/messages', messageRoutes)

router.use('/settings', settingsRoutes)

router.use('/create', createRoutes)

router.use('/upload', uploadRoutes)

router.use('/admin', adminRoutes)

router.use('/categories', categoriesRoutes)

router.use('/payments', paymentsRoutes)

router.use('/shop', shopRoutes)

module.exports = router