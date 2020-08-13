<template>

    <div class="app-main">
        <nav class="navbar navbar__menu" id="primary-navbar">
            <div class="navbar-header">
				<div style="cursor:pointer;" class="navbar-brand" @click.stop="go_home()"></div>
				<div id="langs_read">
					<img id="read_img" src="/images/read.png" style="margin-right:10px;height:30px;">
					<span id="langs_read_text">Read in:</span>
				</div>
				<div id="langs">en</div>
				<select id="langs_hide" @change.prevent="select_lang()">
					<option value="">Choose language</option>
					<option value="af">Afrikaans</option>
					<option value="am">አማርኛ</option>
					<option value="ar">العربية</option>
					<option value="az">Azərbaycan</option>
					<option value="be">беларускі</option>
					<option value="bg">български</option>
					<option value="bn">বাঙালি</option>
					<option value="bs">Bosanski</option>
					<option value="ca">Català</option>
					<option value="ceb">Cebuano</option>
					<option value="co">Corsa</option>
					<option value="cs">Česky</option>
					<option value="cy">Cymraeg</option>
					<option value="da">dansk</option>
					<option value="de">Deutsch</option>
					<option value="el">Ελληνικά</option>
					<option value="en">English</option>
					<option value="eo">Esperanto</option>
					<option value="es">Español</option>
					<option value="et">Eesti keel</option>
					<option value="eu">Euskal</option>
					<option value="fa">فارسی</option>
					<option value="fi">suomalainen</option>
					<option value="fr">Le français</option>
					<option value="fy">Frysk</option>
					<option value="ga">Gaeilge</option>
					<option value="gd">Gàidhlig</option>
					<option value="gl">Galego</option>
					<option value="gu">ગુજરાતી</option>
					<option value="ha">Gidan</option>
					<option value="haw">Hawaiian</option>
					<option value="hi">हिन्दी</option>
					<option value="hmn">Hmoob</option>
					<option value="hr">hrvatski</option>
					<option value="ht">Ayisyen</option>
					<option value="hu">magyar</option>
					<option value="hy">Հայերեն</option>
					<option value="id">Orang indonesia</option>
					<option value="ig">Igbo</option>
					<option value="is">Íslensku</option>
					<option value="it">italiano</option>
					<option value="iw">עברית</option>
					<option value="ja">日本語</option>
					<option value="jw">Jawa</option>
					<option value="ka">ქართული</option>
					<option value="kk">Қазақша</option>
					<option value="km">ភាសាខ្មែរ</option>
					<option value="kn">ಕನ್ನಡ</option>
					<option value="ko">한국어</option>
					<option value="ku">Kurdî</option>
					<option value="ky">Кыргыз</option>
					<option value="la">Latine</option>
					<option value="lb">Lëtzebuergesch</option>
					<option value="lo">ລາວ</option>
					<option value="lt">Lietuvių</option>
					<option value="lv">Latviešu valoda</option>
					<option value="mg">Malagasy</option>
					<option value="mi">Maori</option>
					<option value="mk">Македонски</option>
					<option value="ml">മലയാളം</option>
					<option value="mn">Монгол хэл дээр</option>
					<option value="mr">मराठी</option>
					<option value="ms">Melayu</option>
					<option value="mt">Malti</option>
					<option value="my">မြန်မာ</option>
					<option value="ne">नेपाली</option>
					<option value="nl">Nederlands</option>
					<option value="no">norsk</option>
					<option value="ny">Nyanja</option>
					<option value="pa">ਪੰਜਾਬੀ</option>
					<option value="pl">Polski</option>
					<option value="ps">پښتو</option>
					<option value="pt">Português</option>
					<option value="ro">românesc</option>
					<option value="ru">Русский</option>
					<option value="sd">سنڌي</option>
					<option value="si">සිංහල</option>
					<option value="sk">slovenský</option>
					<option value="sl">Slovenščina</option>
					<option value="sm">Samoa</option>
					<option value="sn">Shona</option>
					<option value="so">Soomaaliya</option>
					<option value="sq">shqiptar</option>
					<option value="sr">Сербиан</option>
					<option value="st">Soto ka boroa</option>
					<option value="su">Sunda</option>
					<option value="sv">Svenska</option>
					<option value="sw">Kiswahili</option>
					<option value="ta">தமிழ்</option>
					<option value="te">తెలుగు</option>
					<option value="tg">Тоҷикӣ</option>
					<option value="th">ไทย</option>
					<option value="tl">Filipino</option>
					<option value="tr">Türk</option>
					<option value="uk">Український</option>
					<option value="ur">اردو</option>
					<option value="uz">O'zbek</option>
					<option value="vi">Tiếng việt</option>
					<option value="xh">Spit</option>
					<option value="yi">Yiddish</option>
					<option value="yo">Yorùbá</option>
					<option value="zh">中國</option>
					<option value="zu">Zulu</option>
				</select>
				<div class="navbar-menu-btn" @click.stop="go_menu()"></div>
            </div>
            <transition mode="out-in" name="slide-fade">
                <div class="navbar-menu" v-if="menu">
					<div class="navbar-menu-info">
						<div style="padding:50px;text-align:center;"><a style="color:#0769F0;" href="https://www.instagram.com/tiggly_shmiggly" target="blank">www.instagram.com/tiggly_shmiggly</a></div>
						<div class="social" style="padding: 20px 0px 10px 0px;border-top:1px solid #0769F0;width: 100%;">
							<div style="width:50%;float:left;text-align:right"><a style="color:#0769F0;margin-right:20px;" href="/terms.html" target="blank">User Agreement</a></div>
							<div style="width:50%;float:left;"><a style="color:#0769F0;margin-left:20px;" href="/privacy.html" target="blank">Privacy Policy</a></div>
						</div>
					</div>
                    <div class="navbar-menu-links">
                        <span id="openf" @click.stop="openf()">
                            <i class="mdi mdi-star text-warning mr-2" style="margin-top:1px;"></i>
                            Favourites
                        </span>

                        <router-link :to="{ name: 'login' }" v-if="!$auth.check()" @click.native="menu = !menu">Log in / Sign in</router-link>
                        <a href="#" @click.prevent="logout()" v-if="$auth.check()">Log out</a>
                    </div>
                </div>
            </transition>
        </nav>
		<div class="main_categories owl-carousel owl-theme" style="display:none;" v-html="categoriestext"></div>
		<div v-if="main_attached" class="main_attached">
			<div style="margin-top: 5px;position: relative;">
				<div style="position: absolute;left: 10px;top:20px;"><img id="read_img" src="/images/pin_icon.png"></div>
				<div style="position: absolute;left: 40px;top:10px;width: calc(100% - 80px);">
					<div><span style="color:#3493E9;"><b>Pinned message</b></span> <span class="main_attached_time" v-html="attachedtime"></span></div>
					<div class="main_attached_text" v-html="attachedtext"></div>
				</div>
				<div @click.stop="close_attach()" style="position: absolute;top:20px;right: 10px;cursor: pointer;"><img src="/images/close.png"></div>
			</div>
		</div>
        <div class="main-background"></div>
        <keep-alive include="messages,favourites,create" max="10">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>

