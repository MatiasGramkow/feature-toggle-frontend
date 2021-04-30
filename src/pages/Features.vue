<template>
    <div>
        <div v-if="showModal" class="modal-style">
            <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Update Feature</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" @click="showModal = false">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form class="form-signin">
                                    <div>
                                        <select v-model="editFeature.is_active">
                                            <option v-for="state in featureStates" :key="state.key">{{state}}</option>
                                        </select>
                                        <input v-model="editFeature.deactivation_reason" class="form-control" placeholder="Deactivation Reason">
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" @click="closeModal()">Close</button>
                                        <button type="button" class="btn btn-primary" @click="updateFeature()">Update feature</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </transition>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Active</th>
                    <th scope="col">Description</th>
                    <th scope="col">Deactivation Reason</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">Stop Date</th>
                    <th scope="col">Settings</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(feature, i) in featureList" :key="i">
                    <td>{{feature.name}}</td>
                    <td>{{feature.is_active}}</td>               
                    <td>{{feature.description}}</td>
                    <td>{{feature.deactivation_reason}}</td>
                    <td>{{dateTime(feature.start_date)}}</td>
                    <td>{{dateTime(feature.stop_date)}}</td>
                    <td>
                        <div><a @click="Modal(feature)" style="cursor:pointer;">Update</a></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import {ref, onMounted, reactive} from 'vue';
import axios from 'axios';
import {useStore} from 'vuex';
import {useRouter} from "vue-router";
import moment from 'moment';

export default {
    
    name: "Features",
    data() {
        return { 
            featureStates: [
                "true",
                "false"
            ],
            selectedState: "",
            featureList: [],
            showModal: false,
            editFeature: null
        }
    },
    methods: {
        dateTime(value) {
            return moment(value).format('YYYY-MM-DD');
        },
        closeModal() {
            this.showModal = false;
        },
        async loadProducts() {
            await axios.get('features', {})
                .then(response => {
                    this.featureList = response.data;
                });
        },
        async updateFeature() {
            await axios.post(`updateFeature/${this.editFeature.id}/${this.editFeature.is_active}/${this.editFeature.deactivation_reason}`)
                .then(
                    this.showModal = false
                )
        },
        async Modal(feature) {
            this.editFeature = feature;
            this.showModal = true;
        },
    },
    mounted() {
        this.loadProducts()
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        onMounted(async () => {
            try {
                const {data} = await axios.get('user');
                await store.dispatch('setAuth', true);
            } catch (e) {
                await store.dispatch('setAuth', false);
            }
        });
    }
}
</script>

<style>
    .modal-style {
        position: absolute;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
    }
</style>