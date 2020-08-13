<template>
    <div class="content-container">
        <infinite-loading @infinite="infiniteFetchMessages" direction="top"></infinite-loading>

        <transition-group appear tag="div" mode="out-in" name="fade-opacity"  class="cards-container">
            <div class="card-container" v-for="message in messages" :key="message._id">
                <message :data="message" :passedData="passedData" @remove="removeMessage" @edit="editMessage" :unreadMessages="unreadMessages"></message>
            </div>
        </transition-group>

        <div :class="{'scroll-bottom scroll-bottom--with-form': $auth.check(['author', 'editor', 'creator']) === true, 'scroll-bottom': $auth.check(['author', 'editor', 'creator']) === false}" v-if="unreadMessages.length !== 0" @click="scrollBottom()">
            <div class="scroll-bottom-badge">{{unreadMessages.length >= 99 ? 99 : unreadMessages.length}}</div>
            <i class="mdi mdi-chevron-down" style="font-size:24px;color:rgba(0,0,0,0.54);"></i>
        </div>

        <message-form ref="messageFormComponent"
            :passedData="passedData" 
            @update="updateMessage" 
            @create="createMessage"></message-form>
			
		<div v-show="fons" style="position: fixed;z-index: 103;top: 0px;left: 0px;width: 100%;height: 100%;background: #ffffff;opacity: 0.9;"></div>
		<div v-show="loads" class="loader">
			<div class="laoder-frame">
				<img class="svg-loader" src="/images/loader.svg" alt="circle-loader">
			</div>
		</div>
   </div>
</template>
<script>
import Message from '../components/message_shop'
import MessageForm from '../components/message_form_shop'
	
