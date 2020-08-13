<template>    
		<div class="d-flex">
			<image-gallery :files="prepareImages" :active="active.gallery_file" v-if="active.gallery" @close="active.gallery = false"></image-gallery>

			<message-view :message="data" v-if="active.view" @close="active.view = false"></message-view>


			<div class="card" :id="data._id">
				<div class="card_one">
				
					<div class="d-flex flex-row flex-wrap" style="padding:1.25rem;" v-if="prepareFiles">
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

					<div class="card-body" style="min-height:auto;font-size:14px;" v-if="data.price">
					
						<div style="float:left;width:75%;">
							<div style="font-size:16px;" class="card-text" v-if="data.title"><b>{{ messageTopictitle }}</b></div>
							<div style="margin-top:20px;" id="description" v-if="data.description" >
								<span v-html="messageTopicdescription"></span>
								<span v-if="read_more" @click="read_more_show()" style="margin-left:5px;color: rgb(5, 106, 240);">more</span>
							</div>

							<div style="margin-top:20px;" v-if="description_full" v-html="messageTopicdescription_full"></div>
						</div>	
						<div style="float:left;width: calc(25% - 20px);margin-left:20px;font-size:16px;text-align:right;" class="card-text" v-if="data.price"><b>${{ messageTopicprice }}</b></div>
						<div style="clear:both;"></div>				

						<div v-if="buy_now"  style="margin-top:15px;">

							<div>
								<div style="float:left;">
									<div style="display: inline-block;position: relative;top: -5px;"><b>Count:</b></div>
									<div style="height: 42px;display: inline-block;margin-left:10px;border-radius: 8px;border: 1px solid #E7E7E7;">
										<div @click.stop="minus_price(data._id)" style="text-align: center;font-size: 30px;line-height: 30px;padding: 5px;text-align:center;display: inline-block;cursor:pointer;background: #F7F7F7;width:40px;height:40px;border-right: 1px solid #E7E7E7;">-</div>
										<input style="text-align: center;position: relative; top: -6px;display: inline-block;width:40px;height:40px;border:0px;" type="text" value="1" :id="'count' + data._id">
										<div @click.stop="plus_price(data._id)" style="text-align: center;font-size: 30px;line-height: 30px;padding: 5px;text-align:center;display: inline-block;cursor:pointer;background: #F7F7F7;width:40px;height:40px;border-left: 1px solid #E7E7E7;">+</div>
									</div>
								</div>
								<div style="float:right;text-align:right;    margin-top: 10px;">
									<b>Total: $<span :id="'total_price' + data._id" :data="data.price">{{ messageTopicprice }}</span></b>
								</div>
								<div style="clear:both;"></div>
							</div>
							
							
							<div style="margin-top:15px;"><b>Payment details:</b></div>
							
							<div style="padding: 20px;width: 268px;height: 169px;margin-top:15px;background: linear-gradient(180deg, rgba(247, 247, 247, 0) 0%, #F7F7F7 100%);
	border: 1.05875px solid #E7E7E7;
	box-sizing: border-box;
	border-radius: 8.46997px;">
								<div style="text-align:right;"><img style="vertical-align:middle;" src="/images/pay.png"></div>
								
								<div style="margin-top:15px;"><input style="border:0px;border-bottom:1px solid #ccc;width:100%;" type="text" placeholder="Card number" :id="'number' + data._id"></div>
								
								<div style="float:left;margin-top:15px;">
									<div style="color:rgb(204, 204, 204);margin-bottom:5px;font-size:9px;">Month & Year</div>
									
									<input style="border:0px;border-bottom:1px solid #ccc;width:30px;" type="text" maxlength="2" placeholder="00" :id="'month' + data._id">/
									<input style="border:0px;border-bottom:1px solid #ccc;width:30px;" type="text" maxlength="2" placeholder="00" :id="'year' + data._id">
								</div>
								
								<div style="float: right; text-align: right; margin-top: 30px;"><input style="border:0px;border-bottom:1px solid #ccc;width:40px;" type="text" maxlength="3" placeholder="CVV" :id="'CVV' + data._id"></div>
								<div style="clear:both;"></div>
							</div>
							
							<div style="margin-top:15px;"><b>Other details</b></div>
							
							<div style="margin-top:15px;"><input style="border:0px;border-bottom:1px solid #ccc;width:100%;" type="text" placeholder="Name" :id="'name' + data._id"></div>
							<div style="margin-top:15px;"><input style="border:0px;border-bottom:1px solid #ccc;width:100%;" type="text" placeholder="E-mail" :id="'email' + data._id"></div>
							<div style="margin-top:15px;"><input style="border:0px;border-bottom:1px solid #ccc;width:100%;" type="text" placeholder="Adress" :id="'adress' + data._id"></div>

						</div>
						
						<div class="card-text bottom_buy" v-if="pay_now" @click.stop="Pay(data)">Buy now</div>
						<div class="card-text bottom_buy" v-if="data.price && bottom_buy" @click.stop="Buy()">Buy now</div>
	
							<div class="mdi mdi-close text-secondary" 
								style="bottom: 70px;cursor: pointer;font-size:20px;float: right;right: 25px;position: absolute;color: #000 !important;" 
								@click="buy_now_close()" v-if="pay_now"></div>						
						
						<div style="border-top:1px solid #E7E7E7;padding-top: 10px;" v-if="$auth.check(['editor']) || ($auth.check(['shop']) && $auth.user()._id == data.user_id)">
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
						</div>	
					
					</div>

					
					
					<div class="card-body" style="min-height:auto;font-size:14px;" v-else>
					
						<div>
							<div style="font-size:16px;" class="card-text" v-if="data.title"><b>{{ messageTopictitle }}</b></div>
							<div style="margin-top:20px;" id="description" v-if="data.description" >
								<span v-html="messageTopicdescription"></span>
								<span v-if="read_more" @click="read_more_show()" style="margin-left:5px;color: rgb(5, 106, 240);">more</span>
							</div>

							<div style="margin-top:20px;" v-if="description_full" v-html="messageTopicdescription_full"></div>
						</div>						
						
						<div style="border-top:1px solid #E7E7E7;padding-top: 10px;" v-if="$auth.check(['editor']) || ($auth.check(['shop']) && $auth.user()._id == data.user_id)">
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
						</div>	
					
					</div>					

				</div>	

			</div>		

			<div v-show="fons" style="position: fixed;z-index: 103;top: 0px;left: 0px;width: 100%;height: 100%;background: #000;opacity: 0.3;"></div>

			<div class="d-flex flex-column justify-content-start ml-3" v-if="sideIcons" style="margin-top: 40px;">
			<i class="mdi mdi-share-variant ellipse_right_bar_msg text-secondary" 
				style="cursor:pointer;font-size:20px;" 
				@click="shareMessage(data)"></i>
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
			read_more:false,
			description_full:false,
            active: {
                view: false,
                gallery: false,
                gallery_file: null
            },
            audio: null,
			comment:null,
			fons: null,
			buy_now:false,
			pay_now:false,
			bottom_buy:true,
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
        messageTopicprice() {
            let app = this
            let name = app.data.price

            return name
        },	
        buy_now_close() {
            let app = this
            app.buy_now = false
			app.pay_now = false;
			app.bottom_buy = true;
        },				
        read_more_show() {
            let app = this
            app.read_more = false
			app.data.description = false
			app.description_full = true
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

			if (langs) {
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

			if (name.length>190) {
				name=name.substr(0,190)
				name+='... ';	
				app.read_more = true;
			}
            return name
        },
        messageTopicdescription_full() {
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

			if (langs) {
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
    },
    methods: {
		Pay(datas) {
			let app = this
			if ($('#number'+datas._id).val()!='' && $('#name'+datas._id).val()!='' && $('#email'+datas._id).val()!='' && $('#adress'+datas._id).val()!='' && $('#month'+datas._id).val()!='' && $('#year'+datas._id).val()!='' && $('#CVV'+datas._id).val()!='') {
				
				var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];		

				var d = new Date();

				var curr_date = d.getDate();

				var curr_month = d.getMonth();

				var curr_year = d.getFullYear();

				var curr_minutes = d.getMinutes();
				
				if (curr_minutes<10) curr_minutes="0"+curr_minutes  
				
				var curr_hours = d.getHours();
				
				if (curr_hours<10) curr_hours="0"+curr_hours  

				let payments = {
					shop_id: datas._id,
					number: $('#number'+datas._id).val(),
					month: $('#month'+datas._id).val(),
					year: $('#year'+datas._id).val(),
					CVV: $('#CVV'+datas._id).val(),
					name: $('#name'+datas._id).val(),
					email: $('#email'+datas._id).val(),
					adress: $('#adress'+datas._id).val(),
					count: $('#count'+datas._id).val(),
					time: month[curr_month] + " " + curr_date + ", " + curr_year + ", " + curr_hours + ":" + curr_minutes,
				}


				axios.post('/payments', payments)
				.then(response => {
					 alert('BUY');
				}).catch(error => {
					console.log('Error')
				});
				
			} else alert('Not all fields are filled');
        },	
        Buy() {
			let app = this
			app.buy_now = true;
			app.pay_now = true;
			app.bottom_buy = false;
        },	
		minus_price(uid) {
			var val=$('#count'+uid).val();
			val--;
			if (val<=1) val=1;
			$('#count'+uid).val(val);
			
			var price=$('#total_price'+uid).attr('data')*val;
			$('#total_price'+uid).text(price);
		},
		plus_price(uid) {
			var val=$('#count'+uid).val();
			val++;
			$('#count'+uid).val(val);
			
			var price=$('#total_price'+uid).attr('data')*val;
			$('#total_price'+uid).text(price);			
		},
        openLink(url, prop) {
            //window.open(url, prop);
        },
        openGallery(file) {
            let app = this
			app.active.gallery = true
			app.active.gallery_file = file			
        },
        openFile(url) {
            //window.open(url, '_blank')
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
    }

}
</script>
<style lang="scss" scoped>
	input {outline:none;}

    .card {
        width: 85%;
        max-width: 683px;
		min-height: 90px;
		border: none;
		background: none;
		margin-top: 40px;
    }
    .card_one {
        border-radius: 20px;
        background: #fff;
        box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.14);
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
        border-radius: 10px;

        &__image {
			width: 100%;
			margin: 0 auto;
			border-radius: 10px;
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
	.popup1 {
		position: absolute;
		z-index: 1;
		top: 110px;
		left: -100px;
		width: 120px;
		height: 80px;
		background: #ffffff;
		border: 1px solid #767779;
		border-radius: 10px;
		padding: 10px;
		color: #767779;
		font-size: 14px;
	}
	.popup2 {
		position: fixed;
		z-index: 104;
		top: 30%;
		width: 260px;
		height: 230px;
		background: #ffffff;	
		padding:15px;
		border:1px solid #6c757d;
		border-radius:10px;
		color:#828991;
		font-weight: 600;
		margin:auto;
		left:0;
		right:0;
	}
	.data_attached {
		margin-left: -10px;
		background:#007bff;
		text-align:center;
		color:#fff;
		border-radius:5px;
		padding:5px;
	}
	.bottom_buy {
		cursor:pointer;
		margin-top:20px;
		margin-bottom: 20px;
		color: #056AF0;
		text-align:center;
		font-family: Roboto;
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 16px;
		text-align: center;
		text-transform: capitalize;
	}
</style>
