window.Vue = require("vue");
Vue.component("App", require("./App.vue").default);

import store from "./store";

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

const app = new Vue({
    el: "#app",
    store,
});
