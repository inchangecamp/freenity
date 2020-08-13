<template>
    <div class="position-sticky w-100" style="bottom: 0;">
		
        <div class="card"  v-if="$auth.check(['seller','editor'])">

            <message-settings ref="messageSettingsComponent" :data="data"></message-settings>
            <popup-error :text="errorMessage"></popup-error>
            <message-filelist :files="data.files" @remove="removeFile"></message-filelist>

			
			<div v-if="field_full">
	
					<div class="card-body d-flex flex-column" style="box-shadow:none;border-top:1px solid #D0D0D0;">

						<div class="d-flex flex-row">

							<div class="d-flex flex-column flex-grow-1 ml-3">					
					
								<textarea class="form-control flex-grow-1 no_border" id="title" rows="1" v-model="fields.title"
									@paste="show_close();" 
									@keypress="show_close();" 
									@keyup="show_close();" 
									@delete="show_close();" placeholder="Product name"></textarea>

							</div>
							
							<div v-if="close_title" class="d-flex align-items-center justify-content-end" style="width:40px;height: 33px;">
								<i class="mdi mdi-close" style="font-size:24px;margin-left: 5px;color: #6c757d;cursor:pointer;" @click.stop="deletetitle()"></i>
							</div>

						</div>

					</div>
					
					
					<div class="card-body d-flex flex-column" style="box-shadow:none;border-top:1px solid #D0D0D0;">

						<div class="d-flex flex-row">

							<div class="d-flex flex-column flex-grow-1 ml-3">					
					
								<textarea class="form-control flex-grow-1 no_border" rows="1" id="price" v-model="fields.price"
									@paste="show_close();" 
									@keypress="show_close();" 
									@keyup="show_close();" 
									@delete="show_close();" placeholder="Add prise"></textarea>

							</div>
							
							<div v-if="close_price" class="d-flex align-items-center justify-content-end" style="width:40px;height: 33px;">
								<i class="mdi mdi-close" style="font-size:24px;margin-left: 5px;color: #6c757d;cursor:pointer;" @click.stop="deleteprice()"></i>
							</div>

						</div>

					</div>

			</div>
			
			

            <div class="card-body d-flex flex-column" style="box-shadow:none;border-top:1px solid #D0D0D0;border-bottom:1px solid #D0D0D0;">
				
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
                            <textarea class="form-control flex-grow-1" rows="1" id="description" v-model="fields.description"
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
				<div style="cursor:pointer;font-size:14px;text-align:center;" class="text-secondary" @click="go_news()"><img src="/images/news.png"><br>News</div>
				<div style="cursor:pointer;font-size:14px;text-align:center;" class="text-primary"><img src="/images/shop_action.png"><br>Shop</div>				
			 </div>	
        </div>		

    </div>    
</template>
<script>
import ResizeTextarea from '../utils/resizeTextarea'
import MessageSettings from './message_settings.vue'
import MessageFilelist from './message_filelist.vue'
import PopupError from '../components/popup/error.vue'

export default {
    components: { ResizeTextarea, MessageSettings, MessageFilelist, PopupError },
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
			close_price: false,
			close_title: false,
			action_send: false,
            loading: {
                file: false,
                post: false
            },
            fields: {
                title: null,
                description: null,
				price: null
            },
            data: { files: [] }
        }
    },
    methods: {
		show_close(input) {
            let app = this;

			if ($("textarea").is("#title")) {
				if ($('#title').val()=='') app.close_title = false
				else app.close_title = true

				if ($('#price').val()=='') app.close_price = false
				else app.close_price = true

				if ($('#price').val()=='' && $('#description').val()=='' && $('#title').val()=='') app.action_send = false
				else app.action_send = true
			} else {
				if ($('#title').val()=='') app.action_send = false
				else app.action_send = true
			}
        },	
		go_news() {
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
			
			app.$router.push({ path: '/', query: { lang: langs } })
        },
	    open_full_form() {
            let app = this;
			if (app.field_full == true) app.field_full = false
			else app.field_full = true
        },	
	    deleteprice() {
            let app = this;
			$('#url').val('')
			app.fields.price = null
			app.close_price = false

			if ($('#price').val()=='' && $('#description').val()=='' && $('#title').val()=='') app.action_send = false
			else app.action_send = true
        },

	    deletetitle() {
            let app = this;
			$('#title').val('')
			app.fields.title = null
			app.close_title = false

			if ($('#price').val()=='' && $('#description').val()=='' && $('#title').val()=='') app.action_send = false
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
			
			if (app.fields.description) {

			   data.title = app.fields.title
			   data.description = app.fields.description
			   data.price = app.fields.price
			   
			   data.lang = langs
			   
			   data.description = data.description.replace(/(?:\r\n|\r|\n)/g, '<br>');
			   
			   	var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];		

				var d = new Date();

				var curr_date = d.getDate();

				var curr_month = d.getMonth() + 1;

				var curr_year = d.getFullYear();

				var curr_minutes = d.getMinutes();
				
				if (curr_minutes<10) curr_minutes="0"+curr_minutes  
				
				var curr_hours = d.getHours();
				
				if (curr_hours<10) curr_hours="0"+curr_hours 
				
				data.date=month[curr_month] + " " + curr_date + ", " + curr_year + ", " + curr_hours + ":" + curr_minutes
			   
			   app.loading.post = true
			   app.action_send = false
			   
				axios.post('/shop', data)
				.then(response => {
					app.$emit(response.data.method, response.data.data)
					app.loading.post = false
					app.field_full = false
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
            app.fields = { title: null, description: null , price: null }
            app.field_full = false
            app.loading = { file: false, post: false }
			$('.form-control').css('height','31px');
			$('#categories').val('');
			$('.field_categories').html('');
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
               
			    app.fields = { title: eval("app.data.title_"+langs), description: eval("app.data.description_"+langs), price: app.data.price }
                
				app.field_full = false
				let height=app.data.title.split('<br>').length

				let heightpx=31*height
				$('.form-control').css('height',heightpx+'px');				
                app.$nextTick(function () {
                    app.field_full = false
                })
            }
        }
    },
    computed: {
	
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
	
	.field_categories {
		margin-left: 235px;
		color: #007bff;
		width: 85px;
		text-align: right;
	}	
@media screen and (max-width: 450px) {
	.row_setting {
		margin-left: 0px;
	}
	
	.ml-5, .mx-5 {
		margin-left: 1.5rem !important;
	}
	
	.field_categories {
		margin-left: 160px;
	}
}
	
	.form_more {
		max-height: 150px;
		padding: 0;
		overflow: hidden;
		white-space: nowrap;
		box-shadow: inset 0px -4px 6px rgba(0,0,0,0.15);
		position: relative;
		z-index: 10;
		background: #fff;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
	}	
	
	.no_more {
		display:block !important;
	}
	
	.form_more_display {
		display:block !important;
	}
	
	.form_more_display_none {
		display:none !important;
	}
	
	.more {
		display:none !important;
	}
	

@media screen and (max-width: 600px) {
	.more {
		display:block !important;
	}
	.no_more {
		display:none !important;
	}

}		
	
.no_border {
	border: 0px;
}	

	
textarea::-webkit-input-placeholder {opacity:0.5;}
textarea::-moz-placeholder          {opacity:0.5;}/* Firefox 19+ */
textarea:-moz-placeholder           {opacity:0.5;}/* Firefox 18- */
textarea:-ms-input-placeholder      {opacity:0.5;}
</style>


