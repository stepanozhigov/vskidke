window.Vue = require("vue");
Vue.component("App", require("./App.vue").default);

import store from "./store";

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import VueCountryCode from "vue-country-code";
Vue.use(VueCountryCode);

const app = new Vue({
    el: "#app",
    store
});