import SystemConst from './utils/const.js'





document.addEventListener("DOMContentLoaded", function(event) { 

	var langs_read_text = {
		af:"Lees in", 
		am:"ያንብቡ", 
		ar:"قراءة في",
		az:"Oxuyun",
		be:"чытаць у",
		bg:"Прочетете",
		bn:"পড়ুন",
		bs:"Pročitajte",
		ca:"Llegiu",
		ceb:"Basaha sa",
		co:"Leggi in",
		cs:"Číst dál",
		cy:"Darllenwch i mewn",
		da:"Læs ind",
		de:"Lesen Sie in",
		el:"Διαβάστε παρακάτω",
		en:"Read in",
		eo:"Legu en",
		es:"Leer en",
		et:"Loe",
		eu:"Irakurri",
		fa:"خواندن در",
		fi:"Lue",
		fr:"Lu dans",
		fy:"Lês yn",
		ga:"Léigh isteach",
		gd:"Leugh a-steach",
		gl:"Ler en",
		gu:"વાંચો",
		ha:"Karanta a",
		haw:"Heluhelu i loko",
		hi:"में पढ़ें",
		hmn:"Nyeem rau hauv",
		hr:"Pročitajte",
		ht:"Li nan",
		hu:"Olvassa el",
		hy:"Կարդացեք",
		id:"Baca masuk",
		ig:"Gụọ na",
		is:"Lesa inn",
		it:"Leggi dentro",
		iw:"קרא ב",
		ja:"読む",
		jw:"Maca ing",
		ka:"წაიკითხეთ",
		kk:"Оқыңыз",
		km:"អាន",
		kn:"ಓದಿ",
		ko:"읽기",
		ku:"Bixwînin",
		ky:"окуу",
		la:"read",
		lb:"Gelies",
		lo:"ອ່ານໃນ",
		lt:"Skaitykite",
		lv:"Lasīt",
		mg:"Vakio ao",
		mi:"Pānuihia",
		mk:"Прочитајте",
		ml:"വായിക്കുക",
		mn:"Уншсан",
		mr:"वाचा",
		ms:"Baca dalam",
		mt:"Aqra f",
		my:"ဖတ်",
		ne:"पढ्नु",
		nl:"Inlezen",
		no:"Les inn",
		ny:"Lowani mkati",
		pa:"ਵਿਚ ਪੜ੍ਹੋ",
		pl:"Czytaj dalej",
		ps:"لوستل",
		pt:"Ler em",
		ro:"Citiți în",
		ru:"Читать в",
		sd:"پڙهو",
		si:"කියවන්න",
		sk:"Čítajte ďalej",
		sl:"Preberite si",
		sm:"Faitau i totonu",
		sn:"Verenga mukati",
		so:"Akhri gudaha",
		sq:"Lexo në",
		sr:"Прочитајте",
		st:"Bala ho",
		su:"maca",
		sv:"Läs in",
		sw:"Soma ndani",
		ta:"படிக்கவும்",
		te:"చదువు",
		tg:"Дар бораи хондан",
		th:"อ่านใน",
		tl:"Basahin ang sa",
		tr:"Okuyun",
		uk:"Читати в",
		ur:"اندر پڑھو",
		uz:"O'qish",
		vi:"Đọc trong",
		xh:"Funda ngaphakathi",
		yi:"לייענען אין",
		yo:"Ka ninu",
		zh:"读入",
		zu:"Funda ngaphakathi"
	};

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
				
		var langs=params['lang']

	if (langs) {
		document.getElementById("langs_hide").value = langs;
		document.getElementById("langs").innerHTML = langs;
		$('#langs_read_text').html(langs_read_text[langs]);
	} else {
		if (window.location.pathname=='/') {
			var language = window.navigator ? (window.navigator.language ||
						  window.navigator.systemLanguage ||
						  window.navigator.userLanguage) : "";
			language = language.substr(0, 2).toLowerCase();
			if (language) window.location.href="/?lang="+language;
		}
	}

	$.ajax({
	  url:'/api/settings/5cc2d4d067c2ffe4d6162f58',
	  type:'GET',
	  success:function(json){

		  document.title = json.data.title;

		  //$('.navbar-header').css('background',json.data.header);


		  $('.main-background').attr('style',"background: url('"+json.data.files[1].url+"') repeat;background-size: cover;");
		  
		  if (json.data.title_site=='') {
			  $('head').append('<style>.navbar-brand:before{background: url("'+json.data.files[0].url+'") no-repeat center;background-size: cover;}</style>');
		  } else {
			   $('.navbar-brand').text(json.data.title_site);
			   $('head').append('<style>.navbar-brand:before{background: url("") no-repeat center;background-size: cover;}</style>');
			   $('.navbar-brand').attr('style','font-family: '+json.data.title_fonts+';font-size: '+json.data.title_size+';');
		  }
		  
		  
		  if (json.data.facebook!='') $('.social').append('<a style="color:#fff;" href="'+json.data.facebook+'" target="blank">'+json.data.facebook+'</a><br>');
		  if (json.data.twitter!='') $('.social').append('<a style="color:#fff;" href="'+json.data.twitter+'" target="blank">'+json.data.twitter+'</a><br>');
		  if (json.data.instagram!='') $('.social').append('<a style="color:#fff;" href="'+json.data.instagram+'" target="blank">'+json.data.instagram+'</a><br>');
			
	  }
	})	
});

