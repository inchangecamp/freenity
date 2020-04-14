<template>

    <div class="app-main">
        <nav class="navbar navbar__menu" id="primary-navbar">
            <div class="navbar-header">
			
                <div class="d-flex align-items-center" @click="go_home()" style="position:relative;z-index:10;">
                    <i class="mdi mdi-arrow-left" style="font-size:24px;"></i>
                    <span class="ml-2">Back</span>
                </div>
			
				<div class="title_create" v-if="$auth.check(['editor'])">Suggest</div>
				<div class="title_create" v-else>Suggested posts</div>
			
				<div id="langs_create" @click.stop="select_show()">en</div>
				<select id="langs_create_hide" @change.prevent="select_lang()">
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
            </div>
        </nav>
        <div class="main-background-create"></div>

        <keep-alive include="messages,favourites,create" max="10">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import SystemConst from './utils/const.js'

document.addEventListener("DOMContentLoaded", function(event) { 

	var urls=window.location.href.split("?");
	if (urls[1]) {
		var url=urls[1].split("=");
		if (url[0]=='lang') {
			document.getElementById("langs_create_hide").value = url[1];
			document.getElementById("langs_create").innerHTML = url[1];
		}
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
            topics: SystemConst.topics
        }
    },
    methods: {
		go_home () {
			var urls=window.location.href.split("?");
			if (urls[1]) {
				var url=urls[1].split("=");
				if (url[0]=='lang') {
					if (url[1]!='') window.location.href='?lang='+url[1];
					else window.location.href='/'; 
				}
			} else 	window.location.href='/'; 
		},
		select_lang () {
			var lang = document.getElementById("langs_create_hide").value;
			var urls = window.location.href.split("/");
			if (lang!='') window.location.href=window.location.pathname+'?lang='+lang;
			else window.location.href=window.location.pathname; 
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
    color: #fff;
    text-align: center;
    text-decoration: none;
}
</style>