export default {
    name: 'messages',
    components: { Message, MessageForm },
    data() {
        return {
            messages: [],
            passedData: null,
            unreadMessages: [],
			fons: null,
			loads: null
        }
    },
    mounted() {
        let app = this
		
        window.scrollTo(0, 100000)
        app.infiniteFetchMessages(undefined)

        app.$nextTick(function () {
            window.scrollTo(0, 100000)
        })

        window.ws.onmessage = function(e) {
            let data = JSON.parse(e.data)
			
            if (data.event == 'create_shop') {
				data.data.websocket=1;
                app.messages.push(Object.assign({}, data.data))
                app.unreadMessages.push(Object.assign({}, data.data))
            } else if (data.event == 'delete_shop') {
                app.messages = app.messages.filter(item => {
                    return item._id !== data.data._id
                })

                app.unreadMessages.forEach(function (elem, index) {
                    if (elem._id == data.data._id) {
                        app.$delete(app.unreadMessages, index)
                    }
                })
            }
        }
    },
    methods: {
        async removeMessage(message) {
            let app = this;

            await axios.delete('/shop/' + message._id).then(response => {
                app.$refs.messageFormComponent.defaultState()
                app.messages = app.messages.filter(item => {
                    return item._id !== message._id
                })

                window.ws.send(JSON.stringify({event: 'delete_shop', data: message}));
            })
        },
        createMessage(message) {
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
			
            app.messages.push(Object.assign({}, message))
            app.passedData = null
            app.$refs.messageFormComponent.defaultState()
            setTimeout(function () {
                window.scrollTo(0, document.getElementsByTagName('body')[0].scrollHeight)
            }, 500)
			
            window.ws.send(JSON.stringify({event: 'create_shop', data: message}));
			app.$router.push({ path: '/shop', query: { lang: langs } })
        },
        updateMessage(message) {
            let app = this

            for (let index in app.messages) {
                if (app.messages[index]._id == message._id) {
                    app.$set(app.messages, app.messages.indexOf(app.messages[index]), Object.assign({}, message))
                }
            }
            app.passedData = null
            app.$refs.messageFormComponent.defaultState()
        },
        editMessage(message) {
				
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
			
            if (app.passedData && app.passedData._id == message._id) {
                app.passedData = null
                app.$refs.messageFormComponent.defaultState()
                return 
            }
			
			if (message.comment_zu) message.comment_zu=message.comment_zu.replace(/<br>/g, '\n');
			if (message.comment_zh) message.comment_zh=message.comment_zh.replace(/<br>/g, '\n');
			if (message.comment_yo) message.comment_yo=message.comment_yo.replace(/<br>/g, '\n');
			if (message.comment_yi) message.comment_yi=message.comment_yi.replace(/<br>/g, '\n');
			if (message.comment_xh) message.comment_xh=message.comment_xh.replace(/<br>/g, '\n');
			if (message.comment_vi) message.comment_vi=message.comment_vi.replace(/<br>/g, '\n');
			if (message.comment_uz) message.comment_uz=message.comment_uz.replace(/<br>/g, '\n');
			if (message.comment_ur) message.comment_ur=message.comment_ur.replace(/<br>/g, '\n');
			if (message.comment_uk) message.comment_uk=message.comment_uk.replace(/<br>/g, '\n');
			if (message.comment_tr) message.comment_tr=message.comment_tr.replace(/<br>/g, '\n');
			if (message.comment_tl) message.comment_tl=message.comment_tl.replace(/<br>/g, '\n');
			if (message.comment_th) message.comment_th=message.comment_th.replace(/<br>/g, '\n');
			if (message.comment_tg) message.comment_tg=message.comment_tg.replace(/<br>/g, '\n');
			if (message.comment_te) message.comment_te=message.comment_te.replace(/<br>/g, '\n');
			if (message.comment_ta) message.comment_ta=message.comment_ta.replace(/<br>/g, '\n');
			if (message.comment_th) message.comment_th=message.comment_th.replace(/<br>/g, '\n');
			if (message.comment_sv) message.comment_sv=message.comment_sv.replace(/<br>/g, '\n');
			if (message.comment_su) message.comment_su=message.comment_su.replace(/<br>/g, '\n');
			if (message.comment_st) message.comment_st=message.comment_st.replace(/<br>/g, '\n');
			if (message.comment_sr) message.comment_sr=message.comment_sr.replace(/<br>/g, '\n');
			if (message.comment_sq) message.comment_sq=message.comment_sq.replace(/<br>/g, '\n');
			if (message.comment_so) message.comment_so=message.comment_so.replace(/<br>/g, '\n');
			if (message.comment_sn) message.comment_sn=message.comment_sn.replace(/<br>/g, '\n');
			if (message.comment_sm) message.comment_sm=message.comment_sm.replace(/<br>/g, '\n');
			if (message.comment_sl) message.comment_sl=message.comment_sl.replace(/<br>/g, '\n');
			if (message.comment_sk) message.comment_sk=message.comment_sk.replace(/<br>/g, '\n');
			if (message.comment_si) message.comment_si=message.comment_si.replace(/<br>/g, '\n');
			if (message.comment_sd) message.comment_sd=message.comment_sd.replace(/<br>/g, '\n');
			if (message.comment_ru) message.comment_ru=message.comment_ru.replace(/<br>/g, '\n');
			if (message.comment_ro) message.comment_ro=message.comment_ro.replace(/<br>/g, '\n');
			if (message.comment_pt) message.comment_pt=message.comment_pt.replace(/<br>/g, '\n');
			if (message.comment_ps) message.comment_ps=message.comment_ps.replace(/<br>/g, '\n');
			if (message.comment_pl) message.comment_pl=message.comment_pl.replace(/<br>/g, '\n');
			if (message.comment_pa) message.comment_pa=message.comment_pa.replace(/<br>/g, '\n');
			if (message.comment_ny) message.comment_ny=message.comment_ny.replace(/<br>/g, '\n');
			if (message.comment_no) message.comment_no=message.comment_no.replace(/<br>/g, '\n');
			if (message.comment_nl) message.comment_nl=message.comment_nl.replace(/<br>/g, '\n');
			if (message.comment_ne) message.comment_ne=message.comment_ne.replace(/<br>/g, '\n');
			if (message.comment_my) message.comment_my=message.comment_my.replace(/<br>/g, '\n');
			if (message.comment_mt) message.comment_mt=message.comment_mt.replace(/<br>/g, '\n');
			if (message.comment_ms) message.comment_ms=message.comment_ms.replace(/<br>/g, '\n');
			if (message.comment_mr) message.comment_mr=message.comment_mr.replace(/<br>/g, '\n');
			if (message.comment_mn) message.comment_mn=message.comment_mn.replace(/<br>/g, '\n');
			if (message.comment_ml) message.comment_ml=message.comment_ml.replace(/<br>/g, '\n');
			if (message.comment_mk) message.comment_mk=message.comment_mk.replace(/<br>/g, '\n');
			if (message.comment_mi) message.comment_mi=message.comment_mi.replace(/<br>/g, '\n');
			if (message.comment_mg) message.comment_mg=message.comment_mg.replace(/<br>/g, '\n');
			if (message.comment_lv) message.comment_lv=message.comment_lv.replace(/<br>/g, '\n');
			if (message.comment_lt) message.comment_lt=message.comment_lt.replace(/<br>/g, '\n');
			if (message.comment_lo) message.comment_lo=message.comment_lo.replace(/<br>/g, '\n');
			if (message.comment_lb) message.comment_lb=message.comment_lb.replace(/<br>/g, '\n');
			if (message.comment_la) message.comment_la=message.comment_la.replace(/<br>/g, '\n');
			if (message.comment_ky) message.comment_ky=message.comment_ky.replace(/<br>/g, '\n');
			if (message.comment_ku) message.comment_ku=message.comment_ku.replace(/<br>/g, '\n');
			if (message.comment_ko) message.comment_ko=message.comment_ko.replace(/<br>/g, '\n');
			if (message.comment_kn) message.comment_kn=message.comment_kn.replace(/<br>/g, '\n');
			if (message.comment_km) message.comment_km=message.comment_km.replace(/<br>/g, '\n');
			if (message.comment_kk) message.comment_kk=message.comment_kk.replace(/<br>/g, '\n');
			if (message.comment_ka) message.comment_ka=message.comment_ka.replace(/<br>/g, '\n');
			if (message.comment_jw) message.comment_jw=message.comment_jw.replace(/<br>/g, '\n');
			if (message.comment_ja) message.comment_ja=message.comment_ja.replace(/<br>/g, '\n');
			if (message.comment_iw) message.comment_iw=message.comment_iw.replace(/<br>/g, '\n');
			if (message.comment_it) message.comment_it=message.comment_it.replace(/<br>/g, '\n');
			if (message.comment_is) message.comment_is=message.comment_is.replace(/<br>/g, '\n');
			if (message.comment_ig) message.comment_ig=message.comment_ig.replace(/<br>/g, '\n');
			if (message.comment_id) message.comment_id=message.comment_id.replace(/<br>/g, '\n');
			if (message.comment_hy) message.comment_hy=message.comment_hy.replace(/<br>/g, '\n');
			if (message.comment_hu) message.comment_hu=message.comment_hu.replace(/<br>/g, '\n');
			if (message.comment_ht) message.comment_ht=message.comment_ht.replace(/<br>/g, '\n');
			if (message.comment_hr) message.comment_hr=message.comment_hr.replace(/<br>/g, '\n');
			if (message.comment_hmn) message.comment_hmn=message.comment_hmn.replace(/<br>/g, '\n');
			if (message.comment_hi) message.comment_hi=message.comment_hi.replace(/<br>/g, '\n');
			if (message.comment_haw) message.comment_haw=message.comment_haw.replace(/<br>/g, '\n');
			if (message.comment_ha) message.comment_ha=message.comment_ha.replace(/<br>/g, '\n');
			if (message.comment_gu) message.comment_gu=message.comment_gu.replace(/<br>/g, '\n');
			if (message.comment_gl) message.comment_gl=message.comment_gl.replace(/<br>/g, '\n');
			if (message.comment_gd) message.comment_gd=message.comment_gd.replace(/<br>/g, '\n');
			if (message.comment_ga) message.comment_ga=message.comment_ga.replace(/<br>/g, '\n');
			if (message.comment_fy) message.comment_fy=message.comment_fy.replace(/<br>/g, '\n');
			if (message.comment_fr) message.comment_fr=message.comment_fr.replace(/<br>/g, '\n');
			if (message.comment_fi) message.comment_fi=message.comment_fi.replace(/<br>/g, '\n');
			if (message.comment_fa) message.comment_fa=message.comment_fa.replace(/<br>/g, '\n');
			if (message.comment_eu) message.comment_eu=message.comment_eu.replace(/<br>/g, '\n');
			if (message.comment_et) message.comment_et=message.comment_et.replace(/<br>/g, '\n');
			if (message.comment_es) message.comment_es=message.comment_es.replace(/<br>/g, '\n');
			if (message.comment_eo) message.comment_eo=message.comment_eo.replace(/<br>/g, '\n');
			if (message.comment_en) message.comment_en=message.comment_en.replace(/<br>/g, '\n');
			if (message.comment_el) message.comment_el=message.comment_el.replace(/<br>/g, '\n');
			if (message.comment_de) message.comment_de=message.comment_de.replace(/<br>/g, '\n');
			if (message.comment_da) message.comment_da=message.comment_da.replace(/<br>/g, '\n');
			if (message.comment_cy) message.comment_cy=message.comment_cy.replace(/<br>/g, '\n');
			if (message.comment_cs) message.comment_cs=message.comment_cs.replace(/<br>/g, '\n');
			if (message.comment_co) message.comment_co=message.comment_co.replace(/<br>/g, '\n');
			if (message.comment_ceb) message.comment_ceb=message.comment_ceb.replace(/<br>/g, '\n');
			if (message.comment_ca) message.comment_ca=message.comment_ca.replace(/<br>/g, '\n');
			if (message.comment_bs) message.comment_bs=message.comment_bs.replace(/<br>/g, '\n');
			if (message.comment_bn) message.comment_bn=message.comment_bn.replace(/<br>/g, '\n');
			if (message.comment_bg) message.comment_bg=message.comment_bg.replace(/<br>/g, '\n');
			if (message.comment_be) message.comment_be=message.comment_be.replace(/<br>/g, '\n');
			if (message.comment_az) message.comment_az=message.comment_az.replace(/<br>/g, '\n');
			if (message.comment_ar) message.comment_ar=message.comment_ar.replace(/<br>/g, '\n');
			if (message.comment_am) message.comment_am=message.comment_am.replace(/<br>/g, '\n');
			if (message.comment_af) message.comment_af=message.comment_af.replace(/<br>/g, '\n');						
			
            app.passedData = message
        },
        async fetchMessages(offset, $state) {
            let app = this;
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

            await axios.get('/shop', { params: { offset: offset || 0 } })
                .then(async response => {
                    if (response.data.data.length) {
					
                        let current_height = document.getElementsByTagName('body')[0].scrollHeight;

                        app.messages = response.data.data.concat(app.messages)
	
							await app.messages.forEach(async function(element, index) {

								if (eval('app.messages[index].description_'+lang)==null) {
									app.fons = !app.fons
									app.loads = !app.loads
									if (app.messages[index].description) {
										var postData = {
										  lang: lang,
										  str: app.messages[index].description
										};			
										await axios.post('/messages/translationtext', postData)
											.then(async response => {
												eval('app.messages[index].description_'+lang+'=response.data.message')
												await axios.post('/shop/savetranslation', app.messages[index]);
												app.fons = null
												app.loads = null		
											}).catch(function(error) {
												console.log('Error: ', error);
												app.fons = null
												app.loads = null
											});										
									} else {
										app.fons = null
										app.loads = null
									}
								}

								if (eval('app.messages[index].title_'+lang)==null) {
									app.fons = !app.fons
									app.loads = !app.loads
									if (app.messages[index].title) {
										var postData = {
										  lang: lang,
										  str: app.messages[index].title
										};
									
										await axios.post('/messages/translationtext', postData)
											.then(async response => {
												  eval('app.messages[index].title_'+lang+'=response.data.message')
												  await axios.post('/shop/savetranslation', app.messages[index]);
												  app.fons = null
												  app.loads = null		
											}).catch(function(error) {
												console.log('Error: ', error);
												app.fons = null
												app.loads = null
											});	
									} else {
										app.fons = null
										app.loads = null
									}
								}								

							});

                        app.$nextTick(function () {
                            if ($state) $state.loaded()
                            let new_height = document.getElementsByTagName('body')[0].scrollHeight;
                            if (offset != 0) {
                                document.getElementsByTagName('body')[0].scrollTop = new_height - current_height;
                            }
                        })
                    } else {
                        if ($state) $state.complete()
                    }

                    if (offset == 0) {
                        setTimeout(function () {
                            window.scrollTo(0, 100000)
                        }, 500)
                    } else {
                        
                    }
                });
        },
        infiniteFetchMessages($state) {
            let app = this
            app.debounceInfiniteFetchMessages($state)
        },
        scrollBottom() {
            let app = this

            window.scrollTo(0, document.getElementsByTagName('body')[0].scrollHeight)

            app.unreadMessages = []
        }
    },
    computed: {
        debounceInfiniteFetchMessages() {
            let app = this
            let offset = app.messages.length

            return _.debounce(async ($state) => {
                await app.fetchMessages(offset, $state)
            }, 1000)
        }
    }
}
</script>
<style lang="scss" scoped>
    .cards-container {
        width: 100%;
        height: 100%;
        min-height: 80vh;
        padding: 25px 15px 25px 15px;
    }

    .scroll-bottom {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        margin-left: auto;
        margin-right: 15px;
        border-radius: 50%;
        background-color: #fff;
        position: sticky;
        position: -webkit-sticky;
        bottom: 15px;
        cursor: pointer;

        &-badge {
            width: 18px;
            height: 18px;
            background-color: #EB5757;
            border-radius: 50%;
            position: absolute;
            top: -9px;
            right: -6px;
            font-size: 12px;
            font-weight: 600;
            color: #fff;
            text-align: center;
        }

        &--with-form {
            bottom: 93px;
        }
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