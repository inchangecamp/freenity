const _ = require('lodash')
const _url = require('url')
const embed = require("embed-video")
const cheerio = require('cheerio')
const htmlMetadata = require('html-metadata')
const moment = require('moment')
const rp = require('request-promise')
const preq = require('preq')
const zlib = require('zlib')
const iconv = require('iconv-lite')
const detectCharacterEncoding = require('detect-character-encoding')

let response = {
    title: null,
    description: null,
    site_name: null,
    url: null,
    files: [],
    author: {},
    date: moment().format('D.M.YYYY'),
	icon: null,
}

async function returnResults(url, data, isDomainInEncodingList) {
    await getResponse(data, url, isDomainInEncodingList)
    
    return {
        response: response
    }
}

function getBuildedMetaObject(data, site_url) {
    let buildedMeta = {
        general: {},
        openGraph: {},
        twitter: {},
        schemaOrg: {}
    }

    let schemaOrg = {}

	let urls= site_url.split('/');
	let url=urls[2];	
		
    parseMetaObjects(data.schemaOrg, 'schemaOrg')

    function parseMetaObjects(item, index, prevIndex) {
        if (item instanceof Object) {
            for (let _index in item) {
                parseMetaObjects(item[_index], _index, index)
            }
        } else {
            schemaOrg[prevIndex] = item
        }
    }


    if (data.general) {
		if (url=='52.mchs.gov.ru') {
			buildedMeta.openGraph = {
				title: data.general.title,
				description: data.general.description,
				site_name: 'https://52.mchs.gov.ru/',
				url: site_url,
				image: 'https://52.mchs.gov.ru/build/img/public/logo.svg'
			}
		} else if (url=='ru-an.info') {
			buildedMeta.openGraph = {
				title: data.general.title,
				description: data.general.description,
				site_name: 'http://ru-an.info/',
				url: site_url,
				image: 'http://ru-an.info/favicon.ico'
			}
		} else {
			buildedMeta.general = {
				title: data.general.title,
				description: data.general.description,
				icon: data.general.icons[0].href
			}
		}
    }
	

    if (data.openGraph && !buildedMeta.openGraph.title) {	
		
		if (data.general.author=='NDR') {
			buildedMeta.openGraph = {
				title: data.openGraph.title,
				description: data.openGraph.description,
				site_name: 'https://www.ndr.de/',
				url: data.openGraph.url,
				image: 'https://www.ndr.de/apple-touch-icon-152x152.png'
			}
		} else if (url=='mosmetod.ru') {
			buildedMeta.openGraph = {
				title: data.openGraph.title,
				description: data.openGraph.description,
				site_name: 'https://mosmetod.ru/',
				url: data.openGraph.url,
				image: 'https://mosmetod.ru/files/icons/new_glav/224-90.png'
			}
		} else {
			buildedMeta.openGraph = {
				title: data.openGraph.title,
				description: data.openGraph.description,
				site_name: data.openGraph.site_name,
				url: data.openGraph.url,
				image: data.openGraph.image.url,
			}			
		}
    }
	
    if (data.twitter) {
        buildedMeta.twitter = {
            title: data.twitter.title,
            description: data.twitter.description,
            site: data.twitter.site,
            image: data.twitter.image
        }
    }
	
    if (schemaOrg) {
        buildedMeta.schemaOrg = {
            title: schemaOrg.name,
            description: schemaOrg.description,
            thumbnail_url: schemaOrg.thumbnailUrl,
            embed_url: schemaOrg.embedURL || schemaOrg.embedUrl,
            date: schemaOrg.datePublished
        }
    }
	
    if (data.general) {
        buildedMeta.general = {
            title: data.general.title,
            description: data.general.description,
			icon: data.general.icons[0].href
        }
    }

    return buildedMeta
}

async function getFilesObject(url, image, passedEmbed, site_name) {
    let file = []

    if (passedEmbed) {
        file = [{ type: 'iframe', url: passedEmbed, preview: image }]
    } else {
        let embedData = embed(url)

        if (embedData) {
            let embedDataIframe = cheerio.load(embedData)
            let embedDataUrl = embedDataIframe('iframe').prop('src')

            await getVideoPreview(url).then(result => {
                file = [{ type: 'iframe', url: embedDataUrl, preview: result }]
            }).catch(() => {
                file = [{ type: 'iframe', url: embedDataUrl, preview: image }]
            })
        } else {
            if (image) {
				
				if (-1 == image.indexOf('://')) {
					image = 'http://'+site_name+'/'+image
				}				
				
                file = [{ type: 'image', url: image, preview: image }]
            }
        }
    }

    return file
}

function getVideoPreview(url) {
    return new Promise((res, rej) => {
        embedImagePromise(url)
        .then(result => {
            res(result)
        })
    })
}

function embedImagePromise(url) {
    return new Promise((res, rej) => {
        embed.image(url, {image: 'mqdefault'}, function (err, thumbnail) {
            if (err) rej()
    
            res(thumbnail.src)
        })
    })
}

