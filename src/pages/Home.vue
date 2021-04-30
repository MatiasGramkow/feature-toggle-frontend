<template>
<div class="container">
    <h1>{{ message }}</h1>
    <div>
<section id="textarea" contenteditable="true">
    <ul>
        <li style="color:green;">Bjarke would like to register himself as a user</li>
        <li style="color:green;">Bjarke would like to login to the system</li>
        <li style="color:green;">Gemma would like to reset her password as she forgot it.</li>
        <br>
        <li style="color:green;">Bjórn wants a way he can add a feature toggle for registering users</li>
        <li style="color:green;">Bjórn would like to be able to edit the feature toggle he just made</li>
        <li style="color:green;">Samantha has made a special feature and event for halloween for the webstore, she would like to set up a toggle for it</li>
        <br>
        <li style="color:green;">Samantha wants to turn on and off the register user functionality</li>
        <li style="color:green;">Bjórn would like to turn off the reset password feature as the SMTP server broke.</li>
        <li style="color:green;">Samantha would like a way to clearly communicate which functions are working and which are not.</li>
        <li style="color:green;">Bjórn would like to tell the users what went wrong and why that feature is disabled	</li>
        <br>
        <li>Samantha would like to be able to set a time period login should be disabled</li>
        <li>Samantha would like to define weekly schedules for when features should be disabled.</li>
        <li>Bjórn is lost in the data and would like an easy way to update the schedules for the toggles.</li>
        <li>Bjórn would like to autmatically have the halloween feature running every year at halloween</li>
    </ul>
</section>
    </div>
</div>
</template>

<script>

import {ref, onMounted} from 'vue';
import axios from 'axios';
import {useStore} from 'vuex';

export default {
    name: "Home",
    setup() {
        const message = ref('You are not logged in');
        const store = useStore();

        onMounted(async () => {
            try {
                const {data} = await axios.get('user');

                message.value = `Hi ${data.first_name} ${data.last_name}`;

                await store.dispatch('setAuth', true);
            } catch (e) {
                await store.dispatch('setAuth', false);
            }
        });

        return {
            message
        };
    }
}
</script>