export default {
    data() {
        return {
			attachedtime: null,
			attachedtext: null,
			categoriestext: null,
			categoriestextshow: false,
            menu: false,
			main_attached: false,
			main_categories: false,
            topics: SystemConst.topics
        }
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
				
		var langs=params['lang'] ? params['lang'] : 'en'

        addEventListener('click', function (e) {
            let DOMmenu = document.getElementById('primary-navbar')

            if (!DOMmenu.contains(e.target)) {
                app.menu = false
            }
        })

			await axios.get('/categories/getcategories/1')
			.then(async response => {
				let message = JSON.parse(JSON.stringify(response.data.data))

						if (params['cat']) app.categoriestext = '<div style="font-size: 14px;line-height: 20px;height: 20px;text-align:center;"><a style="text-decoration:none;color:#fff;border-radius: 12px;padding: 0px 10px 0px 10px;" href="/?lang='+langs+'">All</a></div>'
						else app.categoriestext = '<div style="font-size: 14px;line-height: 20px;height: 20px;text-align:center;"><a style="text-decoration:none;color:#bfd1ea;border-radius: 12px;padding: 0px 10px 0px 10px;" href="/?lang='+langs+'">All</a></div>'

						if (message.length) app.categoriestextshow=true;
						
						await message.forEach(async function(element, index) {

							if (params['cat'] && params['cat']==message[index]._id) {
								var style='font-size: 14px;line-height: 20px;height: 20px;text-align:center;'
								var stylea='text-decoration:none;color:#bfd1ea;padding: 0px 10px 0px 10px;';
							}
							else {
								var style='font-size: 14px;line-height: 20px;height: 20px;text-align:center;border-radius: 12px;'
								var stylea='text-decoration:none;color:#fff;padding: 0px 10px 0px 10px;';
							}
							
							if (eval('message[index].title_'+langs)==null) {
							
								var postData = {
								  lang: langs,
								  str: message[index].title
								};
								await axios.post('/messages/translationtext', postData)
									.then(async response => {
										var str = response.data.message;
										str = str.charAt(0).toUpperCase() + str.substr(1);
										eval('message[index].title_'+langs+'=str')
										await axios.post('/categories/updateones', message[index]);
										if (!app.categoriestext) app.categoriestext = '<div style="'+style+'"><a style="'+stylea+'" href="/?lang='+langs+'&cat='+message[index]._id+'">'+eval('message[index].title_'+langs)+'</a></div>'
										else app.categoriestext += '<div style="'+style+'"><a style="'+stylea+'" href="/?lang='+langs+'&cat='+message[index]._id+'">'+eval('message[index].title_'+langs)+'</a></div>'
									}).catch(function(error) {
										console.log('Error: ', error);
									});					
							} else {
								if (!app.categoriestext) app.categoriestext = '<div style="'+style+'"><a style="'+stylea+'" href="/?lang='+langs+'&cat='+message[index]._id+'">'+eval('message[index].title_'+langs)+'</a></div>'
								else app.categoriestext += '<div style="'+style+'"><a style="'+stylea+'" href="/?lang='+langs+'&cat='+message[index]._id+'">'+eval('message[index].title_'+langs)+'</a></div>'
							}

						});				

			}).catch(function(error) {
				console.log(error);
			});
			
			await axios.post('/messages/getattached')
			.then(async response => {
				let message = JSON.parse(JSON.stringify(response.data.message))
				if (message.comment) {
					app.main_attached = true
					var str = message.comment_en;
					if (langs) {
						str = eval('message.comment_'+langs);
					}
					let time = message.updated_at.split('T');
					app.attachedtext = '<a style="text-decoration:none;color:#000;" href="/'+message._id+'?lang='+langs+'">'+str+'</a>'
					app.attachedtime = time[0]
				}
			}).catch(function(error) {
				console.log(error);
			});
			
			if (app.categoriestextshow) setTimeout("$('.main_categories').show()", 2500);
			
			setInterval(async function () {
				await axios.get('/create')
					.then(async response => {
						let message = response.data.data
					
						await message.forEach(async function(element, index) {
							if (message[index].attached && new Date(message[index].attached)<=new Date()) {

								axios.post('/create/'+ message[index]._id +'/delete_one');
								window.ws.send(JSON.stringify({event: 'delete_create', data: message[index]}));
								
								message[index].create=1;
								message[index].updated_at=new Date();
								message[index].created_at=new Date();
								
								await axios.post('/messages', message[index])
								.then(response => {
								console.log(response);
									window.ws.send(JSON.stringify({event: 'create', data: response.data.data}));
									console.log(response);
								}).catch(error => {
									console.log(error);
								});
							}
						});

					}).catch(function(error) {
						console.log(error);
					});
					
			}, 60000) 	

			$('.owl-carousel').owlCarousel({
				dots: false,
				autoWidth: true,
				responsive:{
					0:{
						items:3,
						nav: false,
					},
					400:{
						items:4,
						nav: false,
					},
					600:{
						items:5,
						nav: false,
					},
					920:{
						items:7,
						nav: true,
					}
				}
			});
			
    },
    methods: {
        logout() {
            this.menu = false
            this.$auth.logout()
        },
        close_attach() {
			let app = this

			axios.post('/messages/closeattached').then(response => {
				if (response) {
				console.log(response.data.message.title);
					app.main_attached=!app.main_attached;
				}
			})	
        },		
		go_menu () {
			let app = this
			app.menu = !app.menu
		},		
		go_home () {
		
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
					
			var langs=params['lang'] ? params['lang'] : 'en'		
			window.location.href='?lang='+langs;

		},
		select_lang () {
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

			var lang = document.getElementById("langs_hide").value;

			if (lang!='') {
				if (params['cat']) {
					window.location.href=window.location.pathname+'?lang='+lang+'&cat='+params['cat'];
				} else {
					window.location.href=window.location.pathname+'?lang='+lang;
				}
			}
			else {
				if (params['cat']) {
					window.location.href=window.location.pathname+'?cat='+params['cat']; 
				} else {
					window.location.href=window.location.pathname; 
				}
			}
		},
		openf() {
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
					
			var langs=params['lang'] ? params['lang'] : 'en'	
			window.location.href = "/favourites?lang="+langs;
        },
    }
}
</script>

<style>
#openf {
	cursor:pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 50%;
    height: 32px;
    margin: 11px 0px;
    font-size: 14px;
    line-height: 21px;
    color: #007bff;
    text-align: center;
    text-decoration: none;
}

.owl-item {
	border-right:1px solid #fff;
	line-height: 20px;
    height: 20px;
    margin-top: 10px;
}

.owl-nav {
    height: 0px;
    position: relative;
    top: -45px;
}

.owl-prev {
    left: 0px;
    position: absolute;
    font-size: 25px !important;
}
	
.owl-next {
	right: 0px;
    position: absolute;
    font-size: 25px !important;
}

.owl-stage {
	display: -webkit-box;
	display: -moz-box;
	display: -ms-box;
	display: box;
	padding: 0px 10px;
}
</style>