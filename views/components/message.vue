<template>    
		<div class="d-flex" v-view.once="seenMessage">
			<image-gallery :files="prepareImages" :active="active.gallery_file" v-if="active.gallery" @close="active.gallery = false"></image-gallery>

			<message-view :message="data" v-if="active.view" @close="active.view = false"></message-view>


			<div class="card" :id="data._id" v-if="data.special_post">
				<div class="card_one">

					<div v-if="data.url">
					
							<div style="text-align: right;padding: 10px;position: absolute;right: 15px;font-size: 14px;"><a style="text-decoration:none;color:#0769F0;" href="#" @click.stop.prevent="opencategories()">{{ messagecategories }}</a></div>

							<div class="card-header" :style="messageHeaderStyles" style="padding: 1.5rem 1rem 1.5rem 1rem;">
								
								<div v-if="data.categories_title" class="card-title-special font-weight-bold pl-4" style="margin-top: 25px;" v-html="messageTopiccommentspecial"></div>

								<div v-else class="card-title-special font-weight-bold pl-4 mt-2" v-html="messageTopiccommentspecial"></div>

							</div>
							
							<div class="card-body" style="min-height:auto;border-radius: 0px 0px 20px 0;" @click.stop="openView()" v-if="((data.url && data.site_name) || data.title || data.files.length || data.description)">
							
							<div :style="messageHeaderFont" class="clamp_special" style="font-size:14px;padding-bottom:10px;" v-if="data.comment" v-html="messageTopiccomment"></div>

							<div style="border: 1px solid #E7E7E7;border-radius: 8px;">
							
								<div class="d-flex flex-row flex-wrap" v-if="prepareFiles">
									<div class="file" style="cursor:pointer;" v-for="(file, i) in prepareFiles" :key="i">

										<div class="file__image" @click.stop="openGallery(file)" v-if="file.type == 'image'">
											<img class="file__image" :src="file.preview">
										</div>

										<div class="file__image-group" @click.stop="openGallery(file.group[0])" v-if="file.type == 'image_group'">
											<img class="file__image" :src="file.group[0].preview">
											<span class="file__image-group-count">
												{{ '+' + file.group.length }}
											</span>
										</div>

										<video :poster="file.preview" class="file__video w-100" controls :src="file.url" v-if="file.type == 'video'"></video>

										<iframe class="file__iframe w-100" :src="file.url" v-if="file.type == 'iframe'" frameborder="0" allowfullscreen></iframe>

										<div class="file__file bg-primary" v-if="file.type == 'file'" @click.stop="openFile(file.url)">
											<i class="mdi mdi-file-document text-white" style="font-size:42px;"></i>
										</div>

										<div class="file__file bg-primary" v-if="file.type == 'audio'" @click.stop="toggleAudio(file.url)">
											<i class="mdi mdi-music text-white" style="font-size:42px;"></i>
										</div>

									</div>
								</div>
								
								
								<div class="card-title font-weight-bold pl-4 mt-2 mb-3" v-if="data.title">{{ messageTopictitle }}</div>
								
								<div class="d-flex flex-row align-items-center pl-4" v-if="data.url && data.site_name">
									<div class="d-flex flex-column">
										<div class="d-flex flex-row">
											<a href="#" @click.stop.prevent="openLink(data.url, '_blank')" v-html="messageTopicSitename"></a>
										</div>

									</div>
								</div>
								
								<p class="card-text mx-4 mt-2 mb-4" style="font-size:14px;" v-if="data.description">{{ messageTopicdescription }}</p>								
								</div>
							</div>
					</div>

					<div v-else>
							<div style="text-align: right;padding: 10px;position: absolute;right: 15px;font-size: 14px;"><a style="text-decoration:none;color:#0769F0;" href="#" @click.stop.prevent="opencategories()">{{ messagecategories }}</a></div>

							<div class="card-header" :style="messageHeaderStyles" style="padding: 1.5rem 1rem 1.5rem 1rem;">

								<div v-if="data.categories_title" class="card-title-special font-weight-bold pl-4" v-html="messageTopiccommentspecial" style="margin-top: 25px;"></div>

								<div v-else class="card-title-special font-weight-bold pl-4 mt-2" v-html="messageTopiccommentspecial"></div>

							</div>

							<div class="card-body" style="min-height:auto;" @click.stop="openView()" v-if="data.comment">

				 
								<div :style="messageHeaderFont" class="clamp_special" v-if="data.comment" style="padding-bottom: 10px; font-size: 14px;" v-html="messageTopiccomment"></div>

								
								<div class="d-flex flex-row flex-wrap" v-if="prepareFiles">
									<div class="file" style="cursor:pointer;padding:0px;" v-for="(file, i) in prepareFiles" :key="i">

										<div class="file__image" @click.stop="openGallery(file)" v-if="file.type == 'image'">
											<img class="file__image" :src="file.preview">
										</div>

										<div class="file__image-group" @click.stop="openGallery(file.group[0])" v-if="file.type == 'image_group'">
											<img class="file__image" :src="file.group[0].preview">
											<span class="file__image-group-count">
												{{ '+' + file.group.length }}
											</span>
										</div>

										<video :poster="file.preview" class="file__video w-100" controls :src="file.url" v-if="file.type == 'video'"></video>

										<iframe class="file__iframe w-100" :src="file.url" v-if="file.type == 'iframe'" frameborder="0" allowfullscreen></iframe>

										<div class="file__file bg-primary" v-if="file.type == 'file'" @click.stop="openFile(file.url)">
											<i class="mdi mdi-file-document text-white" style="font-size:42px;"></i>
										</div>

										<div class="file__file bg-primary" v-if="file.type == 'audio'" @click.stop="toggleAudio(file.url)">
											<i class="mdi mdi-music text-white" style="font-size:42px;"></i>
										</div>

									</div>
								</div>
								
							</div>
					</div>

					<div style="border-top:1px solid #E7E7E7;padding-top: 10px;" v-if="$route.name=='messages' && ($auth.check(['editor']) || ($auth.check(['author']) && $auth.user()._id == data.user_id))">
						<div class="mdi ellipse_right_bar_msg mdi-close text-secondary" 
							style="cursor:pointer;font-size:20px;float: right;" 
							@click="removeMessage(data)"></div>

						<div class="mdi ellipse_right_bar_msg mdi-pencil"
							:class="{ 
								'text-primary': passedData && passedData._id == data._id, 
								'text-secondary': !passedData
							}"
							style="cursor:pointer;font-size:20px;float: right;"
							@click="editMessage(data)"></div>
							
							
						<div class="text-secondary mdi ellipse_right_bar_msg mdi-pin"
							style="cursor:pointer;font-size:20px;float: right;"
							v-if="$auth.check(['editor'])"
							@click="attachMessage(data)"></div>					
					</div>							

				</div>	

					<div style="margin-right: 15px;margin-top: 5px;">
						<div class="text-secondary ml-1" style="color: rgba(51, 51, 51, 0.2);float:right;font-size:10px;">{{ data.date }}</div>
						<div class="text-secondary ml-1" style="color: rgba(51, 51, 51, 0.2);float:right;font-size:10px;">{{ data.views }} views</div>
					</div>
			</div>

			
			
			
			
			<div class="card" :id="data._id" v-else>
				<div class="card_one">
					<div style="text-align: right;padding: 10px;position: absolute;right: 15px;font-size: 14px;"><a style="text-decoration:none;color:#0769F0;" href="#" @click.stop.prevent="opencategories()">{{ messagecategories }}</a></div>
					
					<div v-if="data.categories_title" class="card-header" :style="messageHeaderStyles">
						<div :class="data.color && data.color !== 'yellow' ? 'global-icon global-icon--white' : 'global-icon'"  style="margin-top: 15px;"></div>
						<span :style="messageHeaderFont" :class="{ 'clamp': clampComment }" v-html="messageTopicUrl" style="margin-top: 22px;"></span>
						<div class="topic-badge" v-if="data.topic">{{ messageTopicName }}</div>
					</div>

					<div v-else class="card-header" :style="messageHeaderStyles">
						<div :class="data.color && data.color !== 'yellow' ? 'global-icon global-icon--white' : 'global-icon'"></div>
						<span :style="messageHeaderFont" :class="{ 'clamp': clampComment }" style="margin-top: 7px;" v-html="messageTopicUrl"></span>
						<div class="topic-badge" v-if="data.topic">{{ messageTopicName }}</div>
					</div>
					
					<div class="card-body" style="min-height:auto;" @click.stop="openView()">

						<div style="padding-bottom: 10px;font-size:14px;" v-if="data.comment" v-html="messageTopiccomment"></div>
						
						<div style="border: 1px solid #E7E7E7;border-radius: 8px;">
							<div class="d-flex flex-row flex-wrap" v-if="prepareFiles">
								<div class="file" style="cursor:pointer;" v-for="(file, i) in prepareFiles" :key="i">

									<div class="file__image" @click.stop="openGallery(file)" v-if="file.type == 'image'">
										<img class="file__image" :src="file.preview">
									</div>

									<div class="file__image-group" @click.stop="openGallery(file.group[0])" v-if="file.type == 'image_group'">
										<img class="file__image" :src="file.group[0].preview">
										<span class="file__image-group-count">
											{{ '+' + file.group.length }}
										</span>
									</div>

									<video :poster="file.preview" class="file__video w-100" controls :src="file.url" v-if="file.type == 'video'"></video>

									<iframe class="file__iframe w-100" :src="file.url" v-if="file.type == 'iframe'" frameborder="0" allowfullscreen></iframe>

									<div class="file__file bg-primary" v-if="file.type == 'file'" @click.stop="openFile(file.url)">
										<i class="mdi mdi-file-document text-white" style="font-size:42px;"></i>
									</div>

									<div class="file__file bg-primary" v-if="file.type == 'audio'" @click.stop="toggleAudio(file.url)">
										<i class="mdi mdi-music text-white" style="font-size:42px;"></i>
									</div>

								</div>
							</div>				
							
							<div class="card-title font-weight-bold pl-4 mt-2 mb-3" v-if="data.title">{{ messageTopictitle }}</div>
							
							<div class="d-flex flex-row align-items-center pl-4" v-if="data.url && data.site_name">
								<div class="d-flex flex-column">
									<div class="d-flex flex-row">
										<a href="#" @click.stop.prevent="openLink(data.url, '_blank')" v-html="messageTopicSitename"></a>
									</div>

								</div>
							</div>
							
							<p class="card-text mx-4 mt-2 mb-4" style="font-size:14px;" v-if="data.description">{{ messageTopicdescription }}</p>
						</div>
					</div>

					<div style="border-top:1px solid #E7E7E7;padding-top: 10px;" v-if="$route.name=='messages' && ($auth.check(['editor']) || ($auth.check(['author']) && $auth.user()._id == data.user_id))">
						<div class="mdi ellipse_right_bar_msg mdi-close text-secondary" 
							style="cursor:pointer;font-size:20px;float: right;" 
							@click="removeMessage(data)"></div>

						<div class="mdi ellipse_right_bar_msg mdi-pencil"
							:class="{ 
								'text-primary': passedData && passedData._id == data._id, 
								'text-secondary': !passedData
							}"
							style="cursor:pointer;font-size:20px;float: right;"
							@click="editMessage(data)"></div>
							
						<div class="text-secondary mdi ellipse_right_bar_msg mdi-pin"
							style="cursor:pointer;font-size:20px;float: right;"
							v-if="$auth.check(['editor'])"
							@click="attachMessage(data)"></div>					
					</div>							

				</div>	

					<div style="margin-right: 15px;margin-top: 5px;">
						<div class="text-secondary ml-1" style="color: rgba(51, 51, 51, 0.2);float:right;font-size:10px;">{{ data.date }}</div>
						<div class="text-secondary ml-1" style="color: rgba(51, 51, 51, 0.2);float:right;font-size:10px;">{{ data.views }} views</div>
					</div>
			</div>		

			
			
			

			
			
			<div class="d-flex flex-column justify-content-start ml-3" v-if="sideIcons">

				<i class="mdi mdi-share-variant ellipse_right_bar_msg text-secondary" 
					style="cursor:pointer;font-size:20px;" 
					@click="shareMessage(data)"></i>

				<i class="mdi ellipse_right_bar_msg" 
					style="cursor:pointer;font-size:20px;"
					:class="{ 
						'mdi-star': data.is_favourite, 
						'mdi-star-outline': !data.is_favourite, 
						'text-warning': data.is_favourite, 
						'text-secondary': !data.is_favourite }"
					v-if="$auth.check()"
					@click="favouriteMessage(data)"></i>
			</div>


		</div>
