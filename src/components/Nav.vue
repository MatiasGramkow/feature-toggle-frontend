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
                    <span class="d-inline-block" tabindex="0" data-toggle="tooltip" :title="logoutState ? features['Logout'].description : features['Logout'].deactivation_reason">
                        <a style="cursor:pointer;" :class="{disabled: !logoutState}" @click="logout" class="nav-link">Logout</a>
                    </span>
                </li>
            </template>

            <template v-if="!auth">
                <li class="nav-item">
                    <span class="d-inline-block" tabindex="0" data-toggle="tooltip" :title="loginState ? features['Login'].description : features['Login'].deactivation_reason">
                        <router-link :class="{ disabled: !loginState }" to="/login" class="nav-link" >Login</router-link>
                    </span>
                </li>
                <li class="nav-item">
                    <span class="d-inline-block" tabindex="0" data-toggle="tooltip" :title="registerState ? features['Register'].description : features['Register'].deactivation_reason">
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
import moment from 'moment';


export default {
    name: "Nav",
    data (){
        return {
            logoutState: Boolean,
            loginState: Boolean,
            registerState: Boolean,
            forgotPasswordState: Boolean,
            resetPasswordState: Boolean,
            halloweenFeature: Boolean,
            features: {
                "Register": {
                    description: "",
                    deactivation_reason: ""
                },
                "Login": {
                    description: "",
                    deactivation_reason: ""
                },
                "ResetPassword": {
                    description: "",
                    deactivation_reason: ""
                },
                "ForgotPassword": {
                    description: "s",
                    deactivation_reason: "s"
                },
                "Logout": {
                    description: "",
                    deactivation_reason: ""
                },
                "HalloweenFeature": {
                    description: "",
                    deactivation_reason: ""
                },
            },
        }
    },
    methods: {
        loadStates() {
            
            const store = useStore();
            axios.get('features', {})
                .then(response => {
                    var newStartDate = null;
                    var newStopDate = null;
                    var today = new Date();
                    response.data.forEach(element => {
                        let storeName = element.name.replace(/\s/g, '');
                        this.features[storeName].deactivation_reason = element.deactivation_reason;
                        this.features[storeName].description = element.description;
                        store.dispatch(`set${storeName}`, element.is_active);                        

                        /*
                        if (element.start_date != "" || element.stop_date != "") {
                            // Start logic
                            if (element.start_date != "") {
                                newStartDate = new Date(element.start_date);
                            }
                            if (element.stop_date != "") {
                                newStopDate = new Date(element.stop_date);
                            }
                            
                            // Success criteria
                            if ((newStartDate <= today && newStopDate > today) || 
                                (newStartDate <= today && newStopDate == null)) {
                                store.dispatch(`set${storeName}`, true);                        
                            }
                        } else {
                            store.dispatch(`set${storeName}`, element.is_active);                        
                        }
                        */
                    });
                    this.logoutState = store.getters.logout;
                    this.loginState = store.getters.login;
                    this.registerState = store.getters.register;
                    this.forgotPasswordState = store.getters.forgotPassword;
                    this.resetPasswordState = store.getters.resetPassword;
                    this.halloweenFeature = store.getters.halloweenFeature;

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