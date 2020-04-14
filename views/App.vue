<template>

    <div class="app-main">
        <nav class="navbar navbar__menu" id="primary-navbar">
            <div class="navbar-header">
				<div style="cursor:pointer;" class="navbar-brand" @click.stop="go_home()">
					<div class="title_site">Parallel Iran</div>
				</div>
				<div id="langs" @click.stop="select_show()">en</div>
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
						<div v-if="description_af" style="padding:10px;text-align:center;">Vrywilligers brandbestryders Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk en ander Eenhede werk regdeur die Irkutsk-streek! Dra by tot die blus van brande in nedersettings en woude!</div>
						<div v-if="description_am" style="padding:10px;text-align:center;">የበጎ ፈቃደኞች የእሳት አደጋ ተከላካዮች ኢርኩትስክ ፣ አንሻርክክ ፣ lekልሎቭ ፣ ኡsolye-Sibirskoye ፣ Slyudyanka ፣ Bratsk እና ሌሎችም ዩኒቶች በመላው የኢርኩትስክ ክልል ውስጥ ይሰራሉ! በሰፈሮች እና ደኖች ውስጥ እሳትን ለማጥፋት አስተዋፅ በማድረግ ላይ!</div>
						<div v-if="description_ar" style="padding:10px;text-align:center;">رجال الإطفاء المتطوعون إيركوتسك وأنغارسك وشيليكوف ويوسولي سيبيرسكوي وسليوديانكا وباتسك وغيرها تعمل الوحدات في جميع أنحاء منطقة إيركوتسك! المساهمة في إطفاء الحرائق في المستوطنات والغابات!</div>
						<div v-if="description_az" style="padding:10px;text-align:center;">Könüllü yanğınsöndürənlər İrkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk və başqaları.Erkutsk vilayətində bölmələr işləyir! Yaşayış məntəqələrində və meşələrdə yanğınların söndürülməsinə töhfə!</div>
						<div v-if="description_be" style="padding:10px;text-align:center;">Добраахвотныя пажарныя Іркуцк, Ангарск, Шелехов, Усолье-Сібірскае, Слюдянка, Братск і інш. Атрады працуюць па ўсёй Іркуцкай вобласці! Садзейнічанне тушэння пажараў у населеных пунктах і лясах!</div>
						<div v-if="description_bg" style="padding:10px;text-align:center;">Доброволческите пожарникари Иркутск, Ангарск, Шелехов, Усолье-Сибирское, Слюдянка, Братск и др. Отделите работят в цялата Иркутска област! Принос за гасене на пожари в населени места и гори!</div>
						<div v-if="description_bn" style="padding:10px;text-align:center;">স্বেচ্ছাসেবক দমকলকর্মী ইরকুটস্ক, আঙ্গারস্ক, শেলেখভ, উসোলিয়ে-সিবির্স্কয়, স্লিউডায়াঙ্কা, ব্রাৎস্ক এবং অন্যান্যরা। ইরকুটস্ক অঞ্চল জুড়ে ইউনিট কাজ করে! জনবসতি ও বনাঞ্চলে আগুন নিভানোর ক্ষেত্রে অবদান!</div>
						<div v-if="description_bs" style="padding:10px;text-align:center;">Dobrovoljni vatrogasci Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk i dr. Jedinice djeluju na cijelom području Irkutska! Doprinos gašenju požara u naseljima i šumama!</div>
						<div v-if="description_ca" style="padding:10px;text-align:center;">Bombers voluntaris Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk i altres. Les unitats funcionen a tota la regió d'Irkutsk Contribuïu a apagar incendis en assentaments i boscos!</div>
						<div v-if="description_ceb" style="padding:10px;text-align:center;">Ang mga bombero sa boluntaryo nga si Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk ug uban pa.Nagtrabaho ang mga yunit sa tibuuk nga rehiyon sa Irkutsk! Nag-ambag sa pagpuo sa mga sunog sa mga lugar ug mga kalasangan!</div>
						<div v-if="description_co" style="padding:10px;text-align:center;">Pompieri vuluntarii Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk è altri. L'unità funziona in tutta a regione Irkutsk! Cuntribuisci à stingà l'incendii in i tarritorii è in e fureste!</div>
						<div v-if="description_cs" style="padding:10px;text-align:center;">Dobrovolní hasiči Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk a další. Jednotky pracují v celém Irkutském regionu! Přispívání k hašení požárů v osadách a lesích!</div>
						<div v-if="description_cy" style="padding:10px;text-align:center;">Diffoddwyr tân gwirfoddol Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk ac eraill. Mae unedau'n gweithio ledled rhanbarth Irkutsk! Cyfrannu at ddiffodd tanau mewn aneddiadau a choedwigoedd!</div>
						<div v-if="description_da" style="padding:10px;text-align:center;">Frivillige brandmænd Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk m.fl. Enheder fungerer i hele Irkutsk-regionen! Bidrag til slukning af ild i bosættelser og skove!</div>
						<div v-if="description_de" style="padding:10px;text-align:center;">Freiwillige Feuerwehrleute Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk und andere Einheiten arbeiten in der gesamten Region Irkutsk! Beitrag zum Löschen von Bränden in Siedlungen und Wäldern!</div>
						<div v-if="description_el" style="padding:10px;text-align:center;">Εθελοντές πυροσβέστες Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk και άλλα. Οι μονάδες λειτουργούν σε όλη την περιοχή του Irkutsk! Συμβολή στην κατάσβεση πυρκαγιών σε οικισμούς και δάση!</div>
						<div v-if="description_en" style="padding:10px;text-align:center;">Volunteer firefighters Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk and others. Units work throughout the Irkutsk region! Contributing to extinguishing fires in settlements and forests!</div>					
						<div v-if="description_eo" style="padding:10px;text-align:center;">Volontuloj de fajrobrigadistoj Irkutsk, Angarsk, Ŝlekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk kaj aliaj. Unuoj funkcias tra la tuta regiono Irkutsk! Kontribuu al estingado de fajroj en setlejoj kaj arbaroj!</div>	
						<div v-if="description_es" style="padding:10px;text-align:center;">Bomberos voluntarios Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk y otros. ¡Las unidades trabajan en toda la región de Irkutsk! ¡Contribuyendo a extinguir incendios en asentamientos y bosques!</div>	
						<div v-if="description_et" style="padding:10px;text-align:center;">Vabatahtlikud tuletõrjujad Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk jt. Üksused töötavad kogu Irkutski piirkonnas! Panustamine tulekahjude kustutamisse asulates ja metsades!</div>	
						<div v-if="description_eu" style="padding:10px;text-align:center;">Suhiltzaile boluntarioak Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk eta beste ... Unitateek Irkutsk eskualdean lan egiten dute! Establezimenduetan eta basoetan suteak itzaltzen lagundu!</div>	
						<div v-if="description_fa" style="padding:10px;text-align:center;">آتش نشانان داوطلب Irkutsk ، Angarsk ، Shelekhov ، Usolye-Sibirskoye ، Slyudyanka ، Bratsk و دیگران. یگان ها در سراسر منطقه Irkutsk کار می کنند! کمک به خاموش کردن آتش سوزی در شهرک ها و جنگل ها!</div>	
						<div v-if="description_fi" style="padding:10px;text-align:center;">Vapaaehtoiset palomiehet Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk ja muut.Yksiköt työskentelevät koko Irkutskin alueella! Osallistuminen tulipalojen sammuttamiseen asutuskeskuksissa ja metsissä!</div>	
						<div v-if="description_fr" style="padding:10px;text-align:center;">Pompiers volontaires Irkoutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk et autres.Les unités travaillent dans toute la région d'Irkoutsk! Contribuer à l'extinction des incendies dans les colonies et les forêts!</div>	
						<div v-if="description_fy" style="padding:10px;text-align:center;">Frijwilliger brânwachtminsken Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk en oaren.Eenheden wurkje yn 'e regio Irkutsk! Bydrage oan it blussen fan brannen yn delsettingen en bosken!</div>	
						<div v-if="description_ga" style="padding:10px;text-align:center;">Comhraiceoirí dóiteáin deonacha Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk agus daoine eile.Tá aonaid ag obair ar fud réigiún Irkutsk! Cur le dóiteáin a mhúchadh i lonnaíochtaí agus i bhforaoisí!</div>			
						<div v-if="description_gd" style="padding:10px;text-align:center;">Luchd-smàlaidh saor-thoileach Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk agus feadhainn eile. Bidh aonadan ag obair air feadh sgìre Irkutsk! A ’cur ri bhith a’ cuir às do theintean ann am bailtean agus ann an coilltean!</div>
						<div v-if="description_gl" style="padding:10px;text-align:center;">Bombeiros voluntarios Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk e outros. As unidades funcionan en toda a rexión de Irkutsk. Contribuíndo a apagar lumes en asentamentos e bosques!</div>
						<div v-if="description_gu" style="padding:10px;text-align:center;">સ્વયંસેવક અગ્નિશામકો ઇર્કુટ્સ્ક, અંગાર્સ્ક, શેલેખોવ, યુસોલયે-સિબિર્સ્કોયે, સ્લ્યુડ્યાંકા, બ્રેત્સ્ક અને અન્ય. વસાહતો અને જંગલોમાં આગ બુઝાવવામાં ફાળો આપવો!</div>
						<div v-if="description_ha" style="padding:10px;text-align:center;">Masu aikin kashe gobara a Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk da sauransu ungwanni suna aiki a duk yankin Irkutsk! Ba da gudummawa don kashe gobara a mazauna da gandun daji!</div>
						<div v-if="description_haw" style="padding:10px;text-align:center;">Kahiā ahi ahi Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk a me nā mea hou aku i hana ʻia ma nā wahi o Irkutsk! Ke hāʻawi nei i ka hoʻopau ʻana i ke ahi ahi i nā noho ʻana a me nā ulu lāʻau!</div>
						<div v-if="description_hi" style="padding:10px;text-align:center;">स्वयंसेवक अग्निशामक इर्कुत्स्क, एंगार्स्क, शेल्खोव, उस्लोइ-सिबिरस्कॉय, स्लीयुडायंका, ब्रात्स्क और अन्य इकाइयां पूरे इर्कुत्स्क क्षेत्र में काम करती हैं! बस्तियों और जंगलों में आग बुझाने में योगदान!</div>
						<div v-if="description_hmn" style="padding:10px;text-align:center;">Cov neeg ua haujlwm pab dawb tua hluav taws Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk thiab lwm yam Kev ua haujlwm nyob thoob plaws thaj av Irkutsk! Nrog rau kev tua hluav taws hauv kev hais daws thiab hav zoov!</div>
						<div v-if="description_hr" style="padding:10px;text-align:center;">Dobrovoljni vatrogasci Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk i dr. Jedinice djeluju na cijelom području Irkutska! Doprinos gašenju požara u naseljima i šumama!</div>
						<div v-if="description_ht" style="padding:10px;text-align:center;">Ponpye volontè Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk ak lòt moun .. Inite travay nan tout rejyon Irkutsk! Kontribye pou etenn dife nan koloni ak forè!</div>
						<div v-if="description_hu" style="padding:10px;text-align:center;">Irkutszk, Angarsk, Selekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk és mások önkéntes tűzoltók. Az egységek az Irkutszki régió egész területén működnek! Hozzájárulás a tűz oltásához településeken és erdőkben!</div>
						<div v-if="description_hy" style="padding:10px;text-align:center;">Կամավորական հրշեջներ Իրկուտսկը, Անգարսկը, Շելեխովը, Ուսոլյե-Սիբիրսկոյը, Սլյուդյանկան, Բրատսկը և այլք: Միավորները աշխատում են Իրկուտսկի ամբողջ տարածքում: Նպաստելով բնակավայրերում և անտառներում հրդեհների մարմանը:</div>
						<div v-if="description_id" style="padding:10px;text-align:center;">Pemadam kebakaran sukarela Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk, dan lainnya. Unit bekerja di seluruh wilayah Irkutsk! Berkontribusi untuk memadamkan api di pemukiman dan hutan!</div>
						<div v-if="description_ig" style="padding:10px;text-align:center;">Ndị ọrụ mgbanyụ ọkụ na-ere ọkụ na-arụ ọrụ Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk na ndị ọzọ. Ngalaba na-arụ ọrụ na mpaghara Irkutsk niile! Na-enye aka n'ịkagbu ọkụ na ógbè na oke ọhịa!</div>
						<div v-if="description_is" style="padding:10px;text-align:center;">Sjálfboðaliðar slökkviliðsmanna Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk og fleiri.Einingar starfa á öllu Irkutsk svæðinu! Stuðla að því að slökkva elda í byggð og skógum!</div>
						<div v-if="description_it" style="padding:10px;text-align:center;">Pompieri volontari Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk e altri: le unità lavorano in tutta la regione di Irkutsk! Contribuire a spegnere gli incendi negli insediamenti e nelle foreste!</div>
						<div v-if="description_iw" style="padding:10px;text-align:center;">צוותי כיבוי אש מתנדבים אירקוטסק, אנגרסק, שלכוב, אוסוליה-סיבירסקויה, סליודיאנקה, ברצק ואחרים. יחידות עובדות בכל אזור אירקוצק! תרומה לכיבוי שריפות ביישובים ויערות!</div>
						<div v-if="description_ja" style="padding:10px;text-align:center;">ボランティアの消防士イルクーツク、アンガルスク、シェレホフ、ウソリエ・シビルスコエ、スリュジャンカ、ブラツクなど。 集落や森林での消火に貢献！</div>
						<div v-if="description_jw" style="padding:10px;text-align:center;">Petugas pemadam kebakaran sukarela Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk lan liya-liyane .Kerja kerja ing wilayah Irkutsk! Kontribusi kanggo mateni kobongan ing pamukiman lan alas!</div>
						<div v-if="description_ka" style="padding:10px;text-align:center;">მოხალისე მეხანძრეები ირკუტსკი, ანგარსკი, შელეხოვი, უსოლიე-სიბირსკოი, სლიუდიანკა, ბრატსკი და სხვ. დასახლებაში და ტყეებში ხანძრის ჩაქრობას უწყობს ხელს!</div>
						<div v-if="description_kk" style="padding:10px;text-align:center;">Еркімен өрт сөндірушілер Иркутск, Ангарск, Шелехов, Усолье-Сибирское, Слюдянка, Братск және басқалары Иркутск аймағында бөлімшелер жұмыс істейді! Елді мекендер мен ормандардағы өртті сөндіруге өз үлестеріңізді қосасыздар!</div>		
						<div v-if="description_km" style="padding:10px;text-align:center;">អ្នកពន្លត់អគ្គីភ័យស្ម័គ្រចិត្ត Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk និងអ្នកផ្សេងទៀតធ្វើការនៅទូទាំងតំបន់ Irkutsk! ចូលរួមចំណែកក្នុងការពន្លត់អគ្គិភ័យនៅក្នុងកន្លែងតាំងទីលំនៅនិងព្រៃឈើ!</div>
						<div v-if="description_kn" style="padding:10px;text-align:center;">ಸ್ವಯಂಸೇವಕ ಅಗ್ನಿಶಾಮಕ ದಳದವರು ಇರ್ಕುಟ್ಸ್ಕ್, ಅಂಗಾರ್ಸ್ಕ್, ಶೆಲೆಖೋವ್, ಉಸೊಲಿ-ಸಿಬಿರ್ಸ್ಕೊಯ್, ಸ್ಲ್ಯುಡಿಯಾಂಕಾ, ಬ್ರಾಟ್ಸ್ಕ್ ಮತ್ತು ಇತರರು. ಇರ್ಕುಟ್ಸ್ಕ್ ಪ್ರದೇಶದಾದ್ಯಂತ ಘಟಕಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ! ವಸಾಹತುಗಳು ಮತ್ತು ಕಾಡುಗಳಲ್ಲಿನ ಬೆಂಕಿಯನ್ನು ನಂದಿಸಲು ಕೊಡುಗೆ!</div>
						<div v-if="description_ko" style="padding:10px;text-align:center;">자원 봉사 소방관 이르쿠츠크, 안 가르 스크, 셀렉 호프, 우솔 리에시 비르 스코 예, 슬라 유 얀카, 브라츠 크 등 부대는 이르쿠츠크 지역 전역에서 활동합니다! 정착촌과 숲에서 화재를 진압하는 데 기여합니다!</div>
						<div v-if="description_ku" style="padding:10px;text-align:center;">Karmendên agirkuj ên dilxwaz Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk û hwd .. Yekîneyên li seranserê herêma Irkutsk dixebitin! Beşdariyê di şewitandina agiran de li cîwar û daristanan!</div>
						<div v-if="description_ky" style="padding:10px;text-align:center;">Ыктыярдуу өрт Иркутск, Ангарск, Бол.голы, Джалал-Сибирский, Слюдянка, Братск, жана башкалар. Аскерлери Иркутск облусунун боюнча иштеп жатат! Шаарларда жана токой өрт өчүрүү жылдыруу!</div>
						<div v-if="description_la" style="padding:10px;text-align:center;">Sparteoli excitabuntur voluntariis Irkutsk, Angarsk, Shelekhov, Usolye-Siberian, Slyudyanka, Bratsk et aliis. De militum Irkutsk es opus per regionem? Exstinctis ignibus promotionem saltibus castella;</div>
						<div v-if="description_lb" style="padding:10px;text-align:center;">Fräiwëlleg Pompjeeë Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk an anerer .. Eenheeten schaffen an der ganzer Irkutsk Regioun! Bäidroen fir Feierläscher a Siedlungen a Bëscher ze drecken!</div>
						<div v-if="description_lo" style="padding:10px;text-align:center;">ນັກດັບເພີງອາສາສະ ໝັກ Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk ແລະ ໜ່ວຍ ງານອື່ນໆເຮັດວຽກຢູ່ທົ່ວພາກພື້ນ Irkutsk! ປະກອບສ່ວນເຂົ້າໃນການດັບໄຟໃນສະຖານທີ່ຕັ້ງຖິ່ນຖານແລະປ່າໄມ້!</div>
						<div v-if="description_lt" style="padding:10px;text-align:center;">Savanoriai ugniagesiai Irkutskas, Angarskas, Šelekhovas, Usolye-Sibirskoje, Slyudyanka, Bratskas ir kiti. Vienetai dirba visame Irkutsko srityje! Prisidėkime prie gaisrų gesinimo gyvenvietėse ir miškuose!</div>
						<div v-if="description_lv" style="padding:10px;text-align:center;">Brīvprātīgie ugunsdzēsēji Irkutska, Angarska, Šeļehova, Usolje-Sibirskoje, Sludjaņka, Bratska un citi.vienības darbojas visā Irkutskas apgabalā! Ieguldījums ugunsgrēku dzēšanā apmetnēs un mežos!</div>
						<div v-if="description_mg" style="padding:10px;text-align:center;">Ireo mpamono afo an-tsitrapo Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk sy ny hafa. Ireo sampana miasa manerana ny faritra Irkutsk! Manampy amin'ny famonoana afo amin'ny toeram-ponenana sy ala!</div>
						<div v-if="description_mi" style="padding:10px;text-align:center;">He kaipatu ahi ki a Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk me etahi atu.Ko nga waahanga e mahi ana puta noa i te rohe o Irkutsk! Te kawe i te ahi ki nga whakataunga me nga ngahere!</div>
						<div v-if="description_mk" style="padding:10px;text-align:center;">Волонтерски пожарникари Иркутск, Ангарск, Шелехов, Усоyeе-Сибирској, Слиудијанка, Братск и други. Единици работат низ целиот регион Иркутск! Придонесувате за гаснење на пожарите во населбите и шумите!</div>
						<div v-if="description_ml" style="padding:10px;text-align:center;">വൊളന്റിയർ അഗ്നിശമന സേനാംഗങ്ങളായ ഇർകുട്‌സ്ക്, അങ്കാർസ്‌ക്, ഷെലെഖോവ്, ഉസോലി-സിബിർസ്‌കോയ്, സ്ലുഡ്യങ്ക, ബ്രാറ്റ്‌സ്‌ക് തുടങ്ങിയവർ. വാസസ്ഥലങ്ങളിലും വനങ്ങളിലും തീ കെടുത്താൻ സംഭാവന!</div>
						<div v-if="description_mn" style="padding:10px;text-align:center;">Сайн дурын гал сөнөөгчид Иркутск, Ангарск, Шелехов, Усолье-Сибирское, Слюдянка, Братск ба бусад нь Эрхүүгийн бүс нутагт ажилладаг. Суурин болон ойд гарсан түймрийг унтраахад хувь нэмрээ оруулна уу!</div>
						<div v-if="description_mr" style="padding:10px;text-align:center;">स्वयंसेवक अग्निशामक कर्मचारी इर्कुत्स्क, अंगार्स्क, शेलेखॉव्ह, उसोल्ले-सिबिरस्कॉए, स्ल्युड्यांका, ब्रॅत्स्क आणि इतर. वस्त्यांमध्ये व जंगलांमध्ये आग विझविण्यास हातभार लावत आहे!</div>
						<div v-if="description_ms" style="padding:10px;text-align:center;">Sukarelawan relawan Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk dan lain-lain. Unit bekerja di seluruh rantau Irkutsk! Menyumbang untuk memadamkan api di penempatan dan hutan!</div>
						<div v-if="description_mt" style="padding:10px;text-align:center;">Pompieri volontarji Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk u oħrajn. L-unitajiet jaħdmu fir-reġjun Irkutsk! Tikkontribwixxi għat-tifi tan-nirien fl-insedjamenti u l-foresti!</div>
						<div v-if="description_my" style="padding:10px;text-align:center;">Isolye-Sibirskoye, Slyudyanka, Bratsk နှင့်အခြားသူများအတွက်စေတနာ့ဝန်ထမ်းမီးသတ်သမားများ။ ယူနစ်များသည် Irkutsk ဒေသတစ်လျှောက်တွင်အလုပ်လုပ်သည်။ ကျေးရွာများနှင့်သစ်တောများတွင်မီးငြိမ်းသတ်ခြင်းအတွက်ကူညီခြင်း။</div>
						<div v-if="description_ne" style="padding:10px;text-align:center;">स्वयम्सेवक अग्निशमन इरकुत्स्क, अंगार्स्क, शेलेखोभ, उसोल्इ-सिबर्स्की, स्ल्युड्यांका, ब्रात्स्क र अन्य। इरकुत्स्क क्षेत्रभरि इकाईहरूले काम गर्छन्! बसोबास र जंगलमा आगो निभाउन योगदान!</div>
						<div v-if="description_nl" style="padding:10px;text-align:center;">Vrijwillige brandweerlieden Irkoetsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk enz. Eenheden werken in de hele regio Irkoetsk! Bijdragen aan het blussen van branden in nederzettingen en bossen!</div>
						<div v-if="description_no" style="padding:10px;text-align:center;">Frivillige brannmenn Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk m.fl. Enheter jobber i hele Irkutsk-regionen! Bidra til å slukke branner i bosetninger og skoger!</div>
						<div v-if="description_ny" style="padding:10px;text-align:center;">Ozimitsa moto odzipereka odzifunira Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk ndi ena. Mayunitsi amagwira ntchito kudera la Irkutsk! Kuthandizira kuzimitsa moto m'malo okhala ndi nkhalango!</div>
						<div v-if="description_pa" style="padding:10px;text-align:center;">ਵਾਲੰਟੀਅਰ ਫਾਇਰ ਫਾਈਟਰਜ਼ ਇਰਕੁਤਸਕ, ਅੰਗਾਰਸਕ, ਸ਼ੈਲੇਖੋਵ, ਉਸੋਲੇ-ਸਿਬਰਸਕੋਏ, ਸਲਯੁਡਯੰਕਾ, ਬ੍ਰੈਟਸਕ ਅਤੇ ਹੋਰ। ਬਸਤੀਆਂ ਅਤੇ ਜੰਗਲਾਂ ਵਿਚ ਅੱਗ ਬੁਝਾਉਣ ਵਿਚ ਯੋਗਦਾਨ ਪਾ ਰਿਹਾ ਹੈ!</div>
						<div v-if="description_pl" style="padding:10px;text-align:center;">Ochotniczy strażacy Irkuck, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk i inni Jednostki działają w całym regionie Irkucka! Przyczynianie się do gaszenia pożarów w osadach i lasach!</div>
						<div v-if="description_ps" style="padding:10px;text-align:center;">د داوطلب اور وژونکي ارکټسک ، انګارسک ، شیلیخوف ، اسولای - سیبیرسکوی ، سیلوډیانکا ، براټسکی او نور. د یونټ کارکونکي د یونټ کار کوي! په میشت ځایونو او ځنګلونو کې د اور وژنې سره مرسته کول!</div>
						<div v-if="description_pt" style="padding:10px;text-align:center;">Bombeiros voluntários Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk e outros As unidades trabalham em toda a região de Irkutsk! Contribuindo para extinguir incêndios em assentamentos e florestas!</div>
						<div v-if="description_ro" style="padding:10px;text-align:center;">Pompieri voluntari Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk ș.a. Unitățile funcționează în toată regiunea Irkutsk! Contribuie la stingerea incendiilor în așezări și păduri!</div>
						<div v-if="description_ru" style="padding:10px;text-align:center;">Добровольные пожарные Иркутск, Ангарск, Шелехов, Усолье-Сибирское, Слюдянка, Братск и др. Отряды учреждения базируются по всей Иркутской области! Содействие тушению пожаров в населенных пунктах и лесах! </div>
						<div v-if="description_sd" style="padding:10px;text-align:center;">رضاکار باهه وارا ارڪوتس، انڪوڪوڪ، شيليخو، يوولويو-سائبرڪي، سولودوڪيڪا، برٽسڪ ۽ ٻيا. آبادگي ۽ ٻيلن ۾ باهه ٻڻڻ ۾ مدد ڏيڻ!</div>
						<div v-if="description_si" style="padding:10px;text-align:center;">ස්වේච්ඡා ගිනි නිවන භටයින් වන ඉර්කුට්ස්ක්, ඇන්ගාර්ස්ක්, ෂෙලෙකොව්, උසෝලි-සිබිර්ස්කෝයි, ස්ලූඩියන්කා, බ්‍රැට්ස්ක් සහ වෙනත් අය. ජනාවාසවල සහ වනාන්තරවල ගින්න නිවා දැමීමට දායක වීම!</div>
						<div v-if="description_sk" style="padding:10px;text-align:center;">Dobrovoľní hasiči Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk a ďalšie. Prispievanie k haseniu požiaru v osadách a lesoch!</div>					
						<div v-if="description_sl" style="padding:10px;text-align:center;">Prostovoljni gasilci Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk in drugi. Enote delujejo na celotnem območju Irkutska! Prispevanje k gašenju požarov v naseljih in gozdovih!</div>
						<div v-if="description_sm" style="padding:10px;text-align:center;">Failautusi e ofo ai Volvoer Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk ma isi. O iunite o loʻo galue i le Irkutsk eria! Fesoasoani i le susunuina o afi i nofoaga ma vaomatua!</div>
						<div v-if="description_sn" style="padding:10px;text-align:center;">Vazvipiri vanodzima moto moto Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk nevamwe.Aunits anoshanda mudunhu reIrkutsk! Kubatsira kudzima moto munzvimbo dzinogara uye masango!</div>
						<div v-if="description_so" style="padding:10px;text-align:center;">Dab-damiyayaal iskaa wax u qabso Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk iyo kuwa kale. Unugyadu waxay ka shaqeeyaan gobolka Irkutsk oo dhan! Waxay gacan ka gaysteen daminta dababka degsiimooyinka iyo kaymaha!</div>
						<div v-if="description_sq" style="padding:10px;text-align:center;">Zjarrfikësit vullnetarë Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk dhe të tjerë. Njësitë punojnë në të gjithë rajonin e Irkutsk! Kontribuoni në shuarjen e zjarreve në vendbanime dhe pyje!</div>
						<div v-if="description_sr" style="padding:10px;text-align:center;">Добровољни ватрогасци Иркутск, Ангарск, Схелекхов, Усолие-Сибирскоие, Слиудианка, Братск и др. Јединице раде широм Иркутске регије! Допринос гашењу пожара у насељима и шумама!</div>
						<div v-if="description_st" style="padding:10px;text-align:center;">Bo-ralitima-mollo ba ithaopileng Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk le ba bang. Liyuniti li sebetsa sebakeng sa Irkutsk! E kenya letsoho ho tima mollo mekhoeng le merung!</div>
						<div v-if="description_su" style="padding:10px;text-align:center;">Anggota petugas pemadam kebakaran Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk sareng anu sanés. Unit-unit damel di daérah Irkutsk! Kontribusi pikeun ngaleungitkeun kahuruan di padumukan sareng leuweung!</div>
						<div v-if="description_sv" style="padding:10px;text-align:center;">Frivilliga brandmän Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk m.fl. Enheter arbetar i hela Irkutsk-regionen! Bidrar till att släcka bränder i bosättningar och skogar!</div>
						<div v-if="description_sw" style="padding:10px;text-align:center;">Wauzaji wa moto wa kujitolea Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk na wengineo. Vitengo hufanya kazi katika mkoa wote wa Irkutsk! Inachangia kuzimisha moto katika makazi na misitu!</div>				
						<div v-if="description_ta" style="padding:10px;text-align:center;">தன்னார்வ தீயணைப்பு வீரர்கள் இர்குட்ஸ்க், அங்கார்ஸ்க், ஷெலெகோவ், உசோலி-சிபிர்ஸ்கோய், ஸ்லூத்யங்கா, பிராட்ஸ்க் மற்றும் பலர். இர்குட்ஸ்க் பகுதி முழுவதும் அலகுகள் செயல்படுகின்றன! குடியிருப்புகளிலும் காடுகளிலும் தீ அணைக்க பங்களிப்பு!</div>
						<div v-if="description_te" style="padding:10px;text-align:center;">వాలంటీర్ అగ్నిమాపకదళ సిబ్బంది ఇర్కుట్స్క్, అంగార్స్క్, షెలేఖోవ్, ఉసోలీ-సిబిర్స్కోయ్, స్లూడ్యాంకా, బ్రాట్స్క్ మరియు ఇతరులు. ఇర్కుట్స్క్ ప్రాంతం అంతటా యూనిట్లు పనిచేస్తాయి! స్థావరాలు మరియు అడవులలో మంటలను ఆర్పడానికి తోడ్పడటం!</div>			
						<div v-if="description_tg" style="padding:10px;text-align:center;">Сӯхторхомаҳои ихтиёрӣ дар Иркутск, Ангарск, Шелехов, Усолье-Сибирское, Слюдянка, Братск ва ғайра. Мусоидат ба хомӯш кардани сӯхтор дар нуқтаҳои аҳолинишин ва ҷангалҳо!</div>					
						<div v-if="description_th" style="padding:10px;text-align:center;">นักดับเพลิงอาสาสมัคร Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk และคนอื่น ๆ หน่วยทำงานทั่วทั้งภูมิภาค Irkutsk! มีส่วนร่วมในการดับไฟในการตั้งถิ่นฐานและป่า!</div>					
						<div v-if="description_tl" style="padding:10px;text-align:center;">Ang mga bumbero ng boluntaryo na Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk at iba pa.Nagtatrabaho ang mga yunit sa buong rehiyon ng Irkutsk! Nag-aambag sa pagpapatay ng mga sunog sa mga pamayanan at kagubatan!</div>					
						<div v-if="description_tr" style="padding:10px;text-align:center;">Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk ve diğerleri gibi gönüllü itfaiyeciler Birimler Irkutsk bölgesinde çalışıyor! Yerleşim yerlerinde ve ormanlarda yangın söndürmeye katkıda bulunmak!</div>					
						<div v-if="description_uk" style="padding:10px;text-align:center;">Добровільні пожежні Іркутськ, Ангарськ, Шелехов, Усолье-Сибірське, Слюдянка, Братськ і ін. Загони працюють по всій Іркутській області! Сприяння гасіння пожеж в населених пунктах і лісах!</div>
						<div v-if="description_ur" style="padding:10px;text-align:center;">رضاکار فائر فائٹرز ارکٹسک ، انگارسک ، شیلیخوف ، اسولے سبیرسکوی ، سلیوڈینکا ، براٹسک اور دیگر۔ بستیوں اور جنگلات میں آگ بجھانے میں تعاون!</div>
						<div v-if="description_uz" style="padding:10px;text-align:center;">Irkutsk, Angarsk, Shelexov, Usolye-Sibirskoye, Slyudyanka, Bratsk va boshqa ko'ngilli o't o'chiruvchilar. Aholi punktlari va o'rmonlarda yong'inlarni o'chirishga o'z hissasini qo'shmoqda!</div>
						<div v-if="description_vi" style="padding:10px;text-align:center;">Lính cứu hỏa tình nguyện Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk và những người khác. Các đơn vị làm việc trên khắp khu vực Irkutsk! Góp phần dập tắt đám cháy ở các khu định cư và rừng!</div>
						<div v-if="description_xh" style="padding:10px;text-align:center;">Izicima-mlilo zokuzicima umlilo i-Irkutsk, iAngarsk, iShelekhov, i-Usolye-Sibirskoye, iSlyudyanka, iBratsk kunye nabanye.Iiyunithi zisebenza kulo mmandla we-Irkutsk! Ukwenza igalelo lokucima imililo kwiindawo zokuhlala kunye namahlathi!</div>
						<div v-if="description_yi" style="padding:10px;text-align:center;">פרייַוויליקער פייערפייטערז ירקוצק, אַנגאַרסק, שעלעכאָוו, וסאָליע-סיבירסקויע, סליודיאַנקאַ, בראַצק און אנדערע. וניץ אַרבעט איבער די ירקוצק געגנט! קאַנטריביוטינג צו יקסטינגגווישינג פירעס אין סעטאַלמאַנץ און פאָראַס!</div>
						<div v-if="description_yo" style="padding:10px;text-align:center;">Awọn onija ina nọnwo-ina ni Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk ati awọn omiiran Awọn ipin ṣiṣẹ ṣiṣẹ jakejado agbegbe Irkutsk! Ṣe alabapin si imukuro awọn ina ni awọn ibugbe ati awọn igbo!</div>
						<div v-if="description_zh" style="padding:10px;text-align:center;">志願者消防員伊爾庫茨克，安加爾斯克，謝列霍夫，烏索里-西比爾斯科耶，斯柳揚卡，布拉茨克等。 協助撲滅定居點和森林的大火！</div>
						<div v-if="description_zu" style="padding:10px;text-align:center;">Izicishamlilo zokuzithandela i-Irkutsk, Angarsk, Shelekhov, Usolye-Sibirskoye, Slyudyanka, Bratsk nabanye. Amayunithi asebenza esifundeni sase-Irkutsk! Ukufaka isandla ukucima imililo ezindaweni zokuhlala nasehlathini!</div>	
						<a href="/privacy.html" style="color:#fff;cursor:pointer;" target="blank">Privacy Policy</a>
						<a href="/terms.html" style="margin-left:20px;color:#fff;cursor:pointer;" target="blank">User Agreement</a>
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

	var urls=window.location.href.split("?");
	if (urls[1]) {
		var url=urls[1].split("=");
		if (url[0]=='lang') {
			document.getElementById("langs_hide").value = url[1];
			document.getElementById("langs").innerHTML = url[1];
			$('#langs_read_text').html(langs_read_text[url[1]]);
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
			attachedtime: null,
			attachedtext: null,
            menu: false,
			description_af: false,
			description_am: false,
			description_ar: false,
			description_az: false,
			description_be: false,
			description_bg: false,
			description_bn: false,
			description_bs: false,
			description_ca: false,
			description_ceb: false,
			description_co: false,
			description_cs: false,
			description_cy: false,
			description_da: false,
			description_de: false,
			description_el: false,
			description_en: false,
			description_eo: false,
			description_es: false,
			description_et: false,
			description_eu: false,
			description_fa: false,
			description_fi: false,
			description_fr: false,
			description_fy: false,
			description_ga: false,
			description_gd: false,
			description_gl: false,
			description_gu: false,
			description_ha: false,
			description_haw: false,
			description_hi: false,
			description_hmn: false,
			description_hr: false,
			description_ht: false,
			description_hu: false,
			description_hy: false,
			description_id: false,
			description_ig: false,
			description_is: false,
			description_it: false,
			description_iw: false,
			description_ja: false,
			description_jw: false,
			description_ka: false,
			description_kk: false,
			description_km: false,
			description_kn: false,
			description_ko: false,
			description_ku: false,
			description_ky: false,
			description_la: false,
			description_lb: false,
			description_lo: false,
			description_lt: false,
			description_lv: false,
			description_mg: false,
			description_mi: false,
			description_mk: false,
			description_ml: false,
			description_mn: false,
			description_mr: false,
			description_ms: false,
			description_mt: false,
			description_my: false,
			description_ne: false,
			description_nl: false,
			description_no: false,
			description_ny: false,
			description_pa: false,
			description_pl: false,
			description_ps: false,
			description_pt: false,
			description_ro: false,
			description_ru: false,
			description_sd: false,
			description_si: false,
			description_sk: false,
			description_sl: false,
			description_sm: false,
			description_sn: false,
			description_so: false,
			description_sq: false,		
			description_sr: false,		
			description_st: false,		
			description_su: false,		
			description_sv: false,	
			description_sw: false,		
			description_ta: false,		
			description_te: false,		
			description_tg: false,	
			description_th: false,		
			description_tl: false,
			description_tr: false,
			description_uk: false,
			description_ur: false,
			description_uz: false,
			description_vi: false,
			description_xh: false,
			description_yi: false,
			description_yo: false,
			description_zh: false,
			description_zu: false,
			title_site_af: false,
			title_site_am: false,
			title_site_ar: false,
			title_site_az: false,
			title_site_be: false,
			title_site_bg: false,
			title_site_bn: false,
			title_site_bs: false,
			title_site_ca: false,
			title_site_ceb: false,
			title_site_co: false,
			title_site_cs: false,
			title_site_cy: false,
			title_site_da: false,
			title_site_de: false,
			title_site_el: false,
			title_site_en: false,
			title_site_eo: false,
			title_site_es: false,
			title_site_et: false,
			title_site_eu: false,
			title_site_fa: false,
			title_site_fi: false,
			title_site_fr: false,
			title_site_fy: false,
			title_site_ga: false,
			title_site_gd: false,
			title_site_gl: false,
			title_site_gu: false,
			title_site_ha: false,
			title_site_haw: false,
			title_site_hi: false,
			title_site_hmn: false,
			title_site_hr: false,
			title_site_ht: false,
			title_site_hu: false,
			title_site_hy: false,
			title_site_id: false,
			title_site_ig: false,
			title_site_is: false,
			title_site_it: false,
			title_site_iw: false,
			title_site_ja: false,
			title_site_jw: false,
			title_site_ka: false,
			title_site_kk: false,
			title_site_km: false,
			title_site_kn: false,
			title_site_ko: false,
			title_site_ku: false,
			title_site_ky: false,
			title_site_la: false,
			title_site_lb: false,
			title_site_lo: false,
			title_site_lt: false,
			title_site_lv: false,
			title_site_mg: false,
			title_site_mi: false,
			title_site_mk: false,
			title_site_ml: false,
			title_site_mn: false,
			title_site_mr: false,
			title_site_ms: false,
			title_site_mt: false,
			title_site_my: false,
			title_site_ne: false,
			title_site_nl: false,
			title_site_no: false,
			title_site_ny: false,
			title_site_pa: false,
			title_site_pl: false,
			title_site_ps: false,
			title_site_pt: false,
			title_site_ro: false,
			title_site_ru: false,
			title_site_sd: false,
			title_site_si: false,
			title_site_sk: false,
			title_site_sl: false,
			title_site_sm: false,
			title_site_sn: false,
			title_site_so: false,
			title_site_sq: false,		
			title_site_sr: false,		
			title_site_st: false,		
			title_site_su: false,		
			title_site_sv: false,	
			title_site_sw: false,		
			title_site_ta: false,		
			title_site_te: false,		
			title_site_tg: false,	
			title_site_th: false,		
			title_site_tl: false,
			title_site_tr: false,
			title_site_uk: false,
			title_site_ur: false,
			title_site_uz: false,
			title_site_vi: false,
			title_site_xh: false,
			title_site_yi: false,
			title_site_yo: false,
			title_site_zh: false,
			title_site_zu: false,
			main_attached: false,
            topics: SystemConst.topics
        }
    },
    async mounted() {
        let app = this

        addEventListener('click', function (e) {
            let DOMmenu = document.getElementById('primary-navbar')

            if (!DOMmenu.contains(e.target)) {
                app.menu = false
            }
        })


		
			await axios.post('/messages/getattached')
			.then(async response => {
				let message = JSON.parse(JSON.stringify(response.data.message))
				console.log(message);
				if (message.comment) {
					app.main_attached = true
					var str = message.comment_en;
					
					let urls=window.location.href.split("?");
					if (urls[1]) {
						var url=urls[1].split("=");
						if (url[0]=='lang') {
							str = eval('message.comment_'+url[1]);
							console.log(str);
						}
					}
					let time = message.updated_at.split('T');
					app.attachedtext = '<a style="text-decoration:none;color:#000;" href="/view/'+message._id+'">'+str+'</a>'
					app.attachedtime = time[0]
				}
			}).catch(function(error) {
				console.log(error);
			});
			
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


			app.title_site_ru=true;
			var urls=window.location.href.split("?");
			if (urls[1]) {
				var url=urls[1].split("=");
				if (url[0]=='lang') {
					if (url[1]=='af') app.title_site_af=true; else app.title_site_af=false;
					if (url[1]=='am') app.title_site_am=true; else app.title_site_am=false;
					if (url[1]=='ar') app.title_site_ar=true; else app.title_site_ar=false;
					if (url[1]=='az') app.title_site_az=true; else app.title_site_az=false;
					if (url[1]=='be') app.title_site_be=true; else app.title_site_be=false;
					if (url[1]=='bg') app.title_site_bg=true; else app.title_site_bg=false;
					if (url[1]=='bn') app.title_site_bn=true; else app.title_site_bn=false;
					if (url[1]=='bs') app.title_site_bs=true; else app.title_site_bs=false;
					if (url[1]=='ca') app.title_site_ca=true; else app.title_site_ca=false;
					if (url[1]=='ceb') app.title_site_ceb=true; else app.title_site_ceb=false;
					if (url[1]=='co') app.title_site_co=true; else app.title_site_co=false;
					if (url[1]=='cs') app.title_site_cs=true; else app.title_site_cs=false;
					if (url[1]=='cy') app.title_site_cy=true; else app.title_site_cy=false;
					if (url[1]=='da') app.title_site_da=true; else app.title_site_da=false;
					if (url[1]=='de') app.title_site_de=true; else app.title_site_de=false;
					if (url[1]=='el') app.title_site_el=true; else app.title_site_el=false;
					if (url[1]=='en') app.title_site_en=true; else app.title_site_en=false;
					if (url[1]=='eo') app.title_site_eo=true; else app.title_site_eo=false;
					if (url[1]=='es') app.title_site_es=true; else app.title_site_es=false;
					if (url[1]=='et') app.title_site_et=true; else app.title_site_et=false;
					if (url[1]=='eu') app.title_site_eu=true; else app.title_site_eu=false;
					if (url[1]=='fa') app.title_site_fa=true; else app.title_site_fa=false;
					if (url[1]=='fi') app.title_site_fi=true; else app.title_site_fi=false;
					if (url[1]=='fr') app.title_site_fr=true; else app.title_site_fr=false;
					if (url[1]=='fy') app.title_site_fy=true; else app.title_site_fy=false;
					if (url[1]=='ga') app.title_site_ga=true; else app.title_site_ga=false;
					if (url[1]=='gd') app.title_site_gd=true; else app.title_site_gd=false;
					if (url[1]=='gl') app.title_site_gl=true; else app.title_site_gl=false;
					if (url[1]=='gu') app.title_site_gu=true; else app.title_site_gu=false;
					if (url[1]=='ha') app.title_site_ha=true; else app.title_site_ha=false;
					if (url[1]=='haw') app.title_site_haw=true; else app.title_site_haw=false;
					if (url[1]=='hi') app.title_site_hi=true; else app.title_site_hi=false;
					if (url[1]=='hmn') app.title_site_hmn=true; else app.title_site_hmn=false;
					if (url[1]=='hr') app.title_site_hr=true; else app.title_site_hr=false;
					if (url[1]=='ht') app.title_site_ht=true; else app.title_site_ht=false;
					if (url[1]=='hu') app.title_site_hu=true; else app.title_site_hu=false;
					if (url[1]=='hy') app.title_site_hy=true; else app.title_site_hy=false;
					if (url[1]=='id') app.title_site_id=true; else app.title_site_id=false;
					if (url[1]=='ig') app.title_site_ig=true; else app.title_site_ig=false;
					if (url[1]=='is') app.title_site_is=true; else app.title_site_is=false;
					if (url[1]=='it') app.title_site_it=true; else app.title_site_it=false;
					if (url[1]=='iw') app.title_site_iw=true; else app.title_site_iw=false;
					if (url[1]=='ja') app.title_site_ja=true; else app.title_site_ja=false;
					if (url[1]=='jw') app.title_site_jw=true; else app.title_site_jw=false;
					if (url[1]=='ka') app.title_site_ka=true; else app.title_site_ka=false;
					if (url[1]=='kk') app.title_site_kk=true; else app.title_site_kk=false;
					if (url[1]=='km') app.title_site_km=true; else app.title_site_km=false;
					if (url[1]=='kn') app.title_site_kn=true; else app.title_site_kn=false;
					if (url[1]=='ko') app.title_site_ko=true; else app.title_site_ko=false;
					if (url[1]=='ku') app.title_site_ku=true; else app.title_site_ku=false;
					if (url[1]=='ky') app.title_site_ky=true; else app.title_site_ky=false;
					if (url[1]=='la') app.title_site_la=true; else app.title_site_la=false;
					if (url[1]=='lb') app.title_site_lb=true; else app.title_site_lb=false;
					if (url[1]=='lo') app.title_site_lo=true; else app.title_site_lo=false;
					if (url[1]=='lt') app.title_site_lt=true; else app.title_site_lt=false;
					if (url[1]=='lv') app.title_site_lv=true; else app.title_site_lv=false;
					if (url[1]=='mg') app.title_site_mg=true; else app.title_site_mg=false;
					if (url[1]=='mi') app.title_site_mi=true; else app.title_site_mi=false;
					if (url[1]=='mk') app.title_site_mk=true; else app.title_site_mk=false;
					if (url[1]=='ml') app.title_site_ml=true; else app.title_site_ml=false;
					if (url[1]=='mn') app.title_site_mn=true; else app.title_site_mn=false;
					if (url[1]=='mr') app.title_site_mr=true; else app.title_site_mr=false;
					if (url[1]=='ms') app.title_site_ms=true; else app.title_site_ms=false;
					if (url[1]=='mt') app.title_site_mt=true; else app.title_site_mt=false;
					if (url[1]=='my') app.title_site_my=true; else app.title_site_my=false;
					if (url[1]=='ne') app.title_site_ne=true; else app.title_site_ne=false;
					if (url[1]=='nl') app.title_site_nl=true; else app.title_site_nl=false;
					if (url[1]=='no') app.title_site_no=true; else app.title_site_no=false;
					if (url[1]=='ny') app.title_site_ny=true; else app.title_site_ny=false;
					if (url[1]=='pa') app.title_site_pa=true; else app.title_site_pa=false;
					if (url[1]=='pl') app.title_site_pl=true; else app.title_site_pl=false;
					if (url[1]=='ps') app.title_site_ps=true; else app.title_site_ps=false;
					if (url[1]=='pt') app.title_site_pt=true; else app.title_site_pt=false;
					if (url[1]=='ro') app.title_site_ro=true; else app.title_site_ro=false;
					if (url[1]=='ru') app.title_site_ru=true; else app.title_site_ru=false;
					if (url[1]=='sd') app.title_site_sd=true; else app.title_site_sd=false;
					if (url[1]=='si') app.title_site_si=true; else app.title_site_si=false;
					if (url[1]=='sk') app.title_site_sk=true; else app.title_site_sk=false;
					if (url[1]=='sl') app.title_site_sl=true; else app.title_site_sl=false;
					if (url[1]=='sm') app.title_site_sm=true; else app.title_site_sm=false;
					if (url[1]=='sn') app.title_site_sn=true; else app.title_site_sn=false;
					if (url[1]=='so') app.title_site_so=true; else app.title_site_so=false;
					if (url[1]=='sq') app.title_site_sq=true; else app.title_site_sq=false;		
					if (url[1]=='sr') app.title_site_sr=true; else app.title_site_sr=false;		
					if (url[1]=='st') app.title_site_st=true; else app.title_site_st=false;		
					if (url[1]=='su') app.title_site_su=true; else app.title_site_su=false;		
					if (url[1]=='sv') app.title_site_sv=true; else app.title_site_sv=false;		
					if (url[1]=='sw') app.title_site_sw=true; else app.title_site_sw=false;		
					if (url[1]=='ta') app.title_site_ta=true; else app.title_site_ta=false;		
					if (url[1]=='te') app.title_site_te=true; else app.title_site_te=false;		
					if (url[1]=='tg') app.title_site_tg=true; else app.title_site_tg=false;		
					if (url[1]=='th') app.title_site_th=true; else app.title_site_th=false;		
					if (url[1]=='tl') app.title_site_tl=true; else app.title_site_tl=false;
					if (url[1]=='tr') app.title_site_tr=true; else app.title_site_tr=false;
					if (url[1]=='uk') app.title_site_uk=true; else app.title_site_uk=false;
					if (url[1]=='ur') app.title_site_ur=true; else app.title_site_ur=false;
					if (url[1]=='uz') app.title_site_uz=true; else app.title_site_uz=false;
					if (url[1]=='vi') app.title_site_vi=true; else app.title_site_vi=false;
					if (url[1]=='xh') app.title_site_xh=true; else app.title_site_xh=false;
					if (url[1]=='yi') app.title_site_yi=true; else app.title_site_yi=false;
					if (url[1]=='yo') app.title_site_yo=true; else app.title_site_yo=false;
					if (url[1]=='zh') app.title_site_zh=true; else app.title_site_zh=false;
					if (url[1]=='zu') app.title_site_zu=true; else app.title_site_zu=false;		
				}
			}			

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
			app.description_en=true;
			var urls=window.location.href.split("?");
			if (urls[1]) {
				var url=urls[1].split("=");
				if (url[0]=='lang') {
					if (url[1]=='af') app.description_af=true; else app.description_af=false;
					if (url[1]=='am') app.description_am=true; else app.description_am=false;
					if (url[1]=='ar') app.description_ar=true; else app.description_ar=false;
					if (url[1]=='az') app.description_az=true; else app.description_az=false;
					if (url[1]=='be') app.description_be=true; else app.description_be=false;
					if (url[1]=='bg') app.description_bg=true; else app.description_bg=false;
					if (url[1]=='bn') app.description_bn=true; else app.description_bn=false;
					if (url[1]=='bs') app.description_bs=true; else app.description_bs=false;
					if (url[1]=='ca') app.description_ca=true; else app.description_ca=false;
					if (url[1]=='ceb') app.description_ceb=true; else app.description_ceb=false;
					if (url[1]=='co') app.description_co=true; else app.description_co=false;
					if (url[1]=='cs') app.description_cs=true; else app.description_cs=false;
					if (url[1]=='cy') app.description_cy=true; else app.description_cy=false;
					if (url[1]=='da') app.description_da=true; else app.description_da=false;
					if (url[1]=='de') app.description_de=true; else app.description_de=false;
					if (url[1]=='el') app.description_el=true; else app.description_el=false;
					if (url[1]=='en') app.description_en=true; else app.description_en=false;
					if (url[1]=='eo') app.description_eo=true; else app.description_eo=false;
					if (url[1]=='es') app.description_es=true; else app.description_es=false;
					if (url[1]=='et') app.description_et=true; else app.description_et=false;
					if (url[1]=='eu') app.description_eu=true; else app.description_eu=false;
					if (url[1]=='fa') app.description_fa=true; else app.description_fa=false;
					if (url[1]=='fi') app.description_fi=true; else app.description_fi=false;
					if (url[1]=='fr') app.description_fr=true; else app.description_fr=false;
					if (url[1]=='fy') app.description_fy=true; else app.description_fy=false;
					if (url[1]=='ga') app.description_ga=true; else app.description_ga=false;
					if (url[1]=='gd') app.description_gd=true; else app.description_gd=false;
					if (url[1]=='gl') app.description_gl=true; else app.description_gl=false;
					if (url[1]=='gu') app.description_gu=true; else app.description_gu=false;
					if (url[1]=='ha') app.description_ha=true; else app.description_ha=false;
					if (url[1]=='haw') app.description_haw=true; else app.description_haw=false;
					if (url[1]=='hi') app.description_hi=true; else app.description_hi=false;
					if (url[1]=='hmn') app.description_hmn=true; else app.description_hmn=false;
					if (url[1]=='hr') app.description_hr=true; else app.description_hr=false;
					if (url[1]=='ht') app.description_ht=true; else app.description_ht=false;
					if (url[1]=='hu') app.description_hu=true; else app.description_hu=false;
					if (url[1]=='hy') app.description_hy=true; else app.description_hy=false;
					if (url[1]=='id') app.description_id=true; else app.description_id=false;
					if (url[1]=='ig') app.description_ig=true; else app.description_ig=false;
					if (url[1]=='is') app.description_is=true; else app.description_is=false;
					if (url[1]=='it') app.description_it=true; else app.description_it=false;
					if (url[1]=='iw') app.description_iw=true; else app.description_iw=false;
					if (url[1]=='ja') app.description_ja=true; else app.description_ja=false;
					if (url[1]=='jw') app.description_jw=true; else app.description_jw=false;
					if (url[1]=='ka') app.description_ka=true; else app.description_ka=false;
					if (url[1]=='kk') app.description_kk=true; else app.description_kk=false;
					if (url[1]=='km') app.description_km=true; else app.description_km=false;
					if (url[1]=='kn') app.description_kn=true; else app.description_kn=false;
					if (url[1]=='ko') app.description_ko=true; else app.description_ko=false;
					if (url[1]=='ku') app.description_ku=true; else app.description_ku=false;
					if (url[1]=='ky') app.description_ky=true; else app.description_ky=false;
					if (url[1]=='la') app.description_la=true; else app.description_la=false;
					if (url[1]=='lb') app.description_lb=true; else app.description_lb=false;
					if (url[1]=='lo') app.description_lo=true; else app.description_lo=false;
					if (url[1]=='lt') app.description_lt=true; else app.description_lt=false;
					if (url[1]=='lv') app.description_lv=true; else app.description_lv=false;
					if (url[1]=='mg') app.description_mg=true; else app.description_mg=false;
					if (url[1]=='mi') app.description_mi=true; else app.description_mi=false;
					if (url[1]=='mk') app.description_mk=true; else app.description_mk=false;
					if (url[1]=='ml') app.description_ml=true; else app.description_ml=false;
					if (url[1]=='mn') app.description_mn=true; else app.description_mn=false;
					if (url[1]=='mr') app.description_mr=true; else app.description_mr=false;
					if (url[1]=='ms') app.description_ms=true; else app.description_ms=false;
					if (url[1]=='mt') app.description_mt=true; else app.description_mt=false;
					if (url[1]=='my') app.description_my=true; else app.description_my=false;
					if (url[1]=='ne') app.description_ne=true; else app.description_ne=false;
					if (url[1]=='nl') app.description_nl=true; else app.description_nl=false;
					if (url[1]=='no') app.description_no=true; else app.description_no=false;
					if (url[1]=='ny') app.description_ny=true; else app.description_ny=false;
					if (url[1]=='pa') app.description_pa=true; else app.description_pa=false;
					if (url[1]=='pl') app.description_pl=true; else app.description_pl=false;
					if (url[1]=='ps') app.description_ps=true; else app.description_ps=false;
					if (url[1]=='pt') app.description_pt=true; else app.description_pt=false;
					if (url[1]=='ro') app.description_ro=true; else app.description_ro=false;
					if (url[1]=='ru') app.description_ru=true; else app.description_ru=false;
					if (url[1]=='sd') app.description_sd=true; else app.description_sd=false;
					if (url[1]=='si') app.description_si=true; else app.description_si=false;
					if (url[1]=='sk') app.description_sk=true; else app.description_sk=false;
					if (url[1]=='sl') app.description_sl=true; else app.description_sl=false;
					if (url[1]=='sm') app.description_sm=true; else app.description_sm=false;
					if (url[1]=='sn') app.description_sn=true; else app.description_sn=false;
					if (url[1]=='so') app.description_so=true; else app.description_so=false;
					if (url[1]=='sq') app.description_sq=true; else app.description_sq=false;		
					if (url[1]=='sr') app.description_sr=true; else app.description_sr=false;		
					if (url[1]=='st') app.description_st=true; else app.description_st=false;		
					if (url[1]=='su') app.description_su=true; else app.description_su=false;		
					if (url[1]=='sv') app.description_sv=true; else app.description_sv=false;		
					if (url[1]=='sw') app.description_sw=true; else app.description_sw=false;		
					if (url[1]=='ta') app.description_ta=true; else app.description_ta=false;		
					if (url[1]=='te') app.description_te=true; else app.description_te=false;		
					if (url[1]=='tg') app.description_tg=true; else app.description_tg=false;		
					if (url[1]=='th') app.description_th=true; else app.description_th=false;		
					if (url[1]=='tl') app.description_tl=true; else app.description_tl=false;
					if (url[1]=='tr') app.description_tr=true; else app.description_tr=false;
					if (url[1]=='uk') app.description_uk=true; else app.description_uk=false;
					if (url[1]=='ur') app.description_ur=true; else app.description_ur=false;
					if (url[1]=='uz') app.description_uz=true; else app.description_uz=false;
					if (url[1]=='vi') app.description_vi=true; else app.description_vi=false;
					if (url[1]=='xh') app.description_xh=true; else app.description_xh=false;
					if (url[1]=='yi') app.description_yi=true; else app.description_yi=false;
					if (url[1]=='yo') app.description_yo=true; else app.description_yo=false;
					if (url[1]=='zh') app.description_zh=true; else app.description_zh=false;
					if (url[1]=='zu') app.description_zu=true; else app.description_zu=false;		
				}
			}			

		},		
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
			var lang = document.getElementById("langs_hide").value;
			var urls = window.location.href.split("/");
			if (lang!='') window.location.href=window.location.pathname+'?lang='+lang;
			else window.location.href=window.location.pathname; 
		},
		openf() {
			window.location.href = "/favourites";
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