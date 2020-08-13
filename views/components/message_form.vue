<template>

    <div class="position-sticky w-100" style="bottom: 0;">

		<div class="card" v-if="$auth.check(['creator'])">
			<div class="card-body d-flex flex-column" style="border-bottom: 1px solid #D0D0D0;width:100%;height:40px;">
				<span style="text-align: center;">
					<span class="mdi mdi-message-plus mr-1 text-primary" style="font-size:18px;"></span>
					<span style="font-size:14px;" class="text-primary" @click="go_create()">Suggest your post</span>
				</span>
			 </div>
		</div>
				
        <div class="card" v-if="$auth.check(['author','editor'])">

            <message-settings ref="messageSettingsComponent" :data="data"></message-settings>
            <popup-error :text="errorMessage"></popup-error>
            <message-filelist :files="data.files" @remove="removeFile"></message-filelist>

			
			<div v-if="field_full">	

				<div class="card" v-if="$auth.check(['editor'])">
					<div class="card-body d-flex flex-column" style="width:100%;height:40px;">
						<span style="text-align: center;">
							<span class="mdi mdi-message-plus mr-1 text-primary" style="font-size:18px;"></span>
							<span style="font-size:14px;" class="text-primary" @click="go_create()">Suggest your post</span>
						</span>
					 </div>
				</div>
			
				<div v-if="$auth.check(['author','editor'])">	
			
					<div class="card-body d-flex flex-column" style="box-shadow:none;border-top:1px solid #D0D0D0;">		
						<input type="hidden" id="categories">
						<message-categories ref="messageCategoriesComponent"></message-categories>
					</div>
					
					<div class="card-body d-flex flex-column" style="box-shadow:none;border-top:1px solid #D0D0D0;">

						<div class="d-flex flex-row">

							<div class="d-flex flex-column flex-grow-1 ml-3">					
					
								<textarea class="form-control flex-grow-1 no_border" id="special" rows="1" v-model="fields.special"
									@paste="show_close();" 
									@keypress="show_close();" 
									@keyup="show_close();" 
									@delete="show_close();" placeholder="News title"></textarea>

							</div>

							<div v-if="close_special" class="d-flex align-items-center justify-content-end" style="width:40px;height: 33px;">
								<i class="mdi mdi-close" style="font-size:24px;margin-left: 5px;color: #6c757d;cursor:pointer;" @click.stop="deletespecial()"></i>
							</div>

						</div>

					</div>


					<div class="card-body d-flex flex-column" style="box-shadow:none;border-top:1px solid #D0D0D0;">

						<div class="d-flex flex-row">
							<div class="d-flex align-items-center" style="height: 33px;">
								<label class="mdi mdi-link text-secondary" style="font-size:24px;"></label>
							</div>

							<div class="d-flex flex-column flex-grow-1 ml-3">					
					
								 <textarea class="form-control flex-grow-1" rows="1" id="url" v-model="fields.url" 
									@paste="debounceScrapingMeta;show_close();" 
									@keypress="debounceScrapingMeta;show_close();" 
									@keyup="debounceScrapingMeta;show_close();" 
									@delete="debounceScrapingMeta;show_close();"
									 placeholder="link" style="border: 0px;"></textarea>

							</div>

							<div v-if="close_url" class="d-flex align-items-center justify-content-end" style="width:40px;height: 33px;">
								<i class="mdi mdi-close" style="font-size:24px;margin-left: 5px;color: #6c757d;cursor:pointer;" @click.stop="deletelink()"></i>
							</div>

						</div>

					</div>
				</div>
			</div>	
			
			
			
            <div v-if="$auth.check(['author','editor'])" class="card-body d-flex flex-column" style="box-shadow:none;border-top:1px solid #D0D0D0;border-bottom:1px solid #D0D0D0;">

                <div class="d-flex flex-row">
                    <div class="d-flex align-items-center" style="height: 33px;">
                        <input type="file" id="filepicker" ref="filepicker" class="d-none" @change="uploadFile" multiple>
                        
                        <label for="filepicker" 
                            class="mdi text-secondary" style="font-size:24px;"
                            :class="{ 
                                'mdi-loading mdi-spin': loading.file,
                                'mdi-attachment': !loading.file
                            }"
                            :style="!loading.file ? 'transform: rotate(-30deg);' : null"></label>
                    </div>

                    <div class="d-flex flex-column flex-grow-1 ml-3">					
						
                        <resize-textarea>
                            <textarea class="form-control flex-grow-1 textarea_comment" rows="1" id="comment" v-model="fields.comment"
								@paste="show_close();" 
								@keypress="show_close();" 
								@keyup="show_close();" 
								@delete="show_close();" placeholder="Message"></textarea>
                        </resize-textarea>
						
                    </div>

                    <div class="d-flex align-items-center justify-content-end" style="width:40px;height: 33px;">
						
						<i class="mdi mdi-menu text-secondary" @click="open_full_form()" style="position:absolute;right: 70px;font-size:24px;"></i>

						<i class="mdi mdi-send ml-2"
							:class="{ 
								'text-primary': action_send,
								'text-secondary': !action_send
							}"
                            style="font-size:24px;cursor:pointer;" @click="putMessage()" v-if="!loading.post"></i>
							
						<i class="mdi mdi-loading mdi-spin text-secondary" style="font-size:24px;" v-if="loading.post"></i>
							 
                    </div>
                </div>

            </div>

        </div>
		
		<div class="card">
			<div class="card-body d-flex flex-row" style="box-shadow:none;width:100%;justify-content: space-around;">
				<div style="cursor:pointer;font-size:14px;text-align:center;" class="text-primary"><img src="/images/news_action.png"><br>News</div>
				<div style="cursor:pointer;font-size:14px;text-align:center;" class="text-secondary" @click="go_shop()"><img src="/images/shop.png"><br>Shop</div>				
			 </div>	
		</div>		
		
    </div>    
