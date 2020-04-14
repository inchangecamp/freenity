<template>
    <div>
        <div class="container" style="margin-top: 20px;">

            <popup-error :text="errorMessage"></popup-error>
			
            <div class="d-flex justify-content-between">
                <router-link :to="{ name: 'register' }" style="color:#000;">Registration</router-link>
                <router-link :to="{ name: 'login' }" style="color:#000;">Sign in</router-link>
            </div>
			<h2 style="text-align:center;">Registration</h2>
            <form class="d-flex flex-column mt-5" @submit.prevent="register()">
                <div class="form-group">
                    <label for="login">Login</label>
                    <input id="login_form" autofocus autocomplete="on" class="form-control form-control-lg" v-model="form.login" type="text">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input autocomplete="on" class="form-control form-control-lg" v-model="form.password" type="password">
                </div>
                <div class="form-group d-flex flex-column align-items-center mt-4">
                    <button type="submit" class="btn btn-primary btn-lg">Sign Up</button>
                </div>
            </form>

        </div>

    </div>
</template>
<script>
    import popupError from '../components/popup/error.vue'

    export default {
        components: { popupError },
        data() {
            return {
                errorMessage: null,
                form: {
                    login: '',
                    password: ''
                }
            }
        },
		mounted() {
			document.getElementById("login_form").focus();
		},
        methods: {
            register() {
                let app = this
				let lang = 'en';

				var language = window.navigator ? (window.navigator.language ||
							  window.navigator.systemLanguage ||
							  window.navigator.userLanguage) : "";
				if (language) lang = language.substr(0, 2).toLowerCase();

				if (app.form.login.length>20 || app.form.password.length>20) {
					this.errorMessage = 'Login error'
				} else {
					this.$auth.register({
						params: {
							login: app.form.login.toLowerCase(),
							password: app.form.password
						},
						success: function () {
							window.location.href='/?lang='+lang
						},
						error: function (error) {
							this.errorMessage = error.response.data.message
						},
						autoLogin: true,
						rememberMe: true,
					});
				}
				
            }
        }
    }
</script>
<style lang="scss" scoped>
    .form-control {
        border-radius: 5px;
    }
    .btn {
        border-radius: 5px;
    }
</style>
