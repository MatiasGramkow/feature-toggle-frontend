<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
            </li>
        </ul>
        <ul class="navbar-nav my-2 my-lg-0">
            <template v-if="auth">
                <li class="nav-item">
                    <router-link to="/features" class="nav-link">Features</router-link>
                </li>
                <li class="nav-item">
                    <span class="d-inline-block" tabindex="0" data-toggle="tooltip" :title="logoutState ? '' : deactivated_reasons['Logout']">
                        <a style="cursor:pointer;" :class="{disabled: !logoutState}" @click="logout" class="nav-link">Logout</a>
                    </span>
                </li>
            </template>

            <template v-if="!auth">
                <li class="nav-item">
                    <span class="d-inline-block" tabindex="0" data-toggle="tooltip" :title="loginState ? '' : deactivated_reasons['Login']">
                        <router-link :class="{ disabled: !loginState }" to="/login" class="nav-link" >Login</router-link>
                    </span>
                </li>
                <li class="nav-item">
                    <span class="d-inline-block" tabindex="0" data-toggle="tooltip" :title="registerState ? '' : deactivated_reasons['Register']">
                        <router-link :class="{ disabled: !registerState }" to="/register" class="nav-link" >Register</router-link>
                    </span>
                </li>
            </template>
        </ul>
    </nav>
</template>

<script>

import {computed} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import axios from 'axios';

export default {
    name: "Nav",
    data (){
        return {
            logoutState: Boolean,
            loginState: Boolean,
            registerState: Boolean,
            forgotPasswordState: Boolean,
            resetPasswordState: Boolean,
            deactivated_reasons: {
                "Register": "",
                "Login": "",
                "ResetPassword": "",
                "ForgotPassword": "",
                "Logout": ""
            }
        }
    },
    methods: {
        loadStates() {
            const store = useStore();
            axios.get('features', {})
                .then(response => {
                    response.data.forEach(element => {
                        let storeName = element.name.replace(/\s/g, '');
                        this.deactivated_reasons[storeName] = element.deactivation_reason;
                        store.dispatch(`set${storeName}`, element.is_active, element.deactivation_reason);
                    });
                    this.logoutState = store.getters.logout;
                    this.loginState = store.getters.login;
                    this.registerState = store.getters.register;
                    this.forgotPasswordState = store.getters.forgotPassword;
                    this.resetPasswordState = store.getters.resetPassword;
                });
        }
    },
    mounted() {
        this.loadStates()
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const auth = computed(() => store.state.auth);

        const logout = async () => {
            await axios.post('logout', {})
            await store.dispatch('setAuth', false);
            localStorage.removeItem('token');
            await router.push('/login');
        }

        return {
            auth,
            logout
        }
    }
}
</script>