</template>
<script>
import SystemConsts from '../utils/const.js'
import ImageGallery from '../components/image_gallery.vue'

export default {
    components: { ImageGallery },
    props: {
        data: {
            type: Object,
            default: {}
        },
        sideIcons: {
            type: Boolean,
            default: true
        },
        messageControlIcons: {
            type: Boolean,
            default: true
        },
        passedData: {
            type: Object,
            default: null
        },
        clampComment: {
            type: Boolean,
            default: true
        },
        unreadMessages: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data() {
        return {
            topics: SystemConsts.topics,
            colors: SystemConsts.colors,
            active: {
                view: false,
                gallery: false,
                gallery_file: null
            },
            audio: null,
			comment:null
        }
    },
    computed: {
        prepareFiles() {
            let app = this
            let files = []
            let image_group = []
            let other_files = app.prepareOtherFiles
            let images = app.prepareImages

            files = files.concat(other_files)

            images.forEach((image, i) => {
                if (i < 3) {
                    files.push(image)
                } else if (images.length == 4) {
                    files.push(image)
                } else {
                    image_group.push(image)
                }
            })

            if (image_group.length) {
                files.push({
                    type: 'image_group',
                    group: image_group
                })
            }

            return files.length ? files : null
        },
        prepareOtherFiles() {
            let app = this
            let files = app.data.files.filter(file => {
                return file.type != 'image'
            })
            return files
        },
        prepareImages() {
            let app = this
            let images = app.data.files.filter(file => {
                return file.type == 'image'
            })
            return images
        },
        messageTopicName() {
            let app = this
            let name = ''
            app.topics.filter(item => { 
                if (item.name == app.data.topic) {
                    name = item.text
                }
            })
            return name
        },
		messagecategories () {
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

			if (app.data.categories_title) eval("name = app.data.categories_title.title_"+langs);
			
			else name='';
			
			return name

		},
		
		opencategories () {
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

			if (app.data.categories) window.location.href='/?lang='+langs+'&cat='+app.data.categories

		},		
		messageTopicUrl () {

			let app = this
			let name = window.location.hostname.split('.').reverse();
			let str= name[1]
			return str[0].toUpperCase() + str.slice(1);
		},
		messageTopiccomment() {

            let app = this
            let name = app.data.comment_ru
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
			
			if (langs) {
				eval("name = app.data.comment_"+langs);
			}

			if (name) {
				app.comment = true
				var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
				name=name.replace(exp, "<a target='_blank' href='$1'>$1</a>");
				var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
				name=name.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');			
			}
				else app.comment = null

            return name
        },	
		messageTopiccommentspecial() {

            let app = this
            let name = app.data.special_post_ru
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
			
			if (langs) {
				eval("name = app.data.special_post_"+langs);
			}

            return name
        },			
		messageTopicSitename () {
            let app = this
            let name = '<img style="width: 16px;" src="'+app.data.favicon+'"> '+app.data.site_name;

            return name
		},
        messageTopictitle() {
            let app = this
            let name = app.data.title_ru
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
			
			if (langs) {
				eval("name = app.data.title_"+langs);
			}

            return name
        },	
        messageTopicdescription() {
            let app = this
            let name = app.data.description_ru
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
			
			if (langs && !app.data.websocket) {
				eval("name = app.data.description_"+langs);
			}
			
			if (name) {
				app.description = true
				var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
				name=name.replace(exp, "<a target='_blank' href='$1'>$1</a>");
				var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
				name=name.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');			
			}
				else app.description = null

            return name
        },
        messageHeaderStyles() {
            let app = this
            let bg = '#fff'
            let styles = []

            app.colors.filter(item => { 
                if (item.name == app.data.color) {
                    bg = item.hex
                }
            })

            styles.push(`background-color:${ bg };`)

            if (!(app.data.url && app.data.site_name) && !app.data.title && !app.data.files.length && !app.data.description) {
                styles.push('border-radius: 20px 20px 20px 0;')
            }

            return styles.join('')
        },
        messageHeaderFont() {
            let app = this
            let font = '#000'

            app.colors.filter(item => { 
                if (item.name == app.data.color) {
                    font = item.font
                }
            })

            return `color:${ font };`
        },
        debounceSeenMessage() {
            return _.debounce((e) => {
                let app = this;
                axios.post('/messages/'+ app.data._id +'/seen');
                app.data.views += 1;
            }, 3000);
        }
    },
    methods: {
        openCard() {
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

			
            app.$router.push({ name: 'message', params: { id: app.data._id } , query: { lang: langs } })
        },
        openView() {
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

				if (app.data.url) {
					if (app.data.site_name == 'https://www.instagram.com') {
						window.open(app.data.url,"_blank");			
					} else {
						app.$router.push({ name: 'messageView', params: { id: app.data._id }, query: { lang: langs } })
					}
				}
        },
        openLink(url, prop) {
            window.open(url, prop);
        },
        openGallery(file) {
            let app = this
			
			if (app.data.url) {
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

				if (app.data.site_name == 'https://www.instagram.com') {
					window.open(app.data.url,"_blank");			
				} else {
					app.$router.push({ name: 'messageView', params: { id: app.data._id }, query: { lang: langs } })
				}

			} else {
				app.active.gallery = true
				app.active.gallery_file = file			
			}
        },
        openFile(url) {
            window.open(url, '_blank')
        },
        toggleAudio(url) {
            let app = this;

            if (app.audio) {
                app.audio.pause();
                app.audio = null;
            } else {
                app.audio = new Audio(url);
                app.audio.play();
                app.audio.addEventListener('ended', function() {
                    app.audio = null;
                });
            }
        },
        removeMessage(data) {
            let app = this

            $.confirm({
                title: 'Confirm',
                content: 'Are you sure you want to remove this post?',
                buttons: {
                    confirm: function () {
                        app.$emit('remove', data)
                    },
                    cancel: function () {}
                }
            })  
        },
        editMessage(data) {
            let app = this
            app.$emit('edit', data)
        },
        attachMessage(data) {
            let app = this
			axios.post('/messages/'+ app.data._id +'/attached').then(response => {
				console.log(data);
				window.location.href=window.location.href;
			})
        },		
        shareMessage(data) {
            if (navigator.share !== undefined) {
                navigator.share({
                    title: data.comment,
                    url: location.origin + '/' + data._id
                }).then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing:', error))
            } else {
                const el = document.createElement('textarea')
                el.value = location.origin + '/' + data._id
                document.body.appendChild(el)
                el.select();
                document.execCommand('copy')
                document.body.removeChild(el)

                $.alert({
                    title: '',
                    content: 'Link copied to clipboard.',
                    backgroundDismiss: true
                })
            }
        },
        favouriteMessage(data) {
            let app = this;
            let isRemoveConfirm = true;

            if (app.data.is_favourite) {
                $.confirm({
                    title: 'Confirm',
                    content: 'Are you sure you want to remove this post from your favorites?',
                    buttons: {
                        confirm: function () {
                            axios.post('/messages/'+ app.data._id +'/favourite').then(response => {
                                app.data.is_favourite = response.data.is_favourite
                                app.$emit('favouriteToggle', app.data)
                            })
                        },
                        cancel: function () {}
                    }
                })
            } else {
                axios.post('/messages/'+ app.data._id +'/favourite').then(response => {
                    app.data.is_favourite = response.data.is_favourite
                    app.$emit('favouriteToggle', app.data)
                })
            } 
        },
        seenMessage(e) {
            let app = this
            app.debounceSeenMessage(e);
            
            app.unreadMessages.forEach(function (elem, index) {
                if (elem._id == app.data._id) {
                    app.$delete(app.unreadMessages, index)
                }
            })
        },
    }

}
</script>
<style lang="scss" scoped>
    .card {
        width: 85%;
        max-width: 683px;
		min-height: 90px;
		border: none;
		background: none;
    }
    .card_one {
        border-radius: 20px 20px 20px 0;
        background: #fff;
        box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.14);
		
		&:before {
            content: '';
            width: 15px;
            height: 20px;
            position: absolute;
            bottom: 20px;
            left: -15px;
            background: url('data:image/svg+xml;utf8,<svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.26402 20H13V0C12.9318 7.9093 8.37227 14.9355 0.845214 17.5632C-0.49502618.0311 -0.156637 20 1.26402 20Z" fill="white"/></svg>') no-repeat right;
            background-size: cover;
        }
    }
	
    .card-header {
        border: none;
        padding: 1.5rem 2.75rem 1.5rem 2.75rem;
        border-radius: 20px 20px 0 0;
        white-space: pre-line;
		font-weight: bold; 
		
        .global-icon {
			width: 40px;
			height: 40px;
            position: absolute;
			top: 1.5rem;
			left: 1.0rem;
            background: url('../assets/icons/msg_icon2.png') no-repeat center;
			background-size: cover;
			border-radius: 40px;
			
            &--white {
            background: url('../assets/icons/msg_icon2.png') no-repeat center;
			background-size: cover;
            }
        }
		
        .global-icon-special {
            width: 42px;
            height: 40px;
            position: absolute;
            top: 7.5rem;
            left: 1.0rem;
            background: url('../assets/icons/msg_icon2.png') no-repeat center;
			background-size: cover;
			border-radius: 40px;
			
            &--white {
            background: url('../assets/icons/msg_icon2.png') no-repeat center;
			background-size: cover;
            }
        }
		
        span {
            font-size: 1.25rem;
            padding-left: 25px;

            &.clamp {
                display: block;
                @supports(display: -webkit-box) {
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }

    .card-title {
        font-size: 1.167rem;
    }

    .card-text {
        max-height: 126px;
        overflow: hidden;
    }

    .file {
        flex: 1 1 50%;
        height: auto;
        min-height: 150px;
        border-radius: 10px 10px 0px 0px;

        &__image {
			width: 100%;
			margin: 0 auto;
			border-radius: 10px 10px 0px 0px;
			object-fit: cover;
			text-align: center;		
			
            &-group {
                width: 100%;
                height: 100%;
                position: relative;
                border-radius: 10px;

                .file__image {
                    position: absolute;
                }

                &-count {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    font-size: 24px;
                    line-height: 28px;
                    text-align: center;
                    color: #007bff;
                    position: relative;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 10px;
                }
            }
        }

        &__video {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            object-fit: cover;
        }

        &__iframe {
            width: 100%;
            height: 100%;
            min-height: 280px;
            border: none;
        }

        &__file {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }
    }
	.clamp_special {
		font-size: 1.25rem!important;	
		padding-left: 0px!important;	
	}
    .topic-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 76px;
        height: 76px;
        padding: 0 2px;
        position: absolute;
        border: 2px solid #EB5757;
        border-radius: 50%;
        top: -20px;
        right: -10px;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 12px;
        color: #000;
        text-align: center;
        background: #fff;
    }
	.card-title-special {
		color:#fff;
		text-align:center;
		font-size: 25px;
		background: #00A39F;
		padding:10px;
	}
	.ellipse_right_bar_msg {
		background: #fff;
		border-radius: 30px;
		margin-bottom: 10px;
		padding: 5px;
		text-align: center;
		width: 40px;
		height: 40px;
	}
	.card-body {
        padding: 0rem 1.25rem 1.25rem 1.25rem;
	}

</style>


