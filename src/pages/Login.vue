<template>
    <form class="form-signin" @submit.prevent="login">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <input v-model="email"  class="form-control" placeholder="Email" type="email" required>
        <input v-model="password" class="form-control" placeholder="Password" type="password" required>
        <div class="mb-2">
            <router-link to="/forgot">Forgot password</router-link>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">Login</button>
    </form>
</template>

<script>

import {ref} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default {
    name: "Login",
    setup() {
        const email = ref('');
        const password = ref('');
        const router = useRouter();

        const login = async () => {
            await axios.post('login', {
                email: email.value,
                password: password.value
            }).then(r => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + r.data.jwt;
                localStorage.setItem( 'token', JSON.stringify(r.data.jwt) );
                console.log(axios.defaults.headers.common['Authorization']);
            });

            await router.push('/');
            
        }

        return {
            email,
            password,
            login
        }
    }
}
</script>