async function getResponse(data, url, isDomainInEncodingList) {

	urls=url.split('.');
	
	if (urls[urls.length - 1]=='jpg' || urls[urls.length - 1]=='jpeg' || urls[urls.length - 1]=='gif' || urls[urls.length - 1]=='png') {

 		response.title = null
		response.description = null
		response.url = null
		response.site_name = null
		response.author = {}
		response.files = [{ type: 'image', url: url, preview: url }]

	} else {
	let meta = getBuildedMetaObject(data, url)
	
	let title = meta.openGraph.title || meta.general.title || meta.twitter.title || meta.schemaOrg.title
	let description = meta.general.description || meta.openGraph.description || meta.twitter.description || meta.schemaOrg.description
	let image = meta.openGraph.image || meta.twitter.image || meta.schemaOrg.thumbnail_url
	let icon = meta.openGraph.icon || meta.general.icon || meta.twitter.icon || meta.schemaOrg.icon
	
	if (title) {
		if (isDomainInEncodingList)
			title = iconv.decode(new Buffer(title, 'binary'), detectCharacterEncoding(new Buffer(title, 'binary')).encoding)

		response.title = title
	} else {
		response.title = null
	}

	if (description) {
		if (isDomainInEncodingList)
			description = iconv.decode(new Buffer(description, 'binary'), detectCharacterEncoding(new Buffer(description, 'binary')).encoding)

		response.description = description
	} else {
		response.description = null
	}

	if (meta.openGraph.url) {
		response.url = meta.openGraph.url
	} else {
		response.url = url
	}

	response.site_name = _url.parse(response.url).hostname

	if (meta.twitter.site) {
		if (isDomainInEncodingList)
			meta.twitter.site = iconv.decode(new Buffer(meta.twitter.site, 'binary'), detectCharacterEncoding(new Buffer(meta.twitter.site, 'binary')).encoding)
 
		response.author = { name: meta.twitter.site, url: '//twitter.com/' + meta.twitter.site }
	} else {
		response.author = {}
	}

	if (-1 == icon.indexOf('://')) {
		response.favicon = 'http://'+response.site_name+'/'+icon
	} else response.favicon = icon
	
	let images=image;

	if (typeof image === 'object' && image !== null) images=image.src;

	response.files = await getFilesObject(response.url, images, meta.schemaOrg.embed_url, response.site_name)
	}
	
}

exports.meta = async (req, res) => {
	
	let img = false

	urls=req.body.url.split('?')[0].split('.')
	
	if (urls[urls.length - 1]=='jpg' || urls[urls.length - 1]=='jpeg' || urls[urls.length - 1]=='gif' || urls[urls.length - 1]=='png') img = true

	if (img) req.body.url=req.body.url.split('?')[0];
			
	let pageUrl = decodeURIComponent(req.body.url)
	
	if (img) {
		let response = await returnResults(pageUrl, '', false)
		res.status(200).json(response)	
	} else {
		
			
	if (_.includes(pageUrl, 'https://www.instagram.com/')) {

		response.response = {
			title: "Instagram",
			description: "",
			site_name: "https://www.instagram.com",
			url: pageUrl,
			files: [],
			author: {},
			date: moment().format('D.M.YYYY'),
			favicon: "https://www.instagram.com/static/images/ico/favicon.ico/36b3ee2d91ed.ico",
		}		
			
		let images;		
		await rp('https://api.instagram.com/oembed/?url='+pageUrl)
		.then(function(htmlString) {
			let data = JSON.parse(htmlString);
			response.response.description = data.title
			images=data.thumbnail_url;
		})
		.catch(function(error) {
		 console.log(error)
		});		

		response.response.files = [{ type: 'image', url: images, preview: images }]
			
		return res.status(200).json(response)

	} else {		

		let protocol = _.includes(pageUrl, 'https:') ? 'https' : 'http'

		if (!_.includes(pageUrl, 'https') && !_.includes(pageUrl, 'http')) {
			protocol = 'https'
			pageUrl = protocol + '://' + pageUrl
		}

		let headers = {
			'Accept-Language': 'en-EN'
		}

		if (_.includes(pageUrl, 'facebook.com')) {
			headers = {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
				'Accept-Language': 'en-EN'
			}
		}
		
		let encodingList = [
			'fontanka.ru',
			'sia.ru',
			'gazeta.ru',
			'sport-express.ru',
			'ru-an.info',
		]

		let isDomainInEncodingList = false

		encodingList.some(function (domain) {
			if (_.includes(pageUrl, domain)) {
				isDomainInEncodingList = true
			} else {
				isDomainInEncodingList = false
			}
			return _.includes(pageUrl, domain)
		})		
			
			
			rusdomain=pageUrl.split('/');
			
			if (rusdomain[2]=='www.dw.com') {
				pageUrl=encodeURI(pageUrl)
			}

			htmlMetadata({
				url: pageUrl,
				headers: headers,
				encoding: isDomainInEncodingList ? 'binary' : null
			}).then(async function (result) {
				let response = await returnResults(pageUrl, result, isDomainInEncodingList)
				res.status(200).json(response)
			}).catch(error => {
				if (error.status === 504 && protocol === 'https') {
					const httpUrl = pageUrl.replace('https:', 'http:')
					htmlMetadata({
						url: httpUrl,
						headers: headers,
						encoding: 'binary'
					}).then(async function (result) {
						let response = await returnResults(httpUrl, result)
						return res.status(200).json(response)
					}).catch(error2 => {
						error2.message = 'Unable to get data according to your request.'
						return res.status(error2.status || 400).json(error2)
					})
				}
				else {
					error.message = 'Unable to get data according to your request.'
					return res.status(error.status || 400).json(error)
				}
			})
		}
	}
}