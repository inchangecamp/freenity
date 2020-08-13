const { Shop } = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('SHOP')
const rp = require('preq')
const rp2 = require('request-promise')
const { resize } = require('easyimage')
const http = require('http');
const fs = require("fs")
const embed = require("embed-video")
const cheerio = require('cheerio')
const process = require('child_process')
const googleTranslate = require('google-translate')('AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk')

exports.index = async (req, res) => { 

    let filter = {}

    if (req.query.categories!=0)
        filter.categories = req.query.categories

    Shop.find(filter)
        .sort([['created_at', -1]])
        .skip(parseInt(req.query.offset))
        .limit(10)
        .exec().then(async (messages) => {
            messages = JSON.parse(JSON.stringify(messages))

           // messages = messages.reverse()

            log.success('Retrieved all {} shop', messages.length)
            res.json({ data: messages })
        })
        .catch(err => {
            log.error(err, 'Could not retrieve shop: {}', err.message) 
            res.json({ data: [] })
        })
}

exports.store = async (req, res) => {
    let data = req.body

    if (data._id) {

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

        Shop.findOneAndUpdate({_id: data._id}, {$set: data}, {new: true}).then(async (message) => {
            message = JSON.parse(JSON.stringify(message))

            log.success('Updated shop: {}', message._id)
            return res.status(200).json({ data: message, method: 'update' })
        })
    } else {
        data.user_id = req.user._id
        let message = new Shop(req.body)

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
					eval('message.title_'+data.lang+'=datas.data.translations[0].translatedText')
					
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
					eval('message.description_'+data.lang+'=datas.data.translations[0].translatedText')
					
				})
				.catch(function (err) {
				   console.log(err);
				});
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

            log.success('Created shop: {}', message._id)
			
            return res.status(200).json({ data: message, method: 'create' })
        })
        .catch(err => {
            log.error(err, 'Error creating shop: {}', message._id)
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
    Shop.findById(req.params.id).then(async (message) => {
        message = JSON.parse(JSON.stringify(message))

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
    Shop.findById(req.params.id).remove().exec()
    res.json({
        message: 'Deleted'
    })
}

exports.savetranslation = async (req, res) => {
	 let data = req.body
	 
	Shop.findOneAndUpdate({_id: data._id}, {$set: data}, {new: true}).then(async (message) => {
		log.success('Updated Shop: {}', message._id)
		return res.status(200).json({ data: message, method: 'update' })
	})
}