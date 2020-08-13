<template>
			<div class="form_categoriestext">			 
				<div v-for="categorie in categories" :key="categorie._id" >
					<categories :data="categorie" @create="createCategories"></categories>
				</div>
			</div>
</template>
<script>
import Categories from './categories.vue'

export default {
	components: { Categories },
    data() {
        return {
			categories: []
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
		
			await axios.get('/categories')
			.then(async response => {

						app.categories = response.data.categories
						
						await app.categories.forEach(async function(element, index) {
							if (app.categories[index].title) {
								if (eval('app.categories[index].title_'+langs)==null) {
									var postData = {
									  lang: langs,
									  str: app.categories[index].title
									};
									await axios.post('/messages/translationtext', postData)
										.then(async response => {
											var str = response.data.message;
											str = str.charAt(0).toUpperCase() + str.substr(1);
											eval('app.categories[index].title_'+langs+'=str')
											await axios.post('/categories/updateones', app.categories[index]);
										}).catch(function(error) {
											console.log('Error: ', error);
										});					
								}
							}
						});				
			}).catch(function(error) {
				console.log(error);
			});		
	},
    methods: {
		createCategories (data) {
			let app = this
			
			if ($('#categories').val()==data._id) {
				$('#categories').val('');
				$( ".cat_name" ).removeClass( "cat_name_second" ).addClass( "cat_name_first" );
			} else {
				$('#categories').val(data._id);
				$( ".cat_name" ).removeClass( "cat_name_second" ).addClass( "cat_name_first" );
				$( "#cat"+data._id ).removeClass( "cat_name_first" ).addClass( "cat_name_second" );
			}
		
		},
    },
    computed: {

    },
    watch: {
        'data': function () {
        }
    },
}
</script>
<style lang="scss" scoped>

	.form_categories {
		height: 85px;
		padding: 0;
		overflow: hidden;
		white-space: nowrap;
		box-shadow: inset 0px -4px 6px rgba(0,0,0,0.15);
		position: relative;
		z-index: 10;
		background: #fff;
	}	
	.form_categoriestext {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
		overflow: auto;
	}
</style>
