window.Vue = require("vue");
// Vue.component("App", require("./App.vue").default);

import store from "./store";
import router from './router';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

const VueInputMask = require("vue-inputmask").default;
Vue.use(VueInputMask);

const app = new Vue({
    el: "#app",
    store,
    router
});
