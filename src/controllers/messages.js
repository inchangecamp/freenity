const { Message, Favourite } = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('MESSAGES')
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
const Mercury = require('@postlight/mercury-parser')

exports.index = async (req, res) => { 
    Message.find()
        .sort([['created_at', -1]])
        .skip(parseInt(req.query.offset))
        .limit(10)
        .exec().then(async (messages) => {
            messages = JSON.parse(JSON.stringify(messages))

            await Promise.all(messages.map(async (message) => {
                await Favourite.findOne({ user_id: req.user === undefined ? null : req.user._id, message_id: message._id })
                    .exec().then((favourite) => {
                        if (favourite) {
                            message.is_favourite = true
                        } else {
                            message.is_favourite = false
                        }
                    }).catch(() => {
                        message.is_favourite = false
                    })
					
                message.allow_iframe = false
				
               // await rp({
               //     uri: message.url,
               //     resolveWithFullResponse: true
               // }).then(response => {
               //     if (response.headers['x-frame-options'] == 'SAMEORIGIN' || response.headers['x-frame-options'] == 'DENY' || response.headers['x-frame-options'] == 'ALLOW-FROM') {
                //        message.allow_iframe = false
                //    } else {
                //        message.allow_iframe = true
                //    }
                //}).catch(err => {
                //    message.allow_iframe = false
                //})

                if (message.url) {
                    if (embed(message.url)) {
                        let embedDataIframe = cheerio.load(embed(message.url))
                        message.embed = embedDataIframe('iframe').prop('src')
                    }
                }
            }))

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

    if (data._id && !data.create) {
        Message.findOneAndUpdate({_id: data._id}, {$set: data}, {new: true}).then(async (message) => {
            message = JSON.parse(JSON.stringify(message))

            await Favourite.findOne({ user_id: req.user === undefined ? null : req.user._id, message_id: message._id })
            .exec().then((favourite) => {
                if (favourite) {
                    message.is_favourite = true
                } else {
                    message.is_favourite = false
                }
            }).catch(() => {
                message.is_favourite = false
            })

			message.allow_iframe = false
			
            //await rp({
            //    uri: message.url,
            //    resolveWithFullResponse: true
            //}).then(response => {
            //    if (response.headers['x-frame-options'] == 'SAMEORIGIN' || response.headers['x-frame-options'] == 'DENY' || response.headers['x-frame-options'] == 'ALLOW-FROM') {
            //        message.allow_iframe = false
            //    } else {
            //        message.allow_iframe = true
            //    }
            //}).catch(err => {
            //    message.allow_iframe = false
            //})

            if (message.url) {
                if (embed(message.url)) {
                    let embedDataIframe = cheerio.load(embed(message.url))
                    message.embed = embedDataIframe('iframe').prop('src')
                }
            }

            log.success('Updated Message: {}', message._id)
            return res.status(200).json({ data: message, method: 'update' })
        })
    } else {
        data.user_id = req.user._id
        let message = new Message(req.body)
	
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

            await Favourite.findOne({ user_id: req.user === undefined ? null : req.user._id, message_id: message._id })
            .exec().then((favourite) => {
                if (favourite) {
                    message.is_favourite = true
                } else {
                    message.is_favourite = false
                }
            }).catch(() => {
                message.is_favourite = false
            })

			message.allow_iframe = false
			
           // await rp({
           //     uri: message.url,
           //     resolveWithFullResponse: true
           // }).then(response => {
           //     if (response.headers['x-frame-options'] == 'SAMEORIGIN' || response.headers['x-frame-options'] == 'DENY' || response.headers['x-frame-options'] == 'ALLOW-FROM') {
           //         message.allow_iframe = false
            //    } else {
            //        message.allow_iframe = true
            //    }
            //}).catch(err => {
            //    message.allow_iframe = false
            //})

            if (message.url) {
                if (embed(message.url)) {
                    let embedDataIframe = cheerio.load(embed(message.url))
                    message.embed = embedDataIframe('iframe').prop('src')
                }
            }

            log.success('Created Message: {}', message._id)
			
            return res.status(200).json({ data: message, method: 'create' })
        })
        .catch(err => {
            log.error(err, 'Error creating message: {}', message._id)
            let errStatus = err.name === 'ValidationError' ? 400 : 500
            let errMessage = []

            if (err.name == 'ValidationError') {
                for (field in err.errors) {
                    errMessage.push(err.errors[field].message)
                }
            } else {
                errMessage.push('Something went wrong')
            }

            return res.status(errStatus).json({ message: errMessage.join(', ') })
        })
    }
}

exports.show = async (req, res) => {
    Message.findById(req.params.id).then(async (message) => {
        message = JSON.parse(JSON.stringify(message))

        await Favourite.findOne({ user_id: req.user === undefined ? null : req.user._id, message_id: message._id })
            .exec().then((favourite) => {
                if (favourite) {
                    message.is_favourite = true
                } else {
                    message.is_favourite = false
                }
            }).catch(() => {
                message.is_favourite = false
            })

        await rp({
                uri: message.url,
                resolveWithFullResponse: true
            }).then(response => {
                if (response.headers['x-frame-options'] == 'SAMEORIGIN' || response.headers['x-frame-options'] == 'DENY' || response.headers['x-frame-options'] == 'ALLOW-FROM') {
                    message.allow_iframe = false
                } else {
                    message.allow_iframe = true
                }
            }).catch(err => {
                message.allow_iframe = false
            })
        
            if (message.url) {
                if (embed(message.url)) {
                    let embedDataIframe = cheerio.load(embed(message.url))
                    message.embed = embedDataIframe('iframe').prop('src')
                }
            }

        res.status(200).json({
            data: message
        })
    }).catch(() => {
        res.status(200).json({
            data: null
        })
    })
}