</template>
<script>
import ResizeTextarea from '../utils/resizeTextarea'
import MessageSettings from './message_settings.vue'
import MessageFilelist from './message_filelist.vue'
import PopupError from '../components/popup/error.vue'
import MessageCategories from './message_categories.vue'

export default {
    components: { ResizeTextarea, MessageSettings, MessageFilelist, PopupError, MessageCategories },
    props: {
        passedData: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            errorMessage: null,
			field_full: false,
			close_special: false,
			close_url: false,
			action_send: false,
            loading: {
                file: false,
                post: false
            },
            fields: {
                url: null,
                comment: null,
				special: null,
				categories: null
            },
            data: { files: [] }
        }
    },
    methods: {
	    show_close(input) {
            let app = this;
			
			if ($("textarea").is("#special")) {
				if ($('#special').val()=='') app.close_special = false
				else app.close_special = true

				if ($('#url').val()=='') app.close_url = false
				else app.close_url = true

				if ($('#url').val()=='' && $('#comment').val()=='' && $('#special').val()=='') app.action_send = false
				else app.action_send = true
			} else {
				if ($('#comment').val()=='') app.action_send = false
				else app.action_send = true
			}
        },		
		
		
	    go_create() {
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
					
			var langs=params['lang'] ? params['lang'] : 'en'

			window.location.href='/create?lang='+langs;
 
        },		
	    go_shop() {
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
					
			var langs=params['lang'] ? params['lang'] : 'en'			
			
			app.$router.push({ path: '/shop', query: { lang: langs } })
        },
	    open_full_form() {
            let app = this;
			if (app.field_full == true) app.field_full = false
			else app.field_full = true
        },	
	    deletelink() {
            let app = this;
			$('#url').val('')
			app.fields.url = null
			app.close_url = false

			if ($('#url').val()=='' && $('#comment').val()=='' && $('#special').val()=='') app.action_send = false
			else app.action_send = true
        },

	    deletespecial() {
            let app = this;
			$('#special').val('')
			app.fields.special = null
			app.close_special = false

			if ($('#url').val()=='' && $('#comment').val()=='' && $('#special').val()=='') app.action_send = false
			else app.action_send = true
        },
        putMessage() {
            let app = this
            let data = app.data
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
			
			if (app.fields.comment || app.fields.url  || app.fields.special || app.data.files[0].type) {
				
			   data.special_post = app.fields.special
			   
			   data.comment = app.fields.comment
			   if (data.comment) data.comment = data.comment.replace(/(?:\r\n|\r|\n)/g, '<br>');
			   
			   data.categories = $('#categories').val()
			  
			   data.lang = langs

				var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];		

				var d = new Date();

				var curr_date = d.getDate();

				var curr_month = d.getMonth();

				var curr_year = d.getFullYear();

				var curr_minutes = d.getMinutes();
				
				if (curr_minutes<10) curr_minutes="0"+curr_minutes  
				
				var curr_hours = d.getHours();
				
				if (curr_hours<10) curr_hours="0"+curr_hours  

				data.date=month[curr_month] + " " + curr_date + ", " + curr_year + ", " + curr_hours + ":" + curr_minutes
			   
			   app.loading.post = true
			   app.action_send = false
			   console.log(data);
				axios.post('/messages', data)
				.then(response => {

				if (response.data.method=='update') {

					axios.get('/categories/'+response.data.data.categories)
					.then(async response2 => {
						response.data.data.categories_title=response2.data.data
						app.$emit(response.data.method, response.data.data)
						app.loading.post = false
						app.field_full = false
					}).catch(function(error) {
						console.log(error);
					});						

				} else {
					app.$emit(response.data.method, response.data.data)
					app.loading.post = false
					app.field_full = false
				}

				}).catch(error => {
					app.loading.post = false
					app.errorMessage = error.response.data.message;
					setTimeout(function () {
						app.errorMessage = null
					}, 3000)
				});
			}
        },
        uploadFile(e) {
            let app = this
            let files = e.target.files
            let uploaded_files = []

            app.loading.file = true
			
            for (let index = 0; index < files.length; index++) {

                let formData = new FormData
                formData.append('file', files[index])

                axios.post('/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                    }).then(response => {
                        uploaded_files.push(response.data.data)
                        
                        if (files.length == uploaded_files.length) {
                            let _files = JSON.parse(JSON.stringify(app.data.files || []))
                            _files = _files.concat(uploaded_files)
                            app.data.files = _files
                            app.loading.file = false

                            app.$refs.filepicker.type = 'text'
                            app.$refs.filepicker.type = 'file'
                        }
                    })
            } 
        },
        removeFile(file) {
            let app = this
            app.data.files.splice(app.data.files.indexOf(file), 1)
        },
        defaultState() {
            let app = this
            app.data = { files: [] }
            app.fields = { url: null, comment: null , special: null, categories: null }
            app.field_full = false
            app.loading = { file: false, post: false }
			$('.form-control').css('height','31px');
			$('#categories').val('');
            app.$refs.messageSettingsComponent.defaultState()
        }
    },
    watch: {
        'passedData': function () {
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

            if (app.passedData) {
                app.data = Object.assign({}, app.data, app.passedData)
                app.data = JSON.parse(JSON.stringify(app.data))
				
                app.fields = { url: app.data.url, comment: eval("app.data.comment_"+langs), special: eval("app.data.special_post_"+langs)}

				axios.get('/categories/'+app.data.categories)
				.then(async response => {
					$('#categories').val(app.data.categories);

				}).catch(function(error) {
					console.log(error);
				});										

				app.field_full = false
				let height=app.data.comment.split('<br>').length

				let heightpx=31*height
				$('.form-control').css('height',heightpx+'px');
                app.$nextTick(function () {
                    app.field_full = false
                })
            }
        }
    },
    computed: {
        debounceScrapingMeta() {
            let app = this;
                if (app.fields.url) {
                    app.loading.post = true
                    axios.post('/scraping/meta', {url: app.fields.url})
                    .then(response => {
                        app.loading.post = false
						
						if (response.data.response.description.length>400) {
							response.data.response.description=response.data.response.description.substr(0,400)
							response.data.response.description+='... ';	
						}	
						
                        app.data = Object.assign({}, app.data, response.data.response)
                    }).catch(error => {
                        app.loading.post = false
                        app.errorMessage = error.response.data.message;
                        setTimeout(function () {
                            app.errorMessage = null;
                        }, 3000);
                    });
                }

        }
    }
}

</script>
<style lang="scss" scoped>
    .card {
        max-width: 920px;
        background: none;
        border: none;
    }

    .card-body {
        background: #fff;

        display: flex;
        flex-flow: column nowrap;
        padding: 0.75rem 2rem;
        background: #fff;
        box-shadow: 0px -6px 4px rgba(0, 0, 0, 0.25);
        position: relative;
        z-index: 11;

        .form-control {
            font-size: 1.25rem;
            border-radius: 15px;
            resize: none;
        }
    }
	

	.row_setting {
		margin-left: 40px;
	}

	
@media screen and (max-width: 450px) {
	.row_setting {
		margin-left: 0px;
	}
	
	.ml-5, .mx-5 {
		margin-left: 1.5rem !important;
	}
	
}

.no_border {
	border: 0px !important;
}

.textarea_comment {
	padding-right: 20px;
}

textarea::-webkit-input-placeholder {opacity:0.5;}
textarea::-moz-placeholder          {opacity:0.5;}/* Firefox 19+ */
textarea:-moz-placeholder           {opacity:0.5;}/* Firefox 18- */
textarea:-ms-input-placeholder      {opacity:0.5;}
</style>