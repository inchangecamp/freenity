const { Create, User, Categories } = require('../database/models')
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
const googleTranslate = require('google-translate')('AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk')

exports.index = async (req, res) => { 
    Create.find()
        .sort([['created_at', -1]])
        .skip(parseInt(req.query.offset))
        .limit(10)
        .exec().then(async (messages) => {
            messages = JSON.parse(JSON.stringify(messages))
				
            await Promise.all(messages.map(async (message) => {
				if (message.categories) {	
					await Categories.findById(message.categories).then(async (categories) => {
						categories = JSON.parse(JSON.stringify(categories))
						message.categories_title=categories;
					}).catch(() => {
						message.categories_title=null;
					})				
					
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
		
		
		data.title_zu=null
		data.title_zh=null
		data.title_yo=null
		data.title_yi=null
		data.title_xh=null
		data.title_vi=null
		data.title_uz=null
		data.title_ur=null
		data.title_uk=null
		data.title_tr=null
		data.title_tl=null
		data.title_th=null
		data.title_tg=null
		data.title_te=null
		data.title_ta=null
		data.title_sw=null
		data.title_sv=null
		data.title_su=null
		data.title_st=null
		data.title_sr=null
		data.title_sq=null
		data.title_so=null
		data.title_sn=null
		data.title_sm=null
		data.title_sl=null
		data.title_sk=null
		data.title_si=null
		data.title_sd=null
		data.title_ru=null
		data.title_ro=null
		data.title_pt=null
		data.title_ps=null
		data.title_pl=null
		data.title_pa=null
		data.title_ny=null
		data.title_no=null
		data.title_nl=null
		data.title_ne=null
		data.title_my=null
		data.title_mt=null
		data.title_ms=null
		data.title_mr=null
		data.title_mn=null
		data.title_ml=null
		data.title_mk=null
		data.title_mi=null
		data.title_mg=null
		data.title_lv=null
		data.title_lt=null
		data.title_lo=null
		data.title_lb=null
		data.title_la=null
		data.title_ky=null
		data.title_ku=null
		data.title_ko=null
		data.title_kn=null
		data.title_km=null
		data.title_kk=null
		data.title_ka=null
		data.title_jw=null
		data.title_ja=null
		data.title_iw=null
		data.title_it=null
		data.title_is=null
		data.title_ig=null
		data.title_id=null
		data.title_hy=null
		data.title_hu=null
		data.title_ht=null
		data.title_hr=null
		data.title_hmn=null
		data.title_hi=null
		data.title_haw=null
		data.title_ha=null
		data.title_gu=null
		data.title_gl=null
		data.title_gd=null
		data.title_ga=null
		data.title_fy=null
		data.title_fr=null
		data.title_fi=null
		data.title_fa=null
		data.title_eu=null
		data.title_et=null
		data.title_es=null
		data.title_eo=null
		data.title_en=null
		data.title_el=null
		data.title_de=null
		data.title_da=null
		data.title_cy=null
		data.title_cs=null
		data.title_co=null
		data.title_ceb=null
		data.title_ca=null
		data.title_bs=null
		data.title_bn=null
		data.title_bg=null
		data.title_be=null
		data.title_az=null
		data.title_ar=null
		data.title_am=null
		data.title_af=null
		
		
		data.description_zu=null
		data.description_zh=null
		data.description_yo=null
		data.description_yi=null
		data.description_xh=null
		data.description_vi=null
		data.description_uz=null
		data.description_ur=null
		data.description_uk=null
		data.description_tr=null
		data.description_tl=null
		data.description_th=null
		data.description_tg=null
		data.description_te=null
		data.description_ta=null
		data.description_sw=null
		data.description_sv=null
		data.description_su=null
		data.description_st=null
		data.description_sr=null
		data.description_sq=null
		data.description_so=null
		data.description_sn=null
		data.description_sm=null
		data.description_sl=null
		data.description_sk=null
		data.description_si=null
		data.description_sd=null
		data.description_ru=null
		data.description_ro=null
		data.description_pt=null
		data.description_ps=null
		data.description_pl=null
		data.description_pa=null
		data.description_ny=null
		data.description_no=null
		data.description_nl=null
		data.description_ne=null
		data.description_my=null
		data.description_mt=null
		data.description_ms=null
		data.description_mr=null
		data.description_mn=null
		data.description_ml=null
		data.description_mk=null
		data.description_mi=null
		data.description_mg=null
		data.description_lv=null
		data.description_lt=null
		data.description_lo=null
		data.description_lb=null
		data.description_la=null
		data.description_ky=null
		data.description_ku=null
		data.description_ko=null
		data.description_kn=null
		data.description_km=null
		data.description_kk=null
		data.description_ka=null
		data.description_jw=null
		data.description_ja=null
		data.description_iw=null
		data.description_it=null
		data.description_is=null
		data.description_ig=null
		data.description_id=null
		data.description_hy=null
		data.description_hu=null
		data.description_ht=null
		data.description_hr=null
		data.description_hmn=null
		data.description_hi=null
		data.description_haw=null
		data.description_ha=null
		data.description_gu=null
		data.description_gl=null
		data.description_gd=null
		data.description_ga=null
		data.description_fy=null
		data.description_fr=null
		data.description_fi=null
		data.description_fa=null
		data.description_eu=null
		data.description_et=null
		data.description_es=null
		data.description_eo=null
		data.description_en=null
		data.description_el=null
		data.description_de=null
		data.description_da=null
		data.description_cy=null
		data.description_cs=null
		data.description_co=null
		data.description_ceb=null
		data.description_ca=null
		data.description_bs=null
		data.description_bn=null
		data.description_bg=null
		data.description_be=null
		data.description_az=null
		data.description_ar=null
		data.description_am=null
		data.description_af=null
		
		
		data.comment_zu=null
		data.comment_zh=null
		data.comment_yo=null
		data.comment_yi=null
		data.comment_xh=null
		data.comment_vi=null
		data.comment_uz=null
		data.comment_ur=null
		data.comment_uk=null
		data.comment_tr=null
		data.comment_tl=null
		data.comment_th=null
		data.comment_tg=null
		data.comment_te=null
		data.comment_ta=null
		data.comment_sw=null
		data.comment_sv=null
		data.comment_su=null
		data.comment_st=null
		data.comment_sr=null
		data.comment_sq=null
		data.comment_so=null
		data.comment_sn=null
		data.comment_sm=null
		data.comment_sl=null
		data.comment_sk=null
		data.comment_si=null
		data.comment_sd=null
		data.comment_ru=null
		data.comment_ro=null
		data.comment_pt=null
		data.comment_ps=null
		data.comment_pl=null
		data.comment_pa=null
		data.comment_ny=null
		data.comment_no=null
		data.comment_nl=null
		data.comment_ne=null
		data.comment_my=null
		data.comment_mt=null
		data.comment_ms=null
		data.comment_mr=null
		data.comment_mn=null
		data.comment_ml=null
		data.comment_mk=null
		data.comment_mi=null
		data.comment_mg=null
		data.comment_lv=null
		data.comment_lt=null
		data.comment_lo=null
		data.comment_lb=null
		data.comment_la=null
		data.comment_ky=null
		data.comment_ku=null
		data.comment_ko=null
		data.comment_kn=null
		data.comment_km=null
		data.comment_kk=null
		data.comment_ka=null
		data.comment_jw=null
		data.comment_ja=null
		data.comment_iw=null
		data.comment_it=null
		data.comment_is=null
		data.comment_ig=null
		data.comment_id=null
		data.comment_hy=null
		data.comment_hu=null
		data.comment_ht=null
		data.comment_hr=null
		data.comment_hmn=null
		data.comment_hi=null
		data.comment_haw=null
		data.comment_ha=null
		data.comment_gu=null
		data.comment_gl=null
		data.comment_gd=null
		data.comment_ga=null
		data.comment_fy=null
		data.comment_fr=null
		data.comment_fi=null
		data.comment_fa=null
		data.comment_eu=null
		data.comment_et=null
		data.comment_es=null
		data.comment_eo=null
		data.comment_en=null
		data.comment_el=null
		data.comment_de=null
		data.comment_da=null
		data.comment_cy=null
		data.comment_cs=null
		data.comment_co=null
		data.comment_ceb=null
		data.comment_ca=null
		data.comment_bs=null
		data.comment_bn=null
		data.comment_bg=null
		data.comment_be=null
		data.comment_az=null
		data.comment_ar=null
		data.comment_am=null
		data.comment_af=null
		
		
		data.special_post_zu=null
		data.special_post_zh=null
		data.special_post_yo=null
		data.special_post_yi=null
		data.special_post_xh=null
		data.special_post_vi=null
		data.special_post_uz=null
		data.special_post_ur=null
		data.special_post_uk=null
		data.special_post_tr=null
		data.special_post_tl=null
		data.special_post_th=null
		data.special_post_tg=null
		data.special_post_te=null
		data.special_post_ta=null
		data.special_post_sw=null
		data.special_post_sv=null
		data.special_post_su=null
		data.special_post_st=null
		data.special_post_sr=null
		data.special_post_sq=null
		data.special_post_so=null
		data.special_post_sn=null
		data.special_post_sm=null
		data.special_post_sl=null
		data.special_post_sk=null
		data.special_post_si=null
		data.special_post_sd=null
		data.special_post_ru=null
		data.special_post_ro=null
		data.special_post_pt=null
		data.special_post_ps=null
		data.special_post_pl=null
		data.special_post_pa=null
		data.special_post_ny=null
		data.special_post_no=null
		data.special_post_nl=null
		data.special_post_ne=null
		data.special_post_my=null
		data.special_post_mt=null
		data.special_post_ms=null
		data.special_post_mr=null
		data.special_post_mn=null
		data.special_post_ml=null
		data.special_post_mk=null
		data.special_post_mi=null
		data.special_post_mg=null
		data.special_post_lv=null
		data.special_post_lt=null
		data.special_post_lo=null
		data.special_post_lb=null
		data.special_post_la=null
		data.special_post_ky=null
		data.special_post_ku=null
		data.special_post_ko=null
		data.special_post_kn=null
		data.special_post_km=null
		data.special_post_kk=null
		data.special_post_ka=null
		data.special_post_jw=null
		data.special_post_ja=null
		data.special_post_iw=null
		data.special_post_it=null
		data.special_post_is=null
		data.special_post_ig=null
		data.special_post_id=null
		data.special_post_hy=null
		data.special_post_hu=null
		data.special_post_ht=null
		data.special_post_hr=null
		data.special_post_hmn=null
		data.special_post_hi=null
		data.special_post_haw=null
		data.special_post_ha=null
		data.special_post_gu=null
		data.special_post_gl=null
		data.special_post_gd=null
		data.special_post_ga=null
		data.special_post_fy=null
		data.special_post_fr=null
		data.special_post_fi=null
		data.special_post_fa=null
		data.special_post_eu=null
		data.special_post_et=null
		data.special_post_es=null
		data.special_post_eo=null
		data.special_post_en=null
		data.special_post_el=null
		data.special_post_de=null
		data.special_post_da=null
		data.special_post_cy=null
		data.special_post_cs=null
		data.special_post_co=null
		data.special_post_ceb=null
		data.special_post_ca=null
		data.special_post_bs=null
		data.special_post_bn=null
		data.special_post_bg=null
		data.special_post_be=null
		data.special_post_az=null
		data.special_post_ar=null
		data.special_post_am=null
		data.special_post_af=null		

		if (data.title) {
			var options = {
				method: 'POST',
				uri: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk',
				body: {
					target : data.lang,
					q : data.title
					
				},
				json: true // Automatically stringifies the body to JSON
			};

			await rp2(options)
				.then(function (datas) {
					eval('data.title_'+data.lang+'=datas.data.translations[0].translatedText')
					
				})
				.catch(function (err) {
				   console.log(err);
				});
		}

		if (data.description) {
			var options = {
				method: 'POST',
				uri: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk',
				body: {
					target : data.lang,
					q : data.description
					
				},
				json: true // Automatically stringifies the body to JSON
			};

			await rp2(options)
				.then(function (datas) {
					eval('data.description_'+data.lang+'=datas.data.translations[0].translatedText')
					
				})
				.catch(function (err) {
				   console.log(err);
				});
		}

		if (data.comment) {
			var options = {
				method: 'POST',
				uri: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk',
				body: {
					target : data.lang,
					q : data.comment
					
				},
				json: true // Automatically stringifies the body to JSON
			};

			await rp2(options)
				.then(function (datas) {
					eval('data.comment_'+data.lang+'=datas.data.translations[0].translatedText')
					
				})
				.catch(function (err) {
				   console.log(err);
				});
		}

		if (data.special_post) {
			var options = {
				method: 'POST',
				uri: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk',
				body: {
					target : data.lang,
					q : data.special_post
					
				},
				json: true // Automatically stringifies the body to JSON
			};

			await rp2(options)
				.then(function (datas) {
					eval('data.special_post_'+data.lang+'=datas.data.translations[0].translatedText')
					
				})
				.catch(function (err) {
				   console.log(err);
				});
		}

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
				uri: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk',
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
				uri: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk',
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
				uri: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk',
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
				uri: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk',
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
			
			if (message.categories) {	
				await Categories.findById(message.categories).then(async (categories) => {
					categories = JSON.parse(JSON.stringify(categories))
					message.categories_title=categories;
				}).catch(() => {
					message.categories_title=null;
				})				
				
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

exports.show = async (req, res) => {
    Create.findById(req.params.id).then(async (message) => {
        message = JSON.parse(JSON.stringify(message))

            if (message.url) {
				
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