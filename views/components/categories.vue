<template>    
	<div :id="'cat'+data._id" class="cat_name cat_name_first" @click="categories()">{{ categoriestitle }}</div>
</template>
<script>
import ResizeTextarea from '../utils/resizeTextarea'
import MessageSettings from './message_settings.vue'
import MessageFilelist from './message_filelist.vue'
import PopupError from '../components/popup/error.vue'
import resizeTextarea from '../utils/resizeTextarea';
import MessageCategories from './message_categories.vue'

export default {
    components: { ResizeTextarea, MessageSettings, MessageFilelist, PopupError, MessageCategories },
    props: {
        data: {
            type: Object,
            default: {}
        },
    },
	computed: {
		categoriestitle() {
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

	},
    methods: {
        categories() {
            let app = this
            app.$emit('create', app.data)
        },
    }

}
</script>
<style lang="scss" scoped>
.cat_name {
margin: 10px 10px 10px 10px;
    border-radius: 100px;
    padding: 4px 14px 4px 14px;
    text-align: center;
    font-family: SF Pro Display;
    font-weight: normal;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
}

.cat_name_first {
	color:#B2BBC3;
	background: #EBEDF0;
}
.cat_name_second {
	color:#fff;
	background: #056AF0;
}
</style>


