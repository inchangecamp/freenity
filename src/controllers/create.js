const { Create, User } = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('CREATE')
const rp = require('preq')
const rp2 = require('request-promise')
const { resize } = require('easyimage')
const http = require('http');
const fs = require("fs")
const embed = require("embed-video")
const cheerio = require('cheerio')
const process = require('child_process')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const googleTranslate = require('google-translate')('AIzaSyC8Z2hpMEn28Ni0jl6ePBi0vggasJF8f8E')

exports.index = async (req, res) => { 
    Create.find()
        .sort([['created_at', -1]])
        .skip(parseInt(req.query.offset))
        .limit(10)
        .exec().then(async (messages) => {
            messages = JSON.parse(JSON.stringify(messages))



            messages = messages.reverse()

            log.success('Retrieved all {} messages', messages.length)
            res.json({ data: messages })
        })
        .catch(err => {
            log.error(err, 'Could not retrieve messages: {}', err.message) 
            res.json({ data: [] })
        })
}


exports.store = async (req, res) => {
    let data = req.body

    if (data._id) {
        Create.findOneAndUpdate({_id: data._id}, {$set: data}, {new: true}).then(async (message) => {
            message = JSON.parse(JSON.stringify(message))

			message.allow_iframe = false

            if (message.url) {
                if (embed(message.url)) {
                    let embedDataIframe = cheerio.load(embed(message.url))
                    message.embed = embedDataIframe('iframe').prop('src')
                }
            }

            log.success('Updated Create: {}', message._id)
            return res.status(200).json({ data: message, method: 'update' })
        })
    } else {
        data.user_id = req.user._id
		let message = new Create(req.body)

		if (message.title) {
			var options = {
				method: 'POST',
				uri: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyC8Z2hpMEn28Ni0jl6ePBi0vggasJF8f8E',
				body: {
					target : message.lang,
					q : message.title
					
				},
				json: true // Automatically stringifies the body to JSON
			};

			await rp2(options)
				.then(function (data) {
					eval('message.title_'+message.lang+'=data.data.translations[0].translatedText')
					
				})
				.catch(function (err) {
				   console.log(err);
				});
		}

		if (message.description) {
			var options = {
				method: 'POST',
				uri: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyC8Z2hpMEn28Ni0jl6ePBi0vggasJF8f8E',
				body: {
					target : message.lang,
					q : message.description
					
				},
				json: true // Automatically stringifies the body to JSON
			};

			await rp2(options)
				.then(function (data) {
					eval('message.description_'+message.lang+'=data.data.translations[0].translatedText')
					
				})
				.catch(function (err) {
				   console.log(err);
				});
		}

		if (message.comment) {
			var options = {
				method: 'POST',
				uri: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyC8Z2hpMEn28Ni0jl6ePBi0vggasJF8f8E',
				body: {
					target : message.lang,
					q : message.comment
					
				},
				json: true // Automatically stringifies the body to JSON
			};

			await rp2(options)
				.then(function (data) {
					eval('message.comment_'+message.lang+'=data.data.translations[0].translatedText')
					
				})
				.catch(function (err) {
				   console.log(err);
				});
		}

		if (message.special_post) {
			var options = {
				method: 'POST',
				uri: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyC8Z2hpMEn28Ni0jl6ePBi0vggasJF8f8E',
				body: {
					target : message.lang,
					q : message.special_post
					
				},
				json: true // Automatically stringifies the body to JSON
			};

			await rp2(options)
				.then(function (data) {
					eval('message.special_post_'+message.lang+'=data.data.translations[0].translatedText')
					
				})
				.catch(function (err) {
				   console.log(err);
				});
		}
		
		await User.findById(req.user._id).then(response => {
			message.author_post=response.login
		}).catch(err => {})

        if (message.files[0] && message.files[0].type=='video') {
			
			var arr=message.files[0].url.split('/')
	
			await ffmpeg('./public/files/'+arr[1])
			  .screenshots({
				timestamps: ['00:00:02.000'],
				filename: arr[1]+'.jpg',
				folder: './public/files'
			  });
				
				message.files[0].preview='files/'+arr[1]+'.jpg';

        }
		
        if (message.files[0] && message.files[0].type=='image') {
			if (message.url) {
                await resize({
                    src: message.files[0].url,
                    width: 1320
                }).then(function (result) {
					
                    let source = fs.createReadStream(result.path)
                    let destination = fs.createWriteStream('public/files/' + message._id+'.jpg')
					message.files[0].preview='files/' + message._id+'.jpg';
					message.files[0].url='files/' + message._id+'.jpg';
                    source.pipe(destination)

                }).catch(err => {
                    //message.files[0].url=err
                })
			} else {
                await resize({
                    src: 'public/' + message.files[0].url,
                    width: 1320
                }).then(function (result) {
					
                    let source = fs.createReadStream(result.path)
                    let destination = fs.createWriteStream('public/' + message.files[0].url)

                    source.pipe(destination)

                }).catch(err => {
                    //message.files[0].url=err
                })	
			}
        }

        await message.save().then(async (message) => {
            message = JSON.parse(JSON.stringify(message))

			message.allow_iframe = false

            if (message.url) {
                if (embed(message.url)) {
                    let embedDataIframe = cheerio.load(embed(message.url))
                    message.embed = embedDataIframe('iframe').prop('src')
                }
            }

            log.success('Created Create: {}', message._id)
            return res.status(200).json({ data: message, method: 'create' })
        })
        .catch(err => {
            log.error(err, 'Error creating message: {}', message._id)
            let errStatus = err.name === 'ValidationError' ? 400 : 500
            let errCreate = []

            if (err.name == 'ValidationError') {
                for (field in err.errors) {
                    errCreate.push(err.errors[field].message)
                }
            } else {
                errCreate.push('Something went wrong')
            }

            return res.status(errStatus).json({ message: errCreate.join(', ') })
        })
    }
}


exports.delete = async (req, res) => {
    Create.findById(req.params.id).remove().exec()
    res.json({
        message: 'Deleted'
    })
}

exports.seen = async (req, res) => {
    Create.findById(req.params.id).then(create => {
        create.set({ views: create.views + 1 }).save()
    }).catch(err => {})
    
    res.json({
        message: 'Views updated'
    })
}


exports.delete_one = async (req, res) => {
    Create.findById(req.params.id).remove().exec()
    res.json({
        message: 'Deleted'
    })
}

exports.savetranslation = async (req, res) => {
	 let data = req.body
	 
	Create.findOneAndUpdate({_id: data._id}, {$set: data}, {new: true}).then(async (message) => {
		log.success('Updated Message: {}', message._id)
		return res.status(200).json({ data: message, method: 'update' })
	})
}