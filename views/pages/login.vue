<template>
    <div>

        <div class="container" style="margin-top: 20px;">
            
            <popup-error :text="errorMessage"></popup-error>

            <div class="d-flex justify-content-between">
                <router-link :to="{ name: 'register' }" style="color:#000;">Registration</router-link>
                <router-link :to="{ name: 'login' }" style="color:#000;">Sign in</router-link>
            </div>
			<h2 style="text-align:center;">Sign in</h2>
            <form class="d-flex flex-column mt-5" @submit.prevent="login()">
                <div class="form-group">
                    <label for="login">Login</label>
                    <input id="login_form" autofocus autocomplete="on" class="form-control form-control-lg" v-model="form.login" type="text">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input autocomplete="on" class="form-control form-control-lg" v-model="form.password" type="password">
                </div>
                <div class="form-group d-flex flex-column align-items-center mt-4">
                    <button type="submit" class="btn btn-primary btn-lg">Sign In</button>
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
                form: {
                    login: '',
                    password: ''
                },
                error: {},
                errorMessage: null
            }
        },
		mounted() {
			document.getElementById("login_form").focus();
		},
        methods: {
            login() {
                let app = this;
				let lang = 'en';

				var language = window.navigator ? (window.navigator.language ||
							  window.navigator.systemLanguage ||
							  window.navigator.userLanguage) : "";
				if (language) lang = language.substr(0, 2).toLowerCase();

                app.$auth.login({
                    params: {
                        login: app.form.login.toLowerCase(),
                        password: app.form.password,
                    },
                    success: function () {
						window.location.href='/?lang='+lang
					},
                    error: function (error) {
                        this.errorMessage = error.response.data.message
                    },
                    rememberMe: true,
                    fetchUser: true,
                });
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