exports.delete = async (req, res) => {
    Message.findById(req.params.id).remove().exec()
    res.json({
        message: 'Deleted'
    })
}

exports.seen = async (req, res) => {
    Message.findById(req.params.id).then(message => {
        message.set({ views: message.views + 1 }).save()
    }).catch(err => {})
    
    res.json({
        message: 'Views updated'
    })
}

exports.favourites = async (req, res) => {
    Message.find()
        .sort([['created_at', -1]])
        .exec().then(async (messages) => {
            messages = JSON.parse(JSON.stringify(messages))

            await Promise.all(messages.map(async (message) => {
                await Favourite.findOne({ user_id: req.user._id, message_id: message._id })
                .exec().then((favourite) => {
                    if (favourite) {
                        message.is_favourite = true
                    } else {
                        messages.splice(messages.indexOf(message), 1)
                    }
                }).catch(() => {
                    messages.splice(messages.indexOf(message), 1)
                })

                if (message.is_favourite) {
                    await rp({
                        uri: message.url,
                        resolveWithFullResponse: true
                    }).then(response => {
                        if (response.headers['x-frame-options'] == 'SAMEORIGIN' || response.headers['x-frame-options'] == 'DENY' || response.headers['x-frame-options'] == 'ALLOW-FROM') {
                            message.allow_iframe = false
                        } else {
                            message.allow_iframe = true
                        }
                    }).catch(err => {
                        message.allow_iframe = false
                    })
                }

                if (message.url) {
                    if (embed(message.url)) {
                        let embedDataIframe = cheerio.load(embed(message.url))
                        message.embed = embedDataIframe('iframe').prop('src')
                    }
                }
            }))

            messages = messages.splice(parseInt(req.query.offset), 10)

            messages = messages.reverse()

            log.success('Retrieved all favourite {} messages', messages.length)
            return res.json({ data: messages })
        })
        .catch(err => {
            log.error(err, 'Could not retrieve favourite messages: {}', err.message) 
            return res.json({ data: [] })
        })
}

exports.favourite = async (req, res) => {
    Message.findById(req.params.id).then(message => {
        Favourite.findOne({
            user_id: req.user._id,
            message_id: message._id
        }).then(favourite => {
            favourite.remove()
            log.success('Favourite unset by user {}', favourite.user_id)
            return res.status(200).json({ is_favourite: false, message: 'Favourite unset successfully' })
        }).catch(() => {
            new Favourite({
                user_id: req.user._id,
                message_id: message._id
            }).save().then(favourite => {
                log.success('New favourite by user {}', favourite.user_id)
                return res.status(200).json({ is_favourite: true, message: 'Favourite set successfully' })
            }).catch(err => {
                log.error(err, 'Favourite not set')
                return res.status(400).json({ message: 'Favourite not set' })
            })
        })
    })
}

exports.getattached = async (req, res) => {

    await Message.findOne({ attached: "1" })
        .then(user => {
                res.json({
					message: user
				})
        })
        .catch(err => {
            res.status(404).json({ message: "err" })
        })

}

exports.closeattached = async (req, res) => {

    Message.updateMany(
        {attached: "1"},     
        { $set: {attached: "0"}}, 
        function(err, result){
			res.json({
				message: "yes"
			})			
        }
    );
}


exports.attached = async (req, res) => {

    Message.updateMany(
        {attached: "1"},             
        { $set: {attached: "0"}},
        function(err, result){
            Message.findById(req.params.id).then(message => {
				message.set({ attached: 1 }).save()
			}).catch(err => {})
        }
    );

    res.json({
        message: req.params.id
    })
}


exports.translationfile = async (req, res) => {
	let data = req.body
	let url = data.url;
	let lang = data.lang;
	let imgurl = data.files[0].preview;
	let title = eval('data.title_'+lang);
	let uid = data._id;

	await Mercury.parse(url).then(async result => {

		str = result.content.replace(/<\/?(img)\b[^<>]*>/g, "")
		str = str.replace(/<\/?(iframe)\b[^<>]*>/g, "")
		await googleTranslate.translate(str, lang, async function(err, translation) {

			let img='';
			let content='';
			
			if (imgurl) img='<div style="text-align:center;padding:30px;"><img width="100%" src="'+imgurl+'" style="border-radius:10px;"></div>';
			content='<h1 style="text-align:center;">'+title+'</h1>'+img+translation.translatedText;
			
		  return res.status(200).json({ message: content })
		});
	});

}
exports.savetranslation = async (req, res) => {
	 let data = req.body
	 
	Message.findOneAndUpdate({_id: data._id}, {$set: data}, {new: true}).then(async (message) => {
		log.success('Updated Message: {}', message._id)
		return res.status(200).json({ data: message, method: 'update' })
	})
}



exports.translationtext = async (req, res) => {
	let data = req.body

	let lang = data.lang;
	let str = data.str;

	await googleTranslate.translate(str, lang, async function(err, translation) {
	  return res.status(200).json({ message: translation.translatedText })
	});


}