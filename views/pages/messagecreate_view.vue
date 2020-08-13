<template>
    <div class="message-view" v-if="message">
        <nav class="navbar2">
            <div class="navbar-header2">

                <div class="d-flex align-items-center" style="color:#000000;" @click="$router.back()">
                    <i class="mdi mdi-arrow-left" style="font-size:24px;"></i>
                    <span class="ml-2">Back</span>
                </div>

                <div class="d-flex align-items-center ml-auto" v-if="message">
                    <a class="btn btn-secondary mr-3 ml-3" :href="message.url" target="_blank" v-if="message.url">open it in a new window</a>

                </div>       

            </div>
        </nav>
			
		<iframe 
            style="width: 100%;height: calc(100vh - 140px);border: none;" 
            scrolling="yes" 
            frameborder="0" 
            allowTransparency="true" 
            allow="encrypted-media" 
			id="iframe"></iframe>

			
		<div v-show="fons" style="position: fixed;z-index: 103;top: 0px;left: 0px;width: 100%;height: 100%;background: #ffffff;opacity: 0.9;"></div>
		<div v-show="loads" class="loader">
			<div class="laoder-frame">
				<img class="svg-loader" src="/images/loader.svg" alt="circle-loader">
			</div>
		</div>
		
    </div>
</template>
<script>
export default {
    data() {
        return {
            message: null,
			fons: null,
			loads: null
        }
    },
    created() {
        setTimeout(function () {
            window.scrollTo(0, 0)
        }, 300)
    },
    async mounted() {
        let app = this

		var params = window
		.location
		.search
		.replace('?','')
		.split('&')
		.reduce(
			function(p,e){
				var a = e.split('=');
				p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
				return p;
			},
			{}
		);
				
		var lang=params['lang'] ? params['lang'] : 'en'

        await axios.get('/create/' + app.$route.params.id)
        .then(async response => {
            app.message = response.data.data
			app.message.lang=lang;
			if (eval('app.message.is_files_'+lang+'')!=1) {
				app.fons = !app.fons
				app.loads = !app.loads

				var postData = {
				  lang: lang,
				  str: app.message.title
				};
				await axios.post('/messages/translationtext', postData)
					.then(async response => {
						eval('app.message.title_'+lang+'=response.data.message')
						if (app.message.url && app.message.site_name!='Instagram'&& app.message.site_name!='www.instagram.com' && app.message.site_name!='YouTube' && app.message.site_name!='www.facebook.com' && app.message.site_name!='vk.com') {
						await axios.post('/messages/translationfile', app.message)
							.then(response => {
								var str= response.data.message.replace(/"/g,"'")
								app.fons = null
								app.loads = null
								eval('app.message.is_files_'+lang+'="1"')

								if (lang=='af') app.message.article_af=str
								if (lang=='am') app.message.article_am=str
								if (lang=='ar') app.message.article_ar=str
								if (lang=='az') app.message.article_az=str
								if (lang=='be') app.message.article_be=str
								if (lang=='bg') app.message.article_bg=str
								if (lang=='bn') app.message.article_bn=str
								if (lang=='bs') app.message.article_bs=str
								if (lang=='ca') app.message.article_ca=str
								if (lang=='ceb') app.message.article_ceb=str
								if (lang=='co') app.message.article_co=str
								if (lang=='cs') app.message.article_cs=str
								if (lang=='cy') app.message.article_cy=str
								if (lang=='da') app.message.article_da=str
								if (lang=='de') app.message.article_de=str
								if (lang=='el') app.message.article_el=str
								if (lang=='en') app.message.article_en=str
								if (lang=='eo') app.message.article_eo=str
								if (lang=='es') app.message.article_es=str
								if (lang=='et') app.message.article_et=str
								if (lang=='eu') app.message.article_eu=str
								if (lang=='fa') app.message.article_fa=str
								if (lang=='fi') app.message.article_fi=str
								if (lang=='fr') app.message.article_fr=str
								if (lang=='fy') app.message.article_fy=str
								if (lang=='ga') app.message.article_ga=str
								if (lang=='gd') app.message.article_gd=str
								if (lang=='gl') app.message.article_gl=str
								if (lang=='gu') app.message.article_gu=str
								if (lang=='ha') app.message.article_ha=str
								if (lang=='haw') app.message.article_haw=str
								if (lang=='hi') app.message.article_hi=str
								if (lang=='hmn') app.message.article_hmn=str
								if (lang=='hr') app.message.article_hr=str
								if (lang=='ht') app.message.article_ht=str
								if (lang=='hu') app.message.article_hu=str
								if (lang=='hy') app.message.article_hy=str			
								if (lang=='id') app.message.article_id=str
								if (lang=='ig') app.message.article_ig=str
								if (lang=='is') app.message.article_is=str
								if (lang=='it') app.message.article_it=str
								if (lang=='iw') app.message.article_iw=str
								if (lang=='ja') app.message.article_ja=str
								if (lang=='jw') app.message.article_jw=str
								if (lang=='ka') app.message.article_ka=str
								if (lang=='kk') app.message.article_kk=str
								if (lang=='km') app.message.article_km=str
								if (lang=='kn') app.message.article_kn=str
								if (lang=='ko') app.message.article_ko=str
								if (lang=='ku') app.message.article_ku=str
								if (lang=='ky') app.message.article_ky=str
								if (lang=='la') app.message.article_la=str
								if (lang=='lb') app.message.article_lb=str
								if (lang=='lo') app.message.article_lo=str
								if (lang=='lt') app.message.article_lt=str
								if (lang=='lv') app.message.article_lv=str
								if (lang=='mg') app.message.article_mg=str
								if (lang=='mi') app.message.article_mi=str
								if (lang=='mk') app.message.article_mk=str
								if (lang=='ml') app.message.article_ml=str
								if (lang=='mn') app.message.article_mn=str
								if (lang=='mr') app.message.article_mr=str
								if (lang=='ms') app.message.article_ms=str
								if (lang=='mt') app.message.article_mt=str
								if (lang=='my') app.message.article_my=str
								if (lang=='ne') app.message.article_ne=str
								if (lang=='nl') app.message.article_nl=str
								if (lang=='no') app.message.article_no=str
								if (lang=='ny') app.message.article_ny=str
								if (lang=='pa') app.message.article_pa=str
								if (lang=='pl') app.message.article_pl=str
								if (lang=='ps') app.message.article_ps=str
								if (lang=='pt') app.message.article_pt=str
								if (lang=='ro') app.message.article_ro=str
								if (lang=='ru') app.message.article_ru=str
								if (lang=='sd') app.message.article_sd=str
								if (lang=='si') app.message.article_si=str
								if (lang=='sk') app.message.article_sk=str
								if (lang=='sl') app.message.article_sl=str
								if (lang=='sm') app.message.article_sm=str
								if (lang=='sn') app.message.article_sn=str
								if (lang=='so') app.message.article_so=str
								if (lang=='sq') app.message.article_sq=str
								if (lang=='sr') app.message.article_sr=str
								if (lang=='st') app.message.article_st=str
								if (lang=='su') app.message.article_su=str
								if (lang=='sv') app.message.article_sv=str
								if (lang=='sw') app.message.article_sw=str
								if (lang=='ta') app.message.article_ta=str
								if (lang=='te') app.message.article_te=str
								if (lang=='tg') app.message.article_tg=str
								if (lang=='th') app.message.article_th=str
								if (lang=='tl') app.message.article_tl=str
								if (lang=='tr') app.message.article_tr=str
								if (lang=='uk') app.message.article_uk=str
								if (lang=='ur') app.message.article_ur=str
								if (lang=='uz') app.message.article_uz=str
								if (lang=='vi') app.message.article_vi=str
								if (lang=='xh') app.message.article_xh=str
								if (lang=='yi') app.message.article_yi=str
								if (lang=='yo') app.message.article_yo=str
								if (lang=='zh') app.message.article_zh=str
								if (lang=='zu') app.message.article_zu=str
								
								var iframe = document.getElementById('iframe5');
								iframe.src = iframe.src;
							}).catch(function(error) {
								console.log(error);
								app.fons = null
								app.loads = null
							});
						} else {
							app.fons = null
							app.loads = null
						}
					}).catch(function(error) {
						console.log(error);
						app.fons = null
						app.loads = null
					});	
			
				
			}
		})

			if (app.getHostName(app.message.url) == 'facebook.com' || app.getHostName(app.message.url) == 'www.facebook.com') {

				await axios.get('http://www.develop4851.com:3000/fb.html')
				.then(async response => {
					console.log(response);
					var str = response.data.replace("URL_FB",app.message.url)
					$('#iframe').attr('srcdoc',str)

				})

			} else if (app.message.site_name == 'Instagram' || app.message.site_name == 'www.instagram.com') {

				let url='https://api.instagram.com/oembed/?url='+app.message.url;
				await fetch(url)
				.then(function(res) {
				  return res.json();
				}).then(async function(json) {

					$('#iframe').attr('srcdoc','<div style="width: 326px;margin:0 auto;">'+json.html+'</div>');
					
				})
				.catch(function(error) {
				  console.log('Error: ', error);
				});						
				
				
			} else if (app.message.site_name == 'vk.com') {

				var q=app.message.url
				var urls=q.split('https://vk.com/wall')
				var url=urls[1].split('_')		
			
				await axios.get('http://www.develop4851.com:3000/vk.html')
				.then(async response => {

					var str = response.data.replace("VK_url0",url[0])
					var str =str.replace("VK_url1",url[1])
					
					$('#iframe').attr('srcdoc',str)

				})
				
			} else if (app.message.site_name == 'Eurosport' || app.message.site_name == 'www.fontanka.ru' || app.message.site_name == 'www.gazeta.ru' || app.message.site_name == 'echo.msk.ru') {
				$('#iframe').attr('src',app.message.url);
			} else if (app.message.embed) {
				$('#iframe').attr('src',app.message.embed);
			} else {

				$('#iframe').attr('srcdoc',eval('app.message.article_'+lang));

			}
    },
    methods: {
        getHostName(url) {
            var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
            if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
            }
            else {
                return null;
            }
        }
    }
}

</script>
<style lang="scss" scoped>
    .navbar {
        top: 70px;
    }

    .message-view {
        width: 100%;
        max-width: 920px;
        height: 91vh;
        background: #fff;
        position: sticky;
        top: 0;
    }
	@media screen and (max-width: 500px) {
		.message-view {
			height: 100%;
		}
	}
    iframe {
        width: 100%;
        height: calc(100vh - 140px);
        border: none;
    }
	
	.loader {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 1000;
	}
	 
	.laoder-frame {
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		height: 100vh;
	}
	 
	.svg-loader {
		width: 110px;
		-webkit-animation: svg-loader 1s linear infinite;
		animation: svg-loader 1s linear infinite;
	}
	 
	@-webkit-keyframes svg-loader {
		from {
			-webkit-transform: rotate(0);
			transform: rotate(0)
		}
		to {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg)
		}
	}
	 
	@keyframes svg-loader {
		from {
			-ms-transform: rotate(0);
			-webkit-transform: rotate(0);
			transform: rotate(0)
		}
		to {
			-ms-transform: rotate(360deg);
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg)
		}
	}
</style>


