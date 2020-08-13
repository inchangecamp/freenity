//Here we will import all our controllers, this way we only need to
//import the controller as a single module, or an explicit constant later!!!
const authController = require('./auth')
const messagesController = require('./messages')
const settingsController = require('./settings')
const categoriesController = require('./categories')
const createController = require('./create')
const scrapingController = require('./scraping')
const uploadController = require('./upload')
const adminController = require('./admin')
const shopController = require('./shop')
const paymentsController = require('./payments')

module.exports = {
  authController,
  messagesController,
  settingsController,
  categoriesController,
  createController,
  scrapingController,
  uploadController,
  adminController,
  shopController,
  paymentsController
}