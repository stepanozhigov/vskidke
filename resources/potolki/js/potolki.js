import Vue from 'vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate'

//window.$ = window.jQuery = require('jquery');

const VueInputMask = require('vue-inputmask').default;
Vue.use(VueInputMask)

Vue.use(Vuex)
Vue.use(Vuelidate)
window.Vue = Vue;
import store from './store';
Vue.component('App', require('./App.vue').default);

const app = new Vue({
    el: '#app',
    